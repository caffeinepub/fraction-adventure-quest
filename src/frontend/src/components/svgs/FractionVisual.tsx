import type { SvgType } from "../../gameData";
import CakeSVG from "./CakeSVG";
import PizzaSVG from "./PizzaSVG";
import ShapeSVG from "./ShapeSVG";

interface FractionVisualProps {
  svgType: SvgType;
  svgProps: { numerator: number; denominator: number };
  size?: number;
}

export default function FractionVisual({
  svgType,
  svgProps,
  size = 180,
}: FractionVisualProps) {
  switch (svgType) {
    case "pizza":
      return (
        <PizzaSVG
          numerator={svgProps.numerator}
          denominator={svgProps.denominator}
          size={size}
        />
      );
    case "cake":
      return (
        <CakeSVG
          numerator={svgProps.numerator}
          denominator={svgProps.denominator}
          size={size}
        />
      );
    case "circle":
      return (
        <ShapeSVG
          shapeType="circle"
          numerator={svgProps.numerator}
          denominator={svgProps.denominator}
          size={size}
        />
      );
    case "rectangle":
      return (
        <ShapeSVG
          shapeType="rectangle"
          numerator={svgProps.numerator}
          denominator={svgProps.denominator}
          size={size}
        />
      );
  }
}
