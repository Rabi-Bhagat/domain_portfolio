import { useState, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";

export default function StarBackground(props) {
  const ref = useRef();
  const groupRef = useRef();
  
  const [sphere] = useState(() => {
    const positions = new Float32Array(6000 * 3);
    for (let i = 0; i < 6000; i++) {
        const r = 15 + Math.random() * 30; // Radius between 15 and 45 for more depth
        const theta = 2 * Math.PI * Math.random();
        const phi = Math.acos(2 * Math.random() - 1);
        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);
        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
    }
    return positions;
  });

  // Target rotation for smoothing
  const targetRotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
        const x = (event.clientX / window.innerWidth) * 2 - 1;
        const y = (event.clientY / window.innerHeight) * 2 - 1;
        targetRotation.current = {
            x: y * 0.2, // Invert Y for natural feel
            y: x * 0.2
        };
    };

    const handleOrientation = (event) => {
        // Beta is x-axis (front/back tilt) -180 to 180
        // Gamma is y-axis (left/right tilt) -90 to 90
        if (event.beta !== null && event.gamma !== null) {
             const x = (event.beta / 180) * 2; // Normalize roughly
             const y = (event.gamma / 90) * 2;
             targetRotation.current = {
                x: x * 0.5,
                y: y * 0.5
             };
        }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('deviceorientation', handleOrientation);

    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  useFrame((state, delta) => {
    // Auto rotation
    ref.current.rotation.x -= delta / 15;
    ref.current.rotation.y -= delta / 20;

    // Interactive rotation with damping (lerp)
    if (groupRef.current) {
        groupRef.current.rotation.x += (targetRotation.current.x - groupRef.current.rotation.x) * delta * 2;
        groupRef.current.rotation.y += (targetRotation.current.y - groupRef.current.rotation.y) * delta * 2;
    }
  });

  return (
    <group ref={groupRef} rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={1.0}
        />
      </Points>
    </group>
  );
}
