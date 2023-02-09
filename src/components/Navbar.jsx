import React, { useState } from "react";
import logo from "../assets/logo.png";
import styled from "styled-components";
import { UserAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FaPowerOff, FaSearch } from "react-icons/fa";

function Navbar({ isScrolled }) {
  const navigate = useNavigate();
  const { logout } = UserAuth();
  const links = [
    { name: "Home", link: "/" },
    { name: "Movies", link: "/movies" },
    { name: "My List", link: "/mylist" },
  ];
  const [showSearch, setShowSearch] = useState(false);
  const [inputHover, setInputHover] = useState(false);

  const onLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <nav className={`flex ${isScrolled ? "scrolled" : ""}`}>
        <div className="left flex a-center">
          <div className="brand flex a-center j-center">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <ul className="links flex">
            {links.map(({ name, link }) => {
              return (
                <li key={name}>
                  <Link to={link}>{name}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="right flex a-center">
          <div className={`search ${showSearch ? "show-search" : ""}`}>
            <button
              onFocus={(_) => setShowSearch(true)}
              onBlur={(_) => {
                if (!inputHover) setShowSearch(false);
              }}
            >
              <FaSearch />
            </button>
            <input
              type="text"
              placeholder="Search"
              onMouseEnter={(_) => setInputHover(true)}
              onMouseLeave={(_) => setInputHover(false)}
              onBlur={(_) => {
                setInputHover(false);
                setShowSearch(false);
              }}
            />
          </div>
          <button onClick={onLogout}>
            <FaPowerOff />
          </button>
        </div>
      </nav>
    </Container>
  );
}

export default Navbar;

const Container = styled.div`
  .scrolled {
    background: #000;
  }
  nav {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 2;
    padding: 0.5rem 2rem;
    align-items: center;
    transition: 0.3s ease-in-out;
    justify-content: space-between;
    .left {
      gap: 2rem;
      .brand {
        img {
          height: 2.5rem;
        }
      }
      .links {
        list-style-type: none;
        gap: 1.2rem;
        li {
          a {
            color: #fff;
            font-size: 12px;
            font-weight: 400;
            text-decoration: none;
          }
        }
      }
    }
    .right {
      gap: 1rem;
      button {
        border: 0;
        cursor: pointer;
        background-color: transparent;
        &:focus {
          outline: none;
        }
        svg {
          color: #f34242;
          font-size: 1.2rem;
        }
      }
      .search {
        display: flex;
        gap: 0.4rem;
        align-items: center;
        justify-content: center;
        padding: 0.2rem;
        padding-left: 0.5rem;
        button {
          background-color: transparent;
          svg {
            color: #fff;
          }
        }
        input {
          width: 0;
          color: #fff;
          opacity: 0;
          visibility: hidden;
          transition: 0.3s ease-in-out;
          background-color: transparent;
          border: none;
          &:focus {
            outline: none;
          }
        }
      }
      .show-search {
        width: 250px;
        padding: 10px;
        border: 1px solid #fff;
        background-color: rgba(0, 0, 0, 0.6);
        input {
          width: 100%;
          opacity: 1;
          visibility: visible;
          padding: 0 0.5rem;
        }
      }
    }
  }
`;
