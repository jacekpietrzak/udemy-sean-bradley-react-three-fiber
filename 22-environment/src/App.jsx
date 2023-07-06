import { Stats, OrbitControls, Sphere, Environment } from '@react-three/drei'
import { Canvas, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default function App() {
  const gltf = useLoader(GLTFLoader, './models/monkey.glb')
  console.log(gltf.nodes.Suzanne)
  return (
    <Canvas camera={{ position: [-0.5, 1, 4] }}>
      <directionalLight position={[3.3, 2.5, 2.4]} intensity={4}>
        {/* to adjust the light position we will use a sphere to see where it is */}
        <Sphere args={[0.25]} />
      </directionalLight>
      <primitive
        object={gltf.scene}
        position={[0, 1, 0]}
        children-0-castShadow
      />

      <OrbitControls target={[0, 1, 0]} autoRotate />
      <axesHelper args={[5]} />
      <Stats />
      <Environment files="./img/venice_sunset_1k.hdr" background blur={0.5} />
    </Canvas>
  )
}
