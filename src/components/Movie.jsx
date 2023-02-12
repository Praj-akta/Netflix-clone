import React, { useEffect, useState } from "react";
import axios from "axios";
import requests from "../Requests";
import { db } from "../firebase-config";
import { Modal } from "react-bootstrap";
import { UserAuth } from "../context/AuthContext";
import { IoMdCloseCircle } from "react-icons/io";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

function Movie({ item, removeFromFavorites, showBackdropPath }) {
  const { user } = UserAuth();
  const [like, setLike] = useState(false);
  const [showModal, setModal] = useState(false);
  const [genreList, setGenreList] = useState([]);
  const [modalDetails, setModalDetails] = useState(null);
  const [selectedModalGenres, setModalGenres] = useState([]);

  const movieId = doc(db, "users", `${user?.email}`);

  useEffect(() => {
    setLike(item.favorite);
  }, [item.favorite]);

  useEffect(() => {
    axios.get(requests.genreList).then(({ data }) => {
      setGenreList(data.genres);
    });
  }, []);

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
  const onMovieClick = (item) => {
    setModal(true);
    setModalDetails(item);
    const _genres = item.genre_ids.reduce((accum, value, index) => {
      genreList.map(({ id, name }) => {
        if (parseInt(value) === parseInt(id)) {
          accum.push(name);
        }
        return accum;
      });
      return accum;
    }, []);
    setModalGenres(_genres);
  };

  const onModalClose = () => {
    setModal(false);
  };
  const imgPath = showBackdropPath ? item?.backdrop_path : item?.poster_path;
  const _releaseYear = modalDetails && new Date(modalDetails?.release_date);

  return (
    <>
      <div className="w-[120px] sm:w-[160px] md:w-[200px] lg:w-[240px] inline-block cursor-pointer relative p-1">
        <img
          alt={item?.title}
          className="w-full h-auto block rounded-sm"
          src={`https://image.tmdb.org/t/p/w500/${imgPath}`}
        />
        <div
          onClick={(_) => onMovieClick(item)}
          className="absolute top-0 left-0 w-full h-full 
            hover:bg-black/70 opacity-0 hover:opacity-100 text-white"
        >
          <p>
            {like ? (
              <FaHeart
                onClick={(_) => removeFromFavorites(item.id)}
                className="absolute top-4 left-4 text-gray-300"
              />
            ) : (
              <FaRegHeart
                onClick={(_) => addToFavorites()}
                className="absolute top-4 left-4 text-gray-300"
              />
            )}
          </p>
        </div>
        {showModal && (
          <Modal show={true} className="modal-popup">
            <Modal.Header>
              <Modal.Title>
                <img
                  src={`https://image.tmdb.org/t/p/original/${modalDetails.backdrop_path}`}
                  className="w-full h-[450px] object-cover object-top"
                  alt="bg-img"
                />
              </Modal.Title>
              <button
                onClick={onModalClose}
                className="absolute text-[25px] top-4 right-4 text-[#fff]"
              >
                <IoMdCloseCircle />
              </button>
            </Modal.Header>
            <Modal.Body className="bg-[#181818] text-[#fff] px-4 py-2 pb-[40px]">
              <h1 className="font-bold text-[32px]">{modalDetails.title}</h1>
              <div className="flex justify-between">
                <div>
                  <span className="text-[#46d369] text-[13px] font-semibold">
                    {modalDetails.vote_average * 10}% Match
                  </span>
                  <span className="text-[#fff] text-[13px] ml-2">
                    {_releaseYear.getFullYear()}
                  </span>
                  <span className="border text-[13px] ml-2 px-2">TV-MA</span>
                </div>
                <div>
                  <span className="text-[#777] text-[13px] mr-1">Genres:</span>
                  {selectedModalGenres.map((value, index) => {
                    return (
                      <span key={index} className="text-[12px] text-[#eee]">
                        {value}
                        {index !== selectedModalGenres.length - 1 ? (
                          <span>, </span>
                        ) : null}
                      </span>
                    );
                  })}
                </div>
              </div>
              <p className="text-[12px] mt-2 text-[#eee] w-[65%]">
                {modalDetails.overview}
              </p>
            </Modal.Body>
          </Modal>
        )}
      </div>
    </>
  );
}

export default Movie;
