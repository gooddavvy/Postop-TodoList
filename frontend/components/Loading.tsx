import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

interface LoaderProps {
  loading: boolean;
}

export default function SpinningLoader({ loading }: LoaderProps) {
  return loading ? <CircularProgress title="Loading..." /> : <></>;
}
