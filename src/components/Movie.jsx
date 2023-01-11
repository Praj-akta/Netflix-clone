import React, { useState } from "react";
import { db } from "../firebase-config";
import { UserAuth } from "../context/AuthContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useEffect } from "react";

function Movie({ item, removeFromFavorites }) {
  const [like, setLike] = useState(false);
  const { user } = UserAuth();

  const movieId = doc(db, "users", `${user?.email}`);

  useEffect(() => {
    setLike(item.favorite)
  }, [item.favorite])

  const addToFavorites = async () => {
    if (user?.email) {
      setLike(!like);
      await updateDoc(movieId, {
        savedShows: arrayUnion({
          id: item.id,
          title: item.title,
          img: item.backdrop_path,
        }),
      });
    }
  };

  return (
    <>
      <div className="w-[120px] sm:w-[160px] md:w-[200px] lg:w-[240px] inline-block cursor-pointer relative p-1">
        <img
          className="w-full h-auto block rounded-sm"
          src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`}
          alt={item?.title}
        />
        <div className="absolute top-0 left-0 w-full h-full hover:bg-black/70 opacity-0 hover:opacity-100 text-white">
          <p>
            {like ? (
              <FaHeart
                onClick={_ => removeFromFavorites(item.id)}
                className="absolute top-4 left-4 text-gray-300" />
            ) : (
              <FaRegHeart 
                onClick={_ => addToFavorites()}
                className="absolute top-4 left-4 text-gray-300" />
            )}
          </p>
        </div>
      </div>
    </>
  );
}

export default Movie;
