import { useState, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";

function ShootingStars({ dark }) {
  const groupRef = useRef();

  const [stars] = useState(() =>
    Array.from({ length: 3 }, (_, index) => ({
      x: (Math.random() - 0.5) * 30,
      y: 8 + Math.random() * 10,
      z: -4 - Math.random() * 8,
      speed: 5 + Math.random() * 4,
      offset: index * 3,
    }))
  );

  useFrame((state, delta) => {
    if (!groupRef.current || document.hidden) return;

    groupRef.current.children.forEach((mesh, index) => {
      const star = stars[index];
      mesh.position.x -= star.speed * delta;
      mesh.position.y -= star.speed * 0.38 * delta;

      if (mesh.position.x < -24 || mesh.position.y < -14) {
        mesh.position.x = 18 + Math.random() * 10;
        mesh.position.y = 9 + Math.random() * 10;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {stars.map((star, index) => (
        <mesh
          key={index}
          position={[star.x, star.y, star.z]}
          rotation={[0, 0, Math.PI / 2.6]}
        >
          <boxGeometry args={[0.025, 0.025, 3.2]} />
          <meshBasicMaterial
            color={dark ? "#bfdbfe" : "#3b82f6"}
            transparent
            opacity={0.4}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function StarBackground(props) {
  const ref = useRef();
  const groupRef = useRef();

  const [particleCount] = useState(() => {
    if (typeof window === "undefined") return 0;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const isLowPower = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isLowPower) return 0;
    return isMobile ? 1200 : 4500;
  });

  const [sphere] = useState(() => {
    const positions = new Float32Array(particleCount * 3);

    for (let index = 0; index < particleCount; index += 1) {
      const radius = 15 + Math.random() * 30;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);

      positions[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[index * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[index * 3 + 2] = radius * Math.cos(phi);
    }

    return positions;
  });

  const targetRotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = (event.clientY / window.innerHeight) * 2 - 1;
      targetRotation.current = { x: y * 0.2, y: x * 0.2 };
    };

    const handleOrientation = (event) => {
      if (event.beta !== null && event.gamma !== null) {
        targetRotation.current = {
          x: (event.beta / 180) * 0.5,
          y: (event.gamma / 90) * 0.5,
        };
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("deviceorientation", handleOrientation);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  useFrame((state, delta) => {
    if (!ref.current || !groupRef.current || document.hidden) return;

    const time = state.clock.elapsedTime;

    ref.current.rotation.x -= delta / 15;
    ref.current.rotation.y -= delta / 20;

    groupRef.current.rotation.x +=
      (targetRotation.current.x - groupRef.current.rotation.x) * delta * 2;
    groupRef.current.rotation.y +=
      (targetRotation.current.y - groupRef.current.rotation.y) * delta * 2;

    if (ref.current?.material) {
      ref.current.material.opacity = 0.78 + Math.sin(time * 1.6) * 0.14;
    }
  });

  if (particleCount === 0) {
    return null;
  }

  return (
    <group ref={groupRef} rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled={false}
        {...props}
      >
        <PointMaterial
          transparent
          color={props.dark ? "#ffffff" : "#64748b"}
          size={0.05}
          sizeAttenuation
          depthWrite={false}
          opacity={0.9}
        />
      </Points>
      <ShootingStars dark={props.dark} />
    </group>
  );
}
