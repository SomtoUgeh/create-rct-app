const JSLoaders = `
import React from "react";
import styled from "@emotion/styled";
import { Spinner as VerifySpinner } from "@chakra-ui/core";

const SpinnerContainer = styled.div\`
  display: grid;
  height: 100vh;
  place-items: center;
\`;

export function Spinner(props) {
  return <VerifySpinner size="md" {...props} />;
}

export function FullPageSpinner(props) {
  return (
    <SpinnerContainer>
      <Spinner {...props} />
    </SpinnerContainer>
  );
}
`;

const TSLoaders = `
import * as React from "react";
import styled from "@emotion/styled";
import { Spinner as VerifySpinner } from "@chakra-ui/core";

const SpinnerContainer = styled.div\`
  display: grid;
  place-items: center;
  height: 100vh;
\`;

export function Spinner(props: {}) {
  return <VerifySpinner size="md" {...props} />;
}

export function FullPageSpinner(props: {}) {
  return (
    <SpinnerContainer>
      <Spinner {...props} />
    </SpinnerContainer>
  );
}
`;

module.exports = {
  JSLoaders,
  TSLoaders
};
