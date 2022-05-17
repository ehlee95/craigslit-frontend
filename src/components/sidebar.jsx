import React from "react";
import "./sidebar.css"
import { useNavigate } from "react-router-dom";

export default function Sidebar(props) {

  let navigate = useNavigate();
  let handlePost = (e) => {
    e.preventDefault();
    navigate("/post");
  }

  return (
    <div className="sidebar-container">
      <div className="sidebar-title">Craigslit</div>
      <div className="sidebar-create"><span className="sidebar-create-button" onClick={handlePost}>create a post</span></div>
      <div className="sidebar-search">
        <input type="text" name="search" placeholder="Search Craigslit"/>
      </div>
      <div className="sidebar-calendar">calendar</div>
      <div className="sidebar-party-info">craigslit is a party experience</div>
      <div className="sidebar-about">about</div>
    </div>
  );
}