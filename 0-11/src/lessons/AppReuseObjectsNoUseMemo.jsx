import { Canvas } from '@react-three/fiber'
import Polyhedron from '../components/Polyhedron'
import * as THREE from 'three'

export default function App() {
  // useMemo is not needed becouse we are not changing the state in app component hence we are not changing objects. We are chaniging state in Polyhedron component but it is only responsible for choosing object from the array below. We moved out objects to parent component to reuse those.
  const polyhedron = [
    new THREE.BoxGeometry(),
    new THREE.SphereGeometry(0.785),
    new THREE.DodecahedronGeometry(0.785)
  ]
  return (
    <Canvas camera={{ position: [0, 0, 3] }}>
      <Polyhedron position={[-0.75, -0.75, 0]} polyhedron={polyhedron} />
      <Polyhedron position={[0.75, -0.75, 0]} polyhedron={polyhedron} />
      <Polyhedron position={[-0.75, 0.75, 0]} polyhedron={polyhedron} />
      <Polyhedron position={[0.75, 0.75, 0]} polyhedron={polyhedron} />
    </Canvas>
  )
}
