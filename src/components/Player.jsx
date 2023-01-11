import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import video from "../assets/avatar-trailer.mp4";

function Player() {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <div className="w-full h-full">
        <div
          className="absolute top-5 left-5 bg-black/60 p-2 z-20 rounded-full cursor-pointer"
          onClick={(_) => navigate(-1)}
        >
          <BsArrowLeft className="text-sm" />
        </div>
        <video
          src={video}
          autoPlay
          loop
          controls
          className="w-[100vw] h-[100vh] object-cover"
        ></video>
      </div>
    </React.Fragment>
  );
}

export default Player;
