// homepage for craigslit (currently on app.js)
import { React, useState, useEffect } from "react";
import "./homepage.css"
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import ListingLink from "../components/listinglink";
import axios from "axios";

export default function Homepage(props) {

  const [listings, setListings] = useState([])

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/posts/")
    .then((res) => {
      setListings(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [])


  return (
    <div className="homepage">
      <Sidebar />
      <div>
        <Header />
        <div className="sections-container">
          <div>
            <div className="section-title">
              free and for sale
            </div>
            <div>
              {listings.map((item) => {
                if (item.listingtype === "free and for sale") {
                  return <ListingLink key={item.id} section={"free and for sale"} title={item.title} type={item.listingtype} />
                }
              return null
              })}
            </div>
          </div>
          <div>
            <div className="section-title">
              wanted
            </div>
            <div>
              {listings.map((item) => {
                if (item.listingtype === "wanted") {
                  return <ListingLink key={item.id} section={"wanted"} title={item.title} type={item.listingtype} />
                }
              return null
              })}
            </div>          </div>
          <div>
            <div className="section-title">
              personals
            </div>
            <div>
              {listings.map((item) => {
                if (item.listingtype === "personals") {
                  return <ListingLink key={item.id} section={"personals"} title={item.title} type={item.listingtype} />
                }
              return null
              })}
            </div>
          </div>
          <div>
            <div className="section-title">
              links / discussion
            </div>
            <div>
              {listings.map((item) => {
                if (item.listingtype === "links / discussion") {
                  return <ListingLink key={item.id} section={"links / discussion"} title={item.title} type={item.listingtype} />
                }
              return null
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}