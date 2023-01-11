import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase-config";

function MyList() {
  const { user } = UserAuth();
  const navigate = useNavigate();
  const [favoritesList, setFavoritesList] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setFavoritesList(doc.data()?.savedShows);
    });
  }, [user?.email]);

  const movieRef = doc(db, "users", `${user?.email}`);
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

  return (
    <>
      <Navbar />
      <div className="w-full h-auto absolute top-[80px] px-5">
        <h1 className="px-5 pb-5">My List</h1>
        <div className="px-4 w-full h-full pt-3">
          {favoritesList && favoritesList.length > 0 ? (
            favoritesList.map((item, index) => {
              return (
                <div
                  key={index}
                  className="w-[120px] sm:w-[160px] md:w-[200px] lg:w-[240px] inline-block cursor-pointer relative p-1"
                >
                  <img
                    className="w-full h-auto block rounded-sm"
                    src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
                    alt={item?.title}
                  />
                  <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
                    <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
                      {item?.title}
                    </p>
                    <p
                      className="absolute text-gray-300 top-4 right-4"
                      onClick={(_) => removeFromFavorites(item.id)}
                    >
                      <AiOutlineClose />
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-white/40 text-center pt-[100px]">
              You haven't added any titles to your list yet.
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MyList;
