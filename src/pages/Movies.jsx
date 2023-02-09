import React, { useEffect, useState } from "react";
import requests from "../Requests";
import Rows from "../components/Rows";
import Navbar from "../components/Navbar";
import axios from "axios";

function Movies() {
  const [genres, setGenreList] = useState(null);
  const [selectedGenreId, setSelectedGenreId] = useState(null);
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

  useEffect(() => {
    axios.get(requests.genreList).then(({ data }) => {
      setGenreList(data.genres);
    });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="pt-5">
        <span className="pl-4"> Select Genre: </span>
        <select className="select-genre" onChange={e => setSelectedGenreId(e.target.value)}>
          <option value="all"> All </option>
          {
            genres?.map(({id, name}) => {
              return (
                <option value={id} key={id}> {name} </option>
              )
            })
          }
        </select>
        {movieTypes.map((value, index) => {
          return (
            <Rows
              key={index}
              id={index + 1}
              title={value.title}
              fetchUrl={value.url}
              showBackdropPath={true}
              selectedGenreId={selectedGenreId}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Movies;
