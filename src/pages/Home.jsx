import React, { useEffect } from "react";
import Rows from "../components/Rows";
import Main from "../components/Main";
import requests from "../Requests";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const { user } = UserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  const movieTypes = [
    {
      title: "UpComing",
      url: requests.requestUpcoming,
    },
    {
      title: "Popular",
      url: requests.requestPopular,
    },
    {
      title: "Trending",
      url: requests.requestTrending,
    },
    {
      title: "Top Rated",
      url: requests.requestTopRated,
    },
    {
      title: "Horror",
      url: requests.requestHorror,
    },
  ];
  return (
    <>
      <Main />
      {movieTypes.map((value, index) => {
        return (
          <Rows
            key={index}
            id={index + 1}
            title={value.title}
            fetchUrl={value.url}
          />
        );
      })}
    </>
  );
}

export default Home;
