import styled from "styled-components";
import { NavLink } from "react-router-dom";

export default styled(NavLink)`
  text-decoration: none;
  text-transform: uppercase;
  text-align: center;
  box-sizing: border-box;
  min-width: 64px;
  min-height: 36px;
  padding: 8px 16px;
  margin: 0px 5px;
  color: grey;
  border-radius: 2px;
  background-color: transparent;
  transition: background-color 0.4s linear;
  &.active {
    background-color: whitesmoke;
  }
  &:hover {
    text-decoration: none;
    background-color: whitesmoke;
  }
  @media (hover: none) {
    background-color: transparent;
  }
`;
