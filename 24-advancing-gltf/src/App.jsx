import {
  Stats,
  OrbitControls,
  Environment,
  ContactShadows
} from '@react-three/drei'
import { Canvas, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Leva, useControls } from 'leva'
import { Children } from 'react'

// we will create a function that will help us to setups a ground prop of the environment map so the model seems to sit on the ground of the map.
function Env() {
  const { height, radius, scale } = useControls('Ground', {
    height: { value: 10, min: 0, max: 100, step: 1 },
    radius: { value: 115, min: 0, max: 1000, step: 1 },
    scale: { value: 100, min: 0, max: 1000, step: 1 }
  })
  return (
    <Environment
      files="./img/venice_sunset_1k.hdr"
      background
      ground={{
        height: height,
        radius: radius,
        scale: scale
      }}
    />
  )
}

function Model() {
  //   const gltf = useLoader(GLTFLoader, './models/scene.glb')
  // console.log(gltf.nodes.Suzanne)

  // leva controls - to make the leva controls closed on default we need to import leva and add outside of the canvas (below) <Leva collapsed/>
  const {
    x,
    y,
    z,
    visible,
    color,
    metalness,
    roughness,
    clearcoat,
    clearcoatRoughness,
    transmission,
    ior,
    thickness
  } = useControls('Suzanne', {
    x: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
    y: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
    z: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
    visible: true,
    color: { value: 'green' },
    metalness: { value: 0.5, min: 0, max: 1, step: 0.01 },
    roughness: { value: 0.5, min: 0, max: 1, step: 0.01 },
    clearcoat: { value: 0.5, min: 0, max: 1, step: 0.01 },
    clearcoatRoughness: { value: 0.5, min: 0, max: 1, step: 0.01 },
    transmission: { value: 0.5, min: 0, max: 1, step: 0.01 },
    ior: { value: 1.75, min: 0, max: 5, step: 0.01 },
    thickness: { value: 3, min: 0, max: 5, step: 0.01 }
  })

  const { scene } = useLoader(GLTFLoader, './models/scene.glb')
  console.log(scene)
  return (
    <primitive
      castShadow
      object={scene}
      position={[0, 0, 0]}
      children-castShadow
      children-0-rotation={[x, y, z]}
      children-0-visible={visible}
      children-0-material-color={color}
      children-0-material-metalness={metalness}
      children-0-material-roughness={roughness}
      children-0-material-clearcoat={clearcoat}
      children-0-material-clearcoatRoughness={clearcoatRoughness}
      children-0-material-transmission={transmission}
      children-0-material-ior={ior}
      children-0-material-thickness={thickness}
    />
  )
}

export default function App() {
  return (
    <>
      <Canvas camera={{ position: [-8, 5, 8] }} shadows>
        <Env />
        <pointLight position={[3, 3, 3]} castShadow={true} />
        <Model />
        <mesh rotation-x={-Math.PI / 2} receiveShadow>
          <circleGeometry args={[10]} />
          <meshPhysicalMaterial />
        </mesh>
        <ContactShadows scale={15} opacity={0.5} />
        <OrbitControls target={[0, 1, 0]} maxPolarAngle={Math.PI / 2} />
        <axesHelper args={[5]} />
        {/* <gridHelper /> */}
        <Stats />
      </Canvas>
      <Leva collapsed flat={true} />
    </>
  )
}
