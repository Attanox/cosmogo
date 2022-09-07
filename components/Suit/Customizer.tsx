import React from "react";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ColorPicker from "./ColorPicker";
import Model from "./Model";
import { GetCartDocument, useChangeSuitMutation } from "types/appTypes";
import { type TItems } from ".";

interface LocalProps {
  cartId: string;
  initItems: TItems;
}

type TCurrent = keyof TItems;

const PartPicker = (props: {
  items: TItems;
  setCurrent: (c: TCurrent | "") => void;
}) => {
  const { items, setCurrent } = props;

  return (
    <div className="flex flex-col items-center justify-center">
      {Object.keys(items).map((key) => {
        return (
          <button
            onClick={() => setCurrent(key as keyof TItems)}
            type="button"
            key={key}
            className="btn text-white btn-ghost"
          >
            {key}
          </button>
        );
      })}
    </div>
  );
};

const SubmitColors = (props: { items: TItems; cartId: string }) => {
  const { cartId, items } = props;

  const [success, setSuccess] = React.useState(false);

  const [changeSuit, { loading: changingSuit }] = useChangeSuitMutation({
    refetchQueries: [GetCartDocument],
    onCompleted(data) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 1500);
    },
  });

  const onMutateSuitColor = () => {
    const input: { [key: string]: string } = {};
    input["baseColor"] = items["Suit_Base"];
    input["detailsColor"] = items["Suit_Details"];

    changeSuit({
      variables: {
        input: {
          cartId,
          ...input,
        },
      },
    });
  };

  return (
    <button
      onClick={onMutateSuitColor}
      type="button"
      disabled={changingSuit}
      className={`btn btn-primary ${changingSuit ? "loading" : ""} ${
        success ? "btn-success gap-2" : ""
      }`}
    >
      {success && !changingSuit ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
          />
        </svg>
      ) : null}
      Submit colors
    </button>
  );
};

export const Customizer = (props: LocalProps) => {
  const { cartId, initItems } = props;

  const [current, setCurrent] = React.useState<TCurrent | "">("");

  const [items, setItems] = React.useState<TItems>(initItems);

  const changeColor = (color: string) => {
    setItems((prevItems) => ({
      ...prevItems,
      [current]: color,
    }));
  };

  return (
    <div
      style={{ height: "50vh" }}
      className="w-full relative bg-neutral p-2 pt-28 sm:pt-2 pb-8 sm:pb-2 box-content rounded-sm"
    >
      <div className="flex flex-row sm:flex-col absolute top-6 left-1/2 sm:left-6 -translate-x-1/2 sm:translate-x-0 z-20 justify-center align-start">
        <ColorPicker
          changeColor={changeColor}
          currentColor={current ? items[current] : ""}
        />
        <div className="w-4 h-4" />
        <PartPicker items={items} setCurrent={setCurrent} />
      </div>

      <div className="block absolute z-30 -bottom-3 sm:top-6 right-1/2 sm:right-6 translate-x-1/2 sm:translate-x-0">
        <SubmitColors cartId={cartId} items={items} />
      </div>
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
          <Model setCurrent={setCurrent} items={items} />
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
