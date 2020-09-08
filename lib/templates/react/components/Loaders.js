const JSLoaders = `
import React from "react";
import styled from "styled-components";
import Loader from 'react-loader-spinner';

const SpinnerContainer = styled.div\`
  display: grid;
  place-items: center;
  height: 100vh;
\`;

export function Spinner(props) {
  return  <Loader type="Oval" color="#000" width={90} height={22.5} {...props} />;
}

export function FullPageSpinner(props) {
  return (
    <SpinnerContainer>
      <Spinner {...props} />
    </SpinnerContainer>
  );
};
`;

const TSLoaders = `
import * as React from "react";
import styled from "styled-components";
import Loader from 'react-loader-spinner';

const SpinnerContainer = styled.div\`
  display: grid;
  place-items: center;
  height: 100vh;
\`;

export function Spinner(props: {}) {
  return  <Loader type="Oval" color="#000" width={90} height={22.5} {...props} />;
}

export function FullPageSpinner(props: {}) {
  return (
    <SpinnerContainer>
      <Spinner {...props} />
    </SpinnerContainer>
  );
};
`;

module.exports = {
  JSLoaders,
  TSLoaders
};
