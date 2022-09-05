import React from "react";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ColorPicker from "./ColorPicker";
import Model from "./Model";
import { GetCartDocument, useChangeSuitMutation } from "types/appTypes";
import { TItems } from "pages/suit";

interface LocalProps {
  cartId: string;
  initItems: TItems;
}

type TCurrent = keyof TItems;

export const Customizer = (props: LocalProps) => {
  const { cartId, initItems } = props;

  const [current, setCurrent] = React.useState<TCurrent | "">("");

  const [items, setItems] = React.useState<TItems>(initItems);
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

  const changeColor = (color: string) => {
    setItems((prevItems) => ({
      ...prevItems,
      [current]: color,
    }));
  };

  return (
    <div
      style={{ height: "50vh" }}
      className="w-full relative bg-neutral p-2 rounded-md"
    >
      <ColorPicker
        changeColor={changeColor}
        currentColor={current ? items[current] : ""}
      />
      <div className="absolute left-6 top-36 z-20 flex flex-col">
        {Object.keys(items).map((key) => {
          return (
            <button
              onClick={() => setCurrent(key as keyof TItems)}
              type="button"
              key={key}
              className="btn btn-ghost"
            >
              {key}
            </button>
          );
        })}
      </div>

      <button
        onClick={onMutateSuitColor}
        type="button"
        disabled={changingSuit}
        className={`absolute z-30 btn btn-primary top-6 right-6 ${
          changingSuit ? "loading" : ""
        } ${success ? "btn-success gap-2" : ""}`}
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
