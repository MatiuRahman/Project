import React from "react";
import { Spinner } from "react-bootstrap";

export const Loader = () => {
  return (
    // <Button variant="light" disabled>
    <Spinner
      as="span"
      animation="grow"
      // size="sm"
      role="status"
      aria-hidden="true"
    />
    /* &nbsp; Loading...
    </Button> */
  );
};
