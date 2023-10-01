import React from "react";

interface HeadingProps {
  headerSize: number;
  children: React.ReactNode;
}

export default function Heading({ headerSize, children }: HeadingProps) {
  if (headerSize === 1) return <h1 style={{ fontSize: "30px" }}>{children}</h1>;
}
