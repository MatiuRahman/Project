import React from "react";
import { Alert } from "react-bootstrap";

export const Msg = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};
Msg.defaultProps = {
  variant: "info",
};
