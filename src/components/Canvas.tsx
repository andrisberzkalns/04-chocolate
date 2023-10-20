import {
  AccumulativeShadows,
  CameraControls,
  Center,
  RandomizedLight,
  MeshPortalMaterial,
  ScrollControls,
  Edges,
  Scroll,
  useScroll,
  View,
  useGLTF,
  SoftShadows,
  PerspectiveCamera,
  KeyboardControlsEntry,
  KeyboardControls,
  useKeyboardControls,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Suspense,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { easing } from "maath";
import { proxy, useSnapshot } from "valtio";
import { state } from "~/store";
import * as THREE from "three";
// import useRefs from "~/hooks/useRefs";
import useRefs from "react-use-refs";
import { PergaleDark } from "./PergaleDark";
import { PergaleCranberries } from "./PergaleCranberries";
import Models from "./Model";
import { Button } from "~/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Events, scrollSpy, animateScroll as scroll } from "react-scroll";

enum Controls {
  left = "left",
  right = "right",
}

export default ({ position = [0, 0, 5], fov = 25 }) => {
  const [ref, view1, view2, view3, view4] = useRefs();

  const scrollTo = () => {
    scroll.scrollMore(100); // Scrolling to 100px from the top of the page.
  };

  const map = useMemo<KeyboardControlsEntry<Controls>[]>(
    () => [
      { name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
      { name: Controls.right, keys: ["ArrowRight", "KeyD"] },
    ],
    [],
  );

  return (
    <>
      <div className="absolute z-10 w-full p-4 align-middle">
        <Button onClick={() => {}}>
          <ArrowLeft />
        </Button>
        <Button className="float-right" onClick={scrollTo}>
          <ArrowRight />
        </Button>
      </div>
      <KeyboardControls map={map}>
        <Canvas
          id="scroller"
          className="absolute left-0 top-0 h-[100vh] w-[100vw]"
          shadows
          gl={{ preserveDrawingBuffer: true }}
          eventPrefix="client"
        >
          {/* <CameraControls
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
          maxAzimuthAngle={Math.PI / 4}
          minAzimuthAngle={-Math.PI / 4}
          truckSpeed={0}
          minDistance={3}
          maxDistance={10}
        /> */}
          <ScrollControls infinite pages={3} damping={0.5} distance={1}>
            <Scene />
          </ScrollControls>
        </Canvas>
      </KeyboardControls>
    </>
  );
};

interface CameraPayload {
  position: [number, number, number];
  fov: number;
  rotation: [number, number, number];
}

enum StateReducerActions {
  SET_OFFSET = "SET_OFFSET",
  SET_CAMERA = "SET_CAMERA",
}

interface StateAction {
  type: StateReducerActions;
  payload: any;
}

interface State {
  offset: number;
  camera: CameraPayload;
}

const stateReducer = (state: State, action: StateAction) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_OFFSET":
      return { ...state, offset: action.payload };
    case "SET_CAMERA":
      return { ...state, camera: action.payload };
    default:
      return state;
  }
};

const Scene: React.FC<any> = ({
  rotation = [0, 0, 0],
  bg = "#f0f0f0",
  elmt = "#000",
  index = 0,
  length = 1,
}) => {
  let selectedElement = -1;
  const fromTopMap = [641, 1924, 3207];

  const mesh = useRef(null);
  const cameraRef = useRef(null);
  const scroll = useScroll();
  const [state, dispatch] = useReducer(stateReducer, {
    offset: 0,
    camera: {
      position: [0, 0, 16],
      fov: 22.895,
      rotation: [0, 0, 0],
    },
  });
  const [sub, get] = useKeyboardControls<Controls>();

  useFrame((state, delta) => {
    // The offset is between 0 and 1, you can apply it to your models any way you like
    dispatch({
      type: StateReducerActions.SET_OFFSET,
      payload: scroll.offset,
    });
  });

  useEffect(() => {
    return sub(
      (state) => state.right,
      (pressed) => {
        if (!pressed) return;

        selectedElement++;
        console.log(selectedElement);
        console.log(scroll.el.clientHeight);
        if (fromTopMap.length < selectedElement + 1) {
          selectedElement--;
        }
        scroll.el.scrollTo({ top: fromTopMap[selectedElement] });
      },
    );
  }, []);

  useEffect(() => {
    return sub(
      (state) => state.left,
      (pressed) => {
        if (!pressed) return;

        selectedElement--;
        console.log(selectedElement);
        console.log(scroll.el.clientHeight);
        if (selectedElement < 0) {
          selectedElement = 0;
        }
        scroll.el.scrollTo({ top: fromTopMap[selectedElement] });
      },
    );
  }, []);

  useEffect(() => {}, []);

  return (
    <mesh ref={mesh} position={[0, 0, 0]}>
      <group ref={cameraRef}>
        <PerspectiveCamera
          name="Camera"
          makeDefault={true}
          far={100}
          near={0.1}
          fov={22.895}
          position={[0, 0, 16]}
        />
      </group>

      <directionalLight castShadow position={[0, 0, 16]} intensity={0.5} />
      <spotLight position={[-2, 4, 6]} intensity={6} />
      <spotLight position={[3, 4, 6]} intensity={6} />
      <ambientLight intensity={0.5} />
      <Suspense fallback={null}>
        <SoftShadows size={10} focus={0.5} samples={20} />
        <Models offset={state.offset} cameraRef={cameraRef} />
      </Suspense>
    </mesh>
  );
};
