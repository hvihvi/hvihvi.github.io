import React from "react";
import styled from "styled-components";
import zIndex from "./zIndex";

const Content = styled.div`
  padding-top: 80px;
`;
const NavBar = ({ className, children, links }) => (
  <>
    <header>
      <div className={className}>{links}</div>
    </header>
    <main>
      <Content>{children}</Content>
    </main>
  </>
);

export default styled(NavBar)`
  display: flex;
  flex-direction: table-column;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  background-color: #333;
  z-index: ${zIndex.navBar};
  padding-top: 1em;
  padding-bottom: 1em;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: auto;
  right: 0;
`;
