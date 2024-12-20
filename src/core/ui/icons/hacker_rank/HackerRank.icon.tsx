import React from "react";

export const HackerRank = (props: React.HTMLAttributes<SVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      viewBox="0 0 100 100"
      fill="none"
    >
      <rect width="100" height="100" fill="#1C1C1C" />
      <rect x="20" y="25" width="20" height="50" fill="#FFFFFF" />
      <rect x="60" y="25" width="20" height="50" fill="#FFFFFF" />
      <rect x="40" y="45" width="20" height="10" />
      <rect x="60" y="25" width="20" height="50" fill="#2EC866" />
    </svg>
  );
};
