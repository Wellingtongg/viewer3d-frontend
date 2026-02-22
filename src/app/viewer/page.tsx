"use client";

import { OrbitControls, SpotLight, Stage, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useControls } from "leva";

export default function ViewerPage() {
  const { scene, materials } = useGLTF("/sofa.glb");
  const { color } = useControls("Sofá", {
    color: { value: "#00ff00", label: "Cor do Sofá" },
  });

  materials.DefaultMaterial.color.set(color);

  return (
    <div className="h-screen w-full">
      <Canvas>
        <color attach="background" args={["#f0f0f0"]} />

        <Stage adjustCamera={1.2} intensity={1}>
          <primitive object={scene} dispose={null} />

          <OrbitControls />
        </Stage>

        {/* <SpotLight
          castShadow
          penumbra={1}
          distance={6}
          angle={0.35}
          attenuation={50}
          anglePower={10}
          intensity={2}
          color="#00ff00"
        /> */}
      </Canvas>
    </div>
  );
}
