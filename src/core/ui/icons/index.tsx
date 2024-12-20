import React from "react";
import { svgMap, SVGName } from "./svgMap";

export interface SVGIconProps extends React.HTMLAttributes<SVGElement> {
  name: SVGName;
}

const SVGIcon: React.FC<SVGIconProps> = ({
  name,
  className,
  ...otherProps
}) => {
  const SVGComponent = svgMap[name];

  if (!SVGComponent) {
    return null; // Handle missing SVGs gracefully
  }

  return <SVGComponent className={className} {...otherProps} />;
};

export default SVGIcon;
