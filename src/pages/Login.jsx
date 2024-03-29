import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import BackgroundImage from "../components/BackgroundImage";

export default function Login() {
  const navigate = useNavigate();
  const { login } = UserAuth();
  const [error, setError] = useState("");
  const [formvalues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { email, password } = formvalues;
      await login(email, password);
      navigate("/browse");
    } catch (error) {
      if(error.message === "Firebase: Error (auth/user-not-found).") {
        setError("Sorry, we can't find an account with this email address. Please try again or create a new account.")
      } else if(error.message === "Firebase: Error (auth/wrong-password).") {
        setError("Incorrect password. Please try again.")
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <Container>
      <BackgroundImage />
      <div className="content">
        <Header showBtn={false} />
        <div className="form-container flex-column a-center j-center">
          <div className="form flex column">
            <div>
              <h2>Sign In</h2>
            </div>
            {error && <p className="error-msg">{error}</p>}
            <form onSubmit={handleLogin} className="container flex column">
              <input
                type="email"
                name="email"
                required
                value={formvalues.email}
                placeholder="Email Address"
                onChange={(e) =>
                  setFormValues({
                    ...formvalues,
                    email: e.target.value,
                  })
                }
              />
              <input
                type="password"
                name="password"
                required
                placeholder="Password"
                value={formvalues.password}
                onChange={(e) =>
                  setFormValues({
                    ...formvalues,
                    password: e.target.value,
                  })
                }
              />
              <button type="submit">
                Sign In
              </button>
              <div className="redirect-url">
                New to Netflix? <a href="/signup">Sign up now</a>
                <p>
                  This page is protected by Google reCAPTCHA to ensure you're
                  not a bot.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.6);
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 15vh 85vh;
    .error-msg {
      color: #fff;
      font-size: 14px;
      border-radius: 4px;
      padding: 10px 20px;
      background: #e87c03;
    }
    .form-container {
      gap: 2rem;
      height: 85vh;
      .form {
        padding: 2rem 3rem;
        width: 400px;
        background: #000000b0;
        gap: 2rem;
        color: #fff;
        margin: 0 auto;
        .container {
          gap: 1rem;
          input {
            color: #fff;
            padding: 0.5rem 1rem;
            width: 100%;
            background: #333;
            outline: none;
            border: none;
            height: 45px;
            border-radius: 5px;
          }
          button {
            padding: 0.5rem 1rem;
            background-color: #e50914;
            border: none;
            color: #fff;
            cursor: pointer;
            font-weight: bolder;
            font-size: 1.05rem;
            margin-top: 20px;
            height: 45px;
            border-radius: 5px;
          }
          .redirect-url {
            padding-top: 40px;
            color: #737373;
            font-size: 14px;
            font-weight: 400;
            margin-top: 16px;
            a {
              color: #fff;
              text-decoration: none;
            }
            p {
              font-size: 11px;
              margin-top: 10px;
            }
          }
        }
      }
    }
  }
`;
