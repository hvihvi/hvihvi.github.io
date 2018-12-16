import styled from "styled-components";
import zIndex from "./zIndex";

export default styled.div`
  overflow: hidden;
  z-index: ${zIndex.card};
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  transition: box-shadow 0.2s ease-in-out;
  background-color: white;
  border-radius: 2px;
  margin: 1rem;
  position: relative;
  &:hover {
    box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  }
`;
