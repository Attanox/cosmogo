import React from "react";
import { HexColorPicker } from "react-colorful";

interface LocalProps {
  changeColor: (c: string) => void;
  currentColor: string;
}

const COLOR_PICKER_WIDTH = "100px";
const COLOR_PICKER_HEIGHT = "100px";

const ColorPicker = (props: LocalProps) => {
  const { changeColor, currentColor } = props;

  return (
    <div className="absolute top-6 left-6 flex flex-col justify-center align-start">
      <HexColorPicker
        style={{
          height: COLOR_PICKER_HEIGHT,
          width: COLOR_PICKER_WIDTH,
        }}
        color={currentColor}
        onChange={changeColor}
      />
      <div className="flex flex-col items-center">
        {/* todo: add clickable items */}
      </div>
    </div>
  );
};

export default ColorPicker;
