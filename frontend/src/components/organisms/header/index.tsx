import React, { FC } from "react";
import styled from "@emotion/styled";

const HeaderMenu = styled.div`
  background-color: #354649;
  overflow: hidden;

  a {
    float: left;
    color: #f2f2f2;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;
  }

  a:hover {
    background-color: #6C7A89;
    color: black;
  }

  /* Add a color to the active/current link */
  a.active {
    background-color: #6C7A89;
    color: white;
  }
`;

const Header: FC = () => {
  return (
    <HeaderMenu>
      <a className="active">
        STORY POINTER
      </a>
      <a href="/create">Create Session</a>
    </HeaderMenu>
  );
};

export default Header;
