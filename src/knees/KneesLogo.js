import React from "react";
import logo from "./logo.jpg";
import styled from "styled-components";

const KneesLogo = ({ className }) => (
  <img className={className} src={logo} alt={logo} />
);

export default styled(KneesLogo)`
  width: 10em;
  height: auto;
  padding: 1em;
`;
