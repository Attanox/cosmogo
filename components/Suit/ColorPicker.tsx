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
    <HexColorPicker
      style={{
        height: COLOR_PICKER_HEIGHT,
        width: COLOR_PICKER_WIDTH,
      }}
      color={currentColor}
      onChange={changeColor}
      className="rounded-sm"
    />
  );
};

export default ColorPicker;
