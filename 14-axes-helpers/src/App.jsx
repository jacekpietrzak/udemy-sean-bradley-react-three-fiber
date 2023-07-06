import { Canvas } from '@react-three/fiber'
import Polyhedron from './components/Polyhedron'
import * as THREE from 'three'
import { Stats, OrbitControls } from '@react-three/drei'
// great to see if we are well optimized or not. We should run 60fps and use as low memory as possible

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
      <OrbitControls
        // minAzimuthAngle={-Math.PI / 4}
        // maxAzimuthAngle={Math.PI / 4}
        minPolarAngle={0}
        maxPolarAngle={Math.PI}
      />
      {/* axesHelper is a 3d axes that we can import straignt from three.js core library so we dont need to import it as we import all from three */}
      <axesHelper />
      <Stats />
    </Canvas>
  )
}
