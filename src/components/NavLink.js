import { Link } from "react-router-dom";
import styled from "styled-components";

export default styled(Link)`
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  &:hover {
    background-color: #ddd;
    color: black;
  }
  .active {
    background-color: #4caf50;
    color: white;
  }
`;
