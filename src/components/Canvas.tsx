import {
  ScrollControls,
  useScroll,
  SoftShadows,
  PerspectiveCamera,
  KeyboardControlsEntry,
  KeyboardControls,
  useKeyboardControls,
  Html,
  Float,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Suspense,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import Models from "./Model";
import { Button } from "~/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
// import { DataContext } from "~/lib/contexts/dataContext";
import { useSelector, useDispatch } from "react-redux";
import { setOffset, next, previous, set } from "~/lib/slices/dataSlice";
import { RootState } from "~/lib/store";

export default () => {
  const items = useSelector((state: RootState) => state.data.items);

  //   const sceneRef = useRef<SceneRefType>(null);

  //   const [sub] = useKeyboardControls<Controls>();

  //   const next = () => {
  //     const fromTopMap = getScrollPositionArray(
  //       scroll.el.clientHeight,
  //       MODEL_COUNT,
  //     );

  //     if (selectedIndex < fromTopMap.length) {
  //       // setSelectedIndex((current) => {
  //       const newSelectedElement = selectedIndex + 1;
  //       if (newSelectedElement > fromTopMap.length - 1) return;
  //       setSelectedIndex(newSelectedElement);
  //       // return newSelectedElement;
  //       //   });
  //     }
  //   };

  //   const previous = () => {
  //     const fromTopMap = getScrollPositionArray(
  //       scroll.el.clientHeight,
  //       MODEL_COUNT,
  //     );

  //     if (selectedIndex < fromTopMap.length) {
  //       // setSelectedIndex((current) => {
  //       const newSelectedElement = selectedIndex - 1;
  //       if (newSelectedElement < 0) return;
  //       setSelectedIndex(newSelectedElement);
  //       // return newSelectedElement;
  //       //   });
  //     }
  //   };

  return (
    <>
      <Canvas
        id="scroller"
        className="absolute left-0 top-0 h-screen w-screen"
        shadows
        gl={{ preserveDrawingBuffer: true }}
        eventPrefix="client"
      >
        <ScrollControls pages={items.length} damping={0.5} distance={1}>
          <Scene />
        </ScrollControls>
      </Canvas>
      <ButtonSelectors />
      <BottomSelector />
    </>
  );
};

const ButtonSelectors: React.FC = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.data.items);
  const selectedIndex = useSelector(
    (state: RootState) => state.data.selectedIndex,
  );

  return (
    <>
      <div className="absolute top-0 flex h-full">
        <Button
          disabled={selectedIndex === 0}
          className="my-auto ml-4 bg-black bg-opacity-0 px-3 py-10 hover:bg-black hover:bg-opacity-10 focus:bg-black focus:bg-opacity-0 active:bg-black"
          onClick={() => dispatch(previous())}
        >
          <ChevronLeft size={32} strokeWidth={3} />
        </Button>
      </div>
      <div className="absolute right-0 top-0 flex h-full">
        <Button
          disabled={selectedIndex === items.length - 1}
          className="my-auto mr-4 bg-black bg-opacity-0 px-3 py-10 hover:bg-black hover:bg-opacity-10 focus:bg-black focus:bg-opacity-0 active:bg-black"
          onClick={() => dispatch(next())}
        >
          <ChevronRight size={32} strokeWidth={3} />
        </Button>
      </div>
    </>
  );
};

const BottomSelector: React.FC = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.data.items);
  const selectedIndex = useSelector(
    (state: RootState) => state.data.selectedIndex,
  );

  const Bar: React.FC<{
    selected?: boolean;
    mini?: boolean;
    onClick?: () => void;
  }> = ({ selected = false, mini = false, onClick = () => {} }) => {
    return (
      <div
        onClick={onClick}
        className={`relative h-16 ${
          mini ? "w-2" : "w-full hover:cursor-pointer"
        }`}
      >
        <div
          className={`absolute bottom-2 h-2 w-full rounded-lg bg-white ${
            selected ? "h-2 bg-opacity-90" : "bg-opacity-30 hover:bg-opacity-40"
          }`}
        ></div>
      </div>
    );
  };

  return (
    <div className="absolute bottom-0 mb-4 w-full px-4">
      <div className="mx-auto flex max-w-[720px] flex-row gap-4">
        <div className="flex flex-1 justify-end gap-4">
          {items
            .filter((_, index) => index < selectedIndex - 1)
            .map((item) => (
              <Bar key={item.key} mini />
            ))}
          {items
            .filter((_, index) => index == selectedIndex - 1)
            .map((item) => (
              <Bar key={item.key} onClick={() => dispatch(previous())} />
            ))}
        </div>

        <div className="flex-1">
          <Bar selected />
        </div>
        <div className="jsutify-start flex flex-1 gap-4">
          {items
            .filter((_, index) => index == selectedIndex + 1)
            .map((item) => (
              <Bar key={item.key} onClick={() => dispatch(next())} />
            ))}
          {items
            .filter((_, index) => index > selectedIndex + 1)
            .map((item) => (
              <Bar key={item.key} mini />
            ))}
        </div>

        {/* {items.map((_, index) => (
          <div
            key={_.key}
            onClick={() => dispatch(set(index))}
            className={`h-2 ${
              selectedIndex > index + 1 || selectedIndex < index - 1
                ? "w-8"
                : "w-28"
            } rounded-lg bg-white hover:cursor-pointer hover:bg-opacity-60 ${
              selectedIndex == index ? `bg-white` : `bg-white bg-opacity-40`
            }`}
          ></div>
        ))} */}
      </div>
    </div>
  );
};

type SceneProps = {};

const getScrollPositionArray = (clientHeight: number, length: number) => {
  const arr = [];
  const step = clientHeight / length;
  for (let i = 1; i < length * 2; i += 2) {
    arr.push(step * i * 2);
  }
  return arr;
};

const Scene: React.FC<SceneProps> = (props) => {
  const items = useSelector((state: RootState) => state.data.items);
  const offset = useSelector((state: RootState) => state.data.offset);
  const selectedIndex = useSelector(
    (state: RootState) => state.data.selectedIndex,
  );
  const dispatch = useDispatch();
  const cameraRef = useRef(null);
  const scroll = useScroll();

  useFrame((state, delta) => {
    dispatch(setOffset(scroll.offset));
  });

  useEffect(() => {
    const fromTopMap = getScrollPositionArray(
      scroll.el.clientHeight,
      items.length,
    );

    const newScrollHeight = fromTopMap[selectedIndex];
    scroll.el.scrollTo({ top: newScrollHeight });
    console.log(selectedIndex);
  }, [selectedIndex]);

  return (
    <mesh>
      <group>
        <PerspectiveCamera
          ref={cameraRef}
          name="Camera"
          makeDefault={true}
          far={100}
          near={0.1}
          fov={22.895}
          position={[0, 0, 16]}
        />
      </group>
      <directionalLight castShadow position={[0, 0, 16]} intensity={0.8} />
      <spotLight position={[-2, 4, 6]} intensity={8} />
      <spotLight position={[3, 4, 6]} intensity={8} />
      <ambientLight intensity={1} />
      <Suspense fallback={null}>
        <SoftShadows size={10} focus={0.5} samples={20} />
        <Models offset={offset} cameraRef={cameraRef} />
      </Suspense>
    </mesh>
  );
};
