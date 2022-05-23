// form for submitting a post
import { React, useRef, useState } from "react"
import "./submitform.css"
import { useNavigate, useLocation } from "react-router-dom"
import axios from "axios"

export default function SubmitForm(props) {

  let location = useLocation()
  let navigate = useNavigate()
  
  // store user image
  const [image, setImage] = useState(null)
  const [imageID, setImageID] = useState(null)

  let title = useRef("title")
  let price = useRef("price")
  let itemlocation = useRef("location")
  let size = useRef("size")
  let condition = useRef("condition")
  let description = useRef("description")
  let author = useRef("author")
  let notes = useRef("notes")

  // make api post request with form data
  let handleSubmit = (e) => {
    e.preventDefault()


    // makes an empty object called formdata, appends image and the correct preset
    const formData = new FormData()
    formData.append("file", image)
    formData.append("upload_preset", "intsirma")

    // post request to send image
    axios.post("https://api.cloudinary.com/v1_1/dnzwb1afa/image/upload", formData)
      .then((res) => {
        console.log("image id: " + res.data.public_id)
        axios.post("http://127.0.0.1:8000/posts/", {
          "title": title.current.value,
          "author": author.current.value,
          "description": description.current.value,
          "price": price.current.value,
          "location": itemlocation.current.value,
          "condition": condition.current.value,
          "size": size.current.value,
          "notes": res.data.public_id,
          "listingtype": location.state.listingtype
        }).then(
          (res) => console.log(res)
        )
          .catch(
          (err) => console.log(err)
        )
      })
    // navigate("/")
  }

  // home button sends user back to homepage
  let handleHome = (e) => {
    e.preventDefault()
    navigate("/")
  }

  // // uploads image 
  // let uploadImage = () => {
  //   // makes an empty object called formdata, appends image and the correct preset
  //   const formData = new FormData()
  //   formData.append("file", image)
  //   formData.append("upload_preset", "intsirma")

  //   // post request to send image
  //   axios.post("https://api.cloudinary.com/v1_1/dnzwb1afa/image/upload", formData)
  //     .then((res) => {
  //       console.log(res.data.public_id)
  //       setImageID(res.data.public_id)
  //     })
  // }

  console.log(location.state)
  console.log(imageID)

  return (
    <div className="submit-container">
      <div className="submit-header">
        <button className="home-button" onClick={handleHome}>CL</button>
        <div>craigslit &gt; post &gt; { location.state.listingtype }</div>
      </div>
      <form className="form-container">
        <div className="top-row">
          <div>
              <input type="text" placeholder="title" ref={title} className="input" id="title" autocomplete="off" required/>
              <input type="text" placeholder="author" ref={author} className="input" autocomplete="off"/>
          </div>
          <div>
            <span>$ <input type="text" placeholder="price" ref={price} className="input" id="price" autocomplete="off"/></span>
            <input type="text" placeholder="location" ref={itemlocation} className="input" autocomplete="off"/>
          </div>
        </div>
        <textarea ref={description} className="description" placeholder="description"/>
        <div className="detail-container">
          <div className="bottom-row">
            <div>
              <input type="text" placeholder="condition" ref={condition} className="input" id="condition" autocomplete="off"/>
              <input type="text" placeholder="size/dimensions" ref={size} className="input" id="size" autocomplete="off"/>
              {/* <input type="text" placeholder="other notes" ref={notes} className="input" id="notes" autocomplete="off"/> */}
            </div>
            <button className="submit-button" onClick={handleSubmit}>submit listing</button>
          </div>
        </div>
      </form>
      <input type="file" onChange={(e)=> setImage(e.target.files[0])} />
          {/* <button onClick={uploadImage}>submit image</button> */}
    </div>
  );
}