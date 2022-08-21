import React, { useState } from "react";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ColorPicker from "./ColorPicker";
import Model from "./Model";

type TGenericObject = { [key: string]: string };

export type TGlobalState = {
  current: string;
  items: TGenericObject;
};

interface LocalProps {
  initialColors: TGenericObject;
  onChange?: (current: string, color: string) => void;
}

const createInitialState = (initItemColors: TGenericObject = {}) => {
  const INITIAL_STATE: TGlobalState = {
    current: "",
    items: {},
  };

  return {
    ...INITIAL_STATE,
    items: {
      ...initItemColors,
    },
  };
};

export const Customizer = (props: LocalProps) => {
  const [state, setState] = useState(createInitialState(props.initialColors));

  const setCurrent = (current: string) => {
    setState({ ...state, current });
  };

  const changeColor = (color: string) => {
    setState({ ...state, items: { ...state.items, [state.current]: color } });
    props.onChange && state.current && props.onChange(state.current, color);
  };

  return (
    <div style={{ height: "500px" }} className="w-full relative">
      <ColorPicker
        changeColor={changeColor}
        current={state.current}
        currentColor={state.items[state.current]}
      />
      <Canvas style={{ width: "100%", height: "100%" }}>
        <ambientLight intensity={0.3} />
        <spotLight
          intensity={0.9}
          angle={0.1}
          penumbra={1}
          position={[10, 15, 10]}
          castShadow
        />
        <spotLight
          intensity={0.9}
          angle={0.1}
          penumbra={1}
          position={[-10, 15, -10]}
          castShadow
        />
        <Suspense fallback={null}>
          <Model setCurrent={setCurrent} state={state} />
        </Suspense>
        <OrbitControls
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
          enableRotate={true}
          enableZoom={true}
          enablePan={false}
        />
      </Canvas>
    </div>
  );
};
