import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { Center, Environment } from '@react-three/drei'
import Button from './Button'
import { Vector3 } from 'three'

function Rig() {
  // const state = useThree() - we will use destructure to choose only camera and mouse from the state. Mouse is a key with mouse coorinates
  // console.log(state)

  const { camera, mouse } = useThree()

  // now we will use useFrame so we can get the info about the camera and mouse and change it.
  // since useFrame has a state we dont need to use useThree.

  const vec = new Vector3()

  useFrame(() => {
    // we are moving the camera basend on mouse coordinates but it is 1 to 1 ratio. We will use Lerp to smooth that out. Lerp use vector for final destination and alpha number which affects how long lerp will arrive at the new destination (vector3).
    // camera.position.x = -mouse.x
    // camera.position.y = -mouse.y

    // we cerate new vector
    vec.set(mouse.x * 1.5, mouse.y * 1.5, camera.position.z)
    camera.position.lerp(vec, 0.025) // vec is a destination position, 0.01 means that every frame of useFrame we will go by a 0.01 to the final vec destination. And the curve is smooth so closer to the end it gets slower.
    // we will tell camera to look at center
    camera.lookAt(0, 0, 0)
  })
}

export default function App() {
  return (
    <Canvas shadows camera={{ position: [0, 0, 10] }}>
      <Environment preset="forest" background />
      <Center>
        {/* we will create an array of 5 buttons */}
        {[...Array(5).keys()].map((x) =>
          [...Array(3).keys()].map((y) => (
            <Button key={x + y * 5} position={[x * 2.5, y * 2.5, 0]} />
          ))
        )}
      </Center>
      <Rig />
    </Canvas>
  )
}
