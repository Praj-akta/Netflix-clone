import React from "react";
import kids from "../assets/kids.png";
import profile1 from "../assets/profile1.png";
import profile2 from "../assets/profile2.png";
import profile3 from "../assets/profile3.png";
import { useNavigate } from "react-router-dom";

function ManageProfiles() {
const navigate = useNavigate();
  const profiles = [
    { id: 1, imgUrl: profile1, title: "Sherlock" },
    { id: 2, imgUrl: profile2, title: "Enola" },
    { id: 3, imgUrl: profile3, title: "Elena" },
    { id: 4, imgUrl: kids, title: "children" },
  ];
  return (
    <div className="flex j-center a-center h-[90vh] column">
      <h1 className="font-larger">Who's watching?</h1>
      <div className="flex">
        {profiles.map(({ imgUrl, title }, index) => {
          return (
            <div 
              key={index}
              className="profiles cursor-pointer" 
              onClick={_ => navigate("/")}>
              <img
                src={imgUrl}
                alt="profile-imgs"
                onClick={_ => navigate("/")}
                className="w-[80px] h-[80px] m-[7px] rounded-md"
              />
              <h6 className="text-center text-[12px] text-[#808080]">{title}</h6>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ManageProfiles;
