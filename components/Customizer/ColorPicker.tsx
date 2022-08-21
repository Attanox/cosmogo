import React from "react";
import { HexColorPicker } from "react-colorful";

type LocalProps = {
  current: string | null;
  changeColor: (c: string) => void;
  currentColor: string;
};

const COLOR_PICKER_WIDTH = "100px";
const COLOR_PICKER_HEIGHT = "100px";

const ColorPicker = (props: LocalProps) => {
  const { changeColor, currentColor, current } = props;

  return (
    <div
      style={{
        top: `calc(${COLOR_PICKER_HEIGHT} / 2)`,
        left: `calc(${COLOR_PICKER_WIDTH} / 2)`,
      }}
      className="absolute flex flex-col justify-center align-start"
    >
      <HexColorPicker
        style={{
          height: COLOR_PICKER_HEIGHT,
          width: COLOR_PICKER_WIDTH,
        }}
        color={currentColor}
        onChange={changeColor}
      />
      <h1 className="text-sm font-medium mt-2 text-neutral">{current || ""}</h1>
    </div>
  );
};

export default ColorPicker;
