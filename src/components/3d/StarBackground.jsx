import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";

const COUNT = 900;

function buildPositions() {
  const array = new Float32Array(COUNT * 3);

  for (let index = 0; index < COUNT; index += 1) {
    array[index * 3] = (Math.random() - 0.5) * 22;
    array[index * 3 + 1] = (Math.random() - 0.5) * 14;
    array[index * 3 + 2] = (Math.random() - 0.5) * 12;
  }

  return array;
}

export default function StarBackground({ dark = true }) {
  const ref = useRef();
  const [positions] = useState(buildPositions);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.014;
  });

  return (
    <group>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={dark ? "#f4f4f5" : "#3f3f46"}
          size={0.032}
          sizeAttenuation
          depthWrite={false}
          opacity={dark ? 0.5 : 0.35}
        />
      </Points>
    </group>
  );
}
