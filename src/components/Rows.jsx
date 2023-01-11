import axios from "axios";
import Movie from "./Movie";
import { db } from "../firebase-config";
import { UserAuth } from "../context/AuthContext";
import React, { useState, useEffect } from "react";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

function Rows({ title, fetchUrl, id }) {
  const { user } = UserAuth();
  const [movies, setMovies] = useState([]);
  const [favoritesList, setFavoritesList] = useState([]);

  useEffect(() => {
    axios.get(fetchUrl).then(({ data }) => {
      setMovies(data.results);
    });
  }, [fetchUrl]);

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setFavoritesList(doc.data()?.savedShows);
    });
  }, [user?.email]);

  const movieRef = doc(db, 'users', `${user?.email}`);
  const removeFromFavorites = async (id) => {
    try {
      const res = favoritesList.filter((item) => item.id !== id);
      await updateDoc(movieRef, {
        savedShows: res,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const slideLeft = () => {
    let slider = document.getElementById("slider" + id);
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    let slider = document.getElementById("slider" + id);
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <>
      <h2 className="text-white/70 font-bold md:text-xl p-4">{title}</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          size={50}
          onClick={slideLeft}
          className="text-white hidden rounded-full 
                absolute left-0 opacity-50 hover:opacity-100 cursor-pointer z-10 group-hover:block"
        />
        <div
          id={"slider" + id}
          className="relative w-full h-full overflow-x-scroll 
            whitespace-nowrap scroll-smooth scrollbar-hide"
        >
          {movies.map((item, index) => {
            let modifiedItem = favoritesList?.map((value) => {
              if (item.id === value.id) {
                item = {
                  ...item,
                  favorite: true,
                };
              }
              return item;
            });
            return (
              <Movie
                key={index}
                item={item}
                removeFromFavorites={removeFromFavorites}
              />
            );
          })}
        </div>
        <MdChevronRight
          size={50}
          onClick={slideRight}
          className="text-white hidden rounded-full 
                absolute right-0 opacity-50 hover:opacity-100 cursor-pointer z-10 group-hover:block"
        />
      </div>
    </>
  );
}

export default Rows;
