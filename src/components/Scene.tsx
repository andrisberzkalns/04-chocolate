import { useScroll } from "@react-three/drei";
import { useRef } from "react";
import { PergaleDark } from "./PergaleDark";
import { Backdrop } from "./Canvas";

export const Scene: React.FC<any> = ({
  rotation = [0, 0, 0],
  bg = "#f0f0f0",
  elmt = "#000",
  index = 0,
  length = 1,
}) => {
  const data = useScroll();
  const mesh = useRef(null);
  const contentMesh = useRef(null);

  //   const [meshOffset, setMeshOffset] = useState(0);
  //   useFrame((state, delta) => {
  // if (!mesh.current) return;
  // mesh.current.rotation.x = mesh.current.rotation.y += delta;
  //   });
  //   useFrame(() => {
  // data.offset = current scroll position, between 0 and 1, dampened
  // data.delta = current delta, between 0 and 1, dampened
  // Will be 0 when the scrollbar is at the starting position,
  // then increase to 1 until 1 / 3 of the scroll distance is reached
  // const a = data.range(0, 1 / 3);
  // Will start increasing when 1 / 3 of the scroll distance is reached,
  // and reach 1 when it reaches 2 / 3rds.
  // const meshOffsetValue = data.range(index / length, index / length) || 0;
  // if (mesh.current) {
  //   mesh.current.scale.set(
  //     1 - meshOffsetValue * 0.5,
  //     1 - meshOffsetValue * 0.5,
  //     1 - meshOffsetValue * 0.5,
  //   );
  // }
  // // console.log("meshOffsetValue: " + meshOffsetValue);
  // if (contentMesh.current) {
  //   contentMesh.current.position.x = -meshOffsetValue * 5;
  // }
  // setMeshOffset(meshOffsetValue * 5);
  // Same as above but with a margin of 0.1 on both ends
  // const c = data.range(1 / 3, 1 / 3, 0.1);
  // // Will move between 0-1-0 for the selected range
  // const d = data.curve(1 / 3, 1 / 3);
  // // Same as above, but with a margin of 0.1 on both ends
  // const e = data.curve(1 / 3, 1 / 3, 0.1);
  // // Returns true if the offset is in range and false if it isn't
  // const f = data.visible(2 / 3, 1 / 3);
  // // The visible function can also receive a margin
  // const g = data.visible(2 / 3, 1 / 3, 0.1);
  // const show
  // console.log("a: " + a);
  // console.log("b: " + b);
  // console.log("c: " + c);
  // console.log("d: " + d);
  // console.log("e: " + e);
  // console.log("f: " + f);
  // console.log("g: " + g);
  //   });
  return (
    <mesh ref={mesh} position={[0, 0, 0]}>
      <pointLight position={[0.5, 0.5, 2]} intensity={5} />
      <ambientLight intensity={0.5} />
      <Backdrop color={bg} />
      {/* <mesh castShadow position={[0, 0, 0]}>
              <boxGeometry args={[1.4, 3, 0.3]} />
              <meshStandardMaterial color={elmt} />
            </mesh> */}
      <PergaleDark />
      <mesh
        position={[0, -3, 0]}
        rotation={[-Math.PI / 12, 0, 0]}
        receiveShadow={false}
      >
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color={bg} />
      </mesh>
    </mesh>
  );
};
