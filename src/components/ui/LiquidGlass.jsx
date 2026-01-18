import { useEffect } from 'react';

export default function LiquidGlass() {
  useEffect(() => {
    // Check if liquid glass already exists and destroy it
    if (window.liquidGlass) {
      window.liquidGlass.destroy();
    }

    // Utility functions
    function smoothStep(a, b, t) {
      t = Math.max(0, Math.min(1, (t - a) / (b - a)));
      return t * t * (3 - 2 * t);
    }

    function length(x, y) {
      return Math.sqrt(x * x + y * y);
    }

    function roundedRectSDF(x, y, width, height, radius) {
      const qx = Math.abs(x) - width + radius;
      const qy = Math.abs(y) - height + radius;
      return Math.min(Math.max(qx, qy), 0) + length(Math.max(qx, 0), Math.max(qy, 0)) - radius;
    }

    function texture(x, y) {
      return { type: 't', x, y };
    }

    // Generate unique ID
    function generateId() {
      return 'liquid-glass-' + Math.random().toString(36).substr(2, 9);
    }

    // Main Shader class
    class Shader {
      constructor(options = {}) {
        this.width = options.width || 100;
        this.height = options.height || 100;
        this.fragment = options.fragment || ((uv) => texture(uv.x, uv.y));
        this.canvasDPI = 1;
        this.id = generateId();
        this.offset = 10; // Viewport boundary offset
        
        this.mouse = { x: 0, y: 0 };
        this.mouseUsed = false;
        
        this.createElement();
        this.setupEventListeners();
        this.updateShader();
      }

      createElement() {
        // Create container
        this.container = document.createElement('div');
        // Added styling to make it look nicer in the context of the portfolio
        this.container.style.cssText = `
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: ${this.width}px;
          height: ${this.height}px;
          overflow: hidden;
          border-radius: 150px;
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
          cursor: grab;
          backdrop-filter: url(#${this.id}_filter) blur(0.5px) contrast(1.2) brightness(1.1);
          -webkit-backdrop-filter: url(#${this.id}_filter) blur(0.5px) contrast(1.2) brightness(1.1);
          border: 1px solid rgba(255, 255, 255, 0.3);
          background: rgba(255, 255, 255, 0.05);
          z-index: 9999;
          pointer-events: auto;
          transition: transform 0.1s;
        `;

        // Create SVG filter
        this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        this.svg.setAttribute('width', '0');
        this.svg.setAttribute('height', '0');
        this.svg.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          pointer-events: none;
          z-index: 9998;
        `;

        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
        filter.setAttribute('id', `${this.id}_filter`);
        filter.setAttribute('filterUnits', 'userSpaceOnUse');
        filter.setAttribute('colorInterpolationFilters', 'sRGB');
        filter.setAttribute('x', '0');
        filter.setAttribute('y', '0');
        filter.setAttribute('width', this.width.toString());
        filter.setAttribute('height', this.height.toString());

        this.feImage = document.createElementNS('http://www.w3.org/2000/svg', 'feImage');
        this.feImage.setAttribute('id', `${this.id}_map`);
        this.feImage.setAttribute('width', this.width.toString());
        this.feImage.setAttribute('height', this.height.toString());

        this.feDisplacementMap = document.createElementNS('http://www.w3.org/2000/svg', 'feDisplacementMap');
        this.feDisplacementMap.setAttribute('in', 'SourceGraphic');
        this.feDisplacementMap.setAttribute('in2', `${this.id}_map`);
        this.feDisplacementMap.setAttribute('xChannelSelector', 'R');
        this.feDisplacementMap.setAttribute('yChannelSelector', 'G');

        filter.appendChild(this.feImage);
        filter.appendChild(this.feDisplacementMap);
        defs.appendChild(filter);
        this.svg.appendChild(defs);

        // Create canvas for displacement map (hidden)
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width * this.canvasDPI;
        this.canvas.height = this.height * this.canvasDPI;
        this.canvas.style.display = 'none';

        this.context = this.canvas.getContext('2d');
      }

      constrainPosition(x, y) {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // Calculate boundaries with offset
        const minX = this.offset;
        const maxX = viewportWidth - this.width - this.offset;
        const minY = this.offset;
        const maxY = viewportHeight - this.height - this.offset;
        
        // Constrain position
        const constrainedX = Math.max(minX, Math.min(maxX, x));
        const constrainedY = Math.max(minY, Math.min(maxY, y));
        
        return { x: constrainedX, y: constrainedY };
      }

      setupEventListeners() {
        let isDragging = false;
        let startX, startY, initialX, initialY;

        // Use arrow functions to maintain 'this' context
        this._mousedownHandler = (e) => {
          isDragging = true;
          this.container.style.cursor = 'grabbing';
          this.container.style.transform = 'scale(1.05)'; // Little pop effect
          startX = e.clientX;
          startY = e.clientY;
          const rect = this.container.getBoundingClientRect();
          initialX = rect.left;
          initialY = rect.top;
          e.preventDefault();
        };

        this._mousemoveHandler = (e) => {
          if (isDragging) {
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            
            // Calculate new position
            const newX = initialX + deltaX;
            const newY = initialY + deltaY;
            
            // Constrain position within viewport bounds
            const constrained = this.constrainPosition(newX, newY);
            
            this.container.style.left = constrained.x + 'px';
            this.container.style.top = constrained.y + 'px';
            // We removed translate here so it doesn't conflict
          }

          // Update mouse position for shader
          const rect = this.container.getBoundingClientRect();
          this.mouse.x = (e.clientX - rect.left) / rect.width;
          this.mouse.y = (e.clientY - rect.top) / rect.height;
          
          // Only update if mouse is near/over the glass to save perf
          const dist = Math.hypot(e.clientX - (rect.left + rect.width/2), e.clientY - (rect.top + rect.height/2));
          if (dist < 500) { 
             this.updateShader();
          }
        };

        this._mouseupHandler = () => {
          if(isDragging) {
              isDragging = false;
              this.container.style.cursor = 'grab';
              this.container.style.transform = 'scale(1)';
          }
        };

        this._resizeHandler = () => {
            if(!this.container) return;
            const rect = this.container.getBoundingClientRect();
            const constrained = this.constrainPosition(rect.left, rect.top);
            
            if (rect.left !== constrained.x || rect.top !== constrained.y) {
              this.container.style.left = constrained.x + 'px';
              this.container.style.top = constrained.y + 'px';
            }
        };

        this.container.addEventListener('mousedown', this._mousedownHandler);
        document.addEventListener('mousemove', this._mousemoveHandler);
        document.addEventListener('mouseup', this._mouseupHandler);
        window.addEventListener('resize', this._resizeHandler);
      }

      updateShader() {
        const mouseProxy = new Proxy(this.mouse, {
          get: (target, prop) => {
            this.mouseUsed = true;
            return target[prop];
          }
        });

        this.mouseUsed = false;

        const w = this.width * this.canvasDPI;
        const h = this.height * this.canvasDPI;
        const data = new Uint8ClampedArray(w * h * 4);

        let maxScale = 0;
        const rawValues = [];

        for (let i = 0; i < data.length; i += 4) {
          const x = (i / 4) % w;
          const y = Math.floor(i / 4 / w);
          const pos = this.fragment(
            { x: x / w, y: y / h },
            mouseProxy
          );
          const dx = pos.x * w - x;
          const dy = pos.y * h - y;
          maxScale = Math.max(maxScale, Math.abs(dx), Math.abs(dy));
          rawValues.push(dx, dy);
        }

        maxScale *= 0.5;

        let index = 0;
        for (let i = 0; i < data.length; i += 4) {
          const r = rawValues[index++] / maxScale + 0.5;
          const g = rawValues[index++] / maxScale + 0.5;
          data[i] = r * 255;
          data[i + 1] = g * 255;
          data[i + 2] = 0;
          data[i + 3] = 255;
        }

        this.context.putImageData(new ImageData(data, w, h), 0, 0);
        this.feImage.setAttributeNS('http://www.w3.org/1999/xlink', 'href', this.canvas.toDataURL());
        this.feDisplacementMap.setAttribute('scale', (maxScale / this.canvasDPI).toString());
      }

      appendTo(parent) {
        parent.appendChild(this.svg);
        parent.appendChild(this.container);
      }

      destroy() {
        if(this.container) {
            this.container.removeEventListener('mousedown', this._mousedownHandler);
            document.removeEventListener('mousemove', this._mousemoveHandler);
            document.removeEventListener('mouseup', this._mouseupHandler);
            window.removeEventListener('resize', this._resizeHandler);
            
            this.svg.remove();
            this.container.remove();
            this.canvas.remove();
        }
      }
    }

    // Create the liquid glass effect
    const shader = new Shader({
      width: 180,
      height: 120,
      fragment: (uv, mouse) => {
        const ix = uv.x - 0.5;
        const iy = uv.y - 0.5;
        const distanceToEdge = roundedRectSDF(
          ix,
          iy,
          0.3,
          0.2,
          0.6
        );
        const displacement = smoothStep(0.8, 0, distanceToEdge - 0.15);
        const scaled = smoothStep(0, 1, displacement);
        return texture(ix * scaled + 0.5, iy * scaled + 0.5);
      }
    });

    // Add to page
    shader.appendTo(document.body);
    window.liquidGlass = shader;

    // Cleanup function
    return () => {
        if (window.liquidGlass) {
            window.liquidGlass.destroy();
            window.liquidGlass = null;
        }
    };
  }, []);

  return null; // This component doesn't render any React virtual DOM, it appends directly to body
}
