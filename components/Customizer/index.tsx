import React, { useState } from "react";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ColorPicker from "./ColorPicker";
import Model from "./Model";
import { useCartId } from "hooks/cart.hooks";
import { GetCartDocument, useChangeSuitMutation, useGetCartQuery } from "types";
import { debounce } from "ts-debounce";

type TGenericObject = { [key: string]: string };

export type TGlobalState = {
  current: string;
  items: TGenericObject;
};

const INITIAL_STATE: TGlobalState = {
  current: "",
  items: {},
};

const createInitialState = (initItemColors: TGenericObject = {}) => {
  return {
    ...INITIAL_STATE,
    items: {
      ...initItemColors,
    },
  };
};

export const Customizer = () => {
  const { cartId } = useCartId();

  const [state, setState] = useState<TGlobalState>(INITIAL_STATE);

  const { data: cartData, loading } = useGetCartQuery({
    variables: { id: cartId || "" },
    skip: !cartId,
    onCompleted(data) {
      const initState = createInitialState({
        Suit_Base: data?.cart?.suit.baseColor as string,
        Suit_Details: data?.cart?.suit.detailsColor as string,
      });
      setState(initState);
    },
  });

  const [changeSuit] = useChangeSuitMutation({
    refetchQueries: [GetCartDocument],
  });

  const setCurrent = (current: string) => {
    setState({ ...state, current });
  };

  const onMutateSuitColor = () => {
    const input: { [key: string]: string } = {};
    input["baseColor"] = state.items["Suit_Base"];
    input["detailsColor"] = state.items["Suit_Details"];

    changeSuit({
      variables: {
        input: {
          cartId,
          ...input,
        },
      },
    });
  };

  const changeColor = (color: string) => {
    setState({ ...state, items: { ...state.items, [state.current]: color } });
  };

  if (!cartId || loading)
    return <div className="text-center text-large">Loading...</div>;

  if (!cartData?.cart) return null;

  return (
    <div
      style={{ height: "700px" }}
      className="w-full relative bg-neutral p-2 rounded-md"
    >
      <ColorPicker
        changeColor={changeColor}
        currentColor={state.items[state.current]}
      />
      <button
        onClick={onMutateSuitColor}
        type="button"
        className="absolute z-30 btn btn-primary top-6 right-6"
      >
        Submit colors
      </button>
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
