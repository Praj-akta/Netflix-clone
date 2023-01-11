import React from "react";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

export default function Header({ login, showBtn = true }) {
  const navigate = useNavigate();

  return (
    <Container className="flex a-center j-between">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      {showBtn && (
        <button onClick={(_) => navigate(login ? "/login" : "/signup")}>
          {login ? "Log In" : "Sign In"}
        </button>
      )}
    </Container>
  );
}

const Container = styled.div`
  padding: 0 1rem;
  .logo {
    img {
      height: 4rem;
    }
  }
  button {
    padding: 0.5rem 1rem;
    background-color: #e50914;
    border: none;
    color: #fff;
    cursor: pointer;
    border-radius: 0.2rem;
    font-weight: bolder;
    font-size: 1.05rem;
  }
`;
