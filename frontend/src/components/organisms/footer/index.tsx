import React, { FC } from "react";
import styled from "@emotion/styled";

const FooterMenu = styled.div`
  display: flex;
  background-color: #354649;
  overflow: hidden;
   bottom: 0px;
   width: 100%;
  /* Style the links inside the navigation bar */
  span {
    float: left;
    color: #f2f2f2;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;
  }

  div {
    float: left;
    color: #f2f2f2;
    text-align: center;
    text-decoration: none;
    font-size: 17px;
  }

  /* Change the color of links on hover */
  a:hover {
    background-color: #6c7a89;
    color: black;
  }

  /* Add a color to the active/current link */
  span.active {
    background-color: #6c7a89;
    color: white;
  }

  .source {
    margin-left: auto;
  }
`;

const Footer: FC = () => {
  return (
    <FooterMenu className="footer">
      <div className="source">
        <span>2024</span>
      </div>
    </FooterMenu>
  );
};

export default Footer;
