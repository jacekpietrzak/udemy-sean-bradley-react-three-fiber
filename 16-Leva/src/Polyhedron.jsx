import { useRef, useState } from 'react'

// in props we have polyhedron, color and ...props. That is why polyhedron and color are not props that we can use for mesh. polyhedron is a custom prop, color is more applicable to material. ...props has values for position, rotation and visible which are used for mesh object.
export default function Polyhedron({ polyhedron, color, ...props }) {
  const ref = useRef()
  const [count, setCount] = useState(2)

  console.log(polyhedron[count].uuid)

  return (
    <mesh
      {...props}
      // ref={ref}
      onPointerDown={() => {
        setCount((count + 1) % 3)
      }}
      geometry={polyhedron[count]}>
      <meshBasicMaterial color={color} wireframe />
    </mesh>
  )
}
