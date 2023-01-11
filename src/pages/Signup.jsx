import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import BackgroundImage from "../components/BackgroundImage";

export default function Signup() {
  const navigate = useNavigate();
  const { signUp } = UserAuth();
  const [emailErr, setEmailErr] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formvalues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    try {
      const { email, password } = formvalues;
      await signUp(email, password);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const onGetStarted = () => {
    if (formvalues.email) {
      setEmailErr(null);
      setShowPassword(true);
    } else {
      setEmailErr("This field is required");
      setShowPassword(false);
    }
  };

  return (
    <Container showPassword={showPassword}>
      <BackgroundImage />
      <div className="content">
        <Header login={true} />
        <div className="body flex column a-center j-center">
          <div className="text flex column">
            <h1>Unlimited movies, TV shows and more</h1>
            <h5>Watch anywhere. Cancel anytime.</h5>
            <h6>
              Ready to watch? Enter your email to create or restart membership
            </h6>
          </div>
          <div className="form">
            <input
              type="email"
              name="email"
              value={formvalues.email}
              placeholder="Email Address"
              onChange={(e) =>
                setFormValues({
                  ...formvalues,
                  email: e.target.value,
                })
              }
            />
            {showPassword && (
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formvalues.password}
                onChange={(e) =>
                  setFormValues({
                    ...formvalues,
                    password: e.target.value,
                  })
                }
              />
            )}
            {!showPassword && (
              <button onClick={(_) => onGetStarted()}>Get Started</button>
            )}
            {emailErr && <p>{emailErr}</p>}
          </div>
          {formvalues.email && formvalues.password ? (
            <button onClick={(_) => handleSubmit()}> Sign Up</button>
          ) : null}
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
    .body {
      gap: 1rem;
      .text {
        gap: 1rem;
        text-align: center;
        font-size: 2rem;
        h1 {
          padding: 0 18%;
          font-size: 3rem;
        }
        h5,
        h6 {
          font-weight: 400;
        }
        h6 {
          font-size: 17px;
          padding-top: 10px;
        }
      }
      .form {
        display: grid;
        grid-template-columns: ${({ showPassword }) =>
          showPassword ? "1fr 1fr" : "2fr 1fr"};
        width: 60%;
        input {
          color: #000;
          border: none;
          padding: 1rem;
          font-size: 1rem;
          border: 1px solid #000;
          &:focus {
            outline: none;
          }
        }
        button {
          padding: 0.5rem 1rem;
          background-color: #e50914;
          border: none;
          color: #fff;
          cursor: pointer;
          font-weight: bolder;
          font-size: 1.05rem;
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
    }
  }
`;
