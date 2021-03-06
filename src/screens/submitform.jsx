// form for submitting a post
import { React, useRef, useState } from "react"
import ReactTooltip from "react-tooltip";
import "./submitform.css"
import { useNavigate, useLocation } from "react-router-dom"
import axios from "axios"

export default function SubmitForm(props) {

  let location = useLocation()
  let navigate = useNavigate()
  
  // store user image
  const [image, setImage] = useState(null)

  let title = useRef("title")
  let price = useRef("price")
  let itemlocation = useRef("location")
  let size = useRef("size")
  let condition = useRef("condition")
  let description = useRef("description")
  let author = useRef("author")

  const [titleMissing, setTitleMissing] = useState(null)
  const [priceMissing, setPriceMissing] = useState(null)
  const [locationMissing, setLocationMissing] = useState(null)
  const [conditionMissing, setConditionMissing] = useState(null)
  const [authorMissing, setAuthorMissing] = useState(null)
  const [sizeMissing, setSizeMissing] = useState(null)
  const [descriptionMissing, setDescriptionMissing] = useState(null)
  const [imageMissing, setImageMissing] = useState(null)

  // make api post request with form data
  let handleSubmit = (e) => {

    e.preventDefault()

    let incomplete = false

    // only submit api calls if all fields are complete
    if (title.current.value !== "") {
      setTitleMissing(false)
    }
    else {
      setTitleMissing(true)
      incomplete = true
    }

    if (price.current.value !== "") {
      setPriceMissing(false)
    }
    else {
      setPriceMissing(true)
      incomplete = true
    }

    if (itemlocation.current.value !== "") {
      setLocationMissing(false)
    }
    else {
      setLocationMissing(true)
      incomplete = true
    }

    if (size.current.value !== "") {
      setSizeMissing(false)
    }
    else {
      setSizeMissing(true)
      incomplete = true
    }

    if (condition.current.value !== "") {
      setConditionMissing(false)
    }
    else {
      setConditionMissing(true)
      incomplete = true
    }

    if (author.current.value !== "") {
      setAuthorMissing(false)
    }
    else {
      setAuthorMissing(true)
      incomplete = true
    }

    if (description.current.value !== "") {
      setDescriptionMissing(false)
    }
    else {
      setDescriptionMissing(true)
      incomplete = true
    }

    if (image !== null) {
      setImageMissing(false)
    }
    else {
      setImageMissing(true)
      incomplete = true
    }


    if (price.current.value.match("[0-9]+")) {
      setPriceMissing(false)
    }
    else {
      setPriceMissing(true)
      incomplete = true
    }

    if (incomplete) {
      return
    }

    // makes an empty object called formdata, appends image and the correct cloudinary preset
    const formData = new FormData()
    formData.append("file", image)
    formData.append("upload_preset", "intsirma")

    // post request to send image to cloudinary, then post request to send text
    axios.post("https://api.cloudinary.com/v1_1/dnzwb1afa/image/upload", formData)
      .then((res) => {
        console.log("image id: " + res.data.public_id)
        axios.post(`${process.env.REACT_APP_API_URL}/posts/`, {
          "title": title.current.value,
          "author": author.current.value,
          "description": description.current.value,
          "price": price.current.value,
          "location": itemlocation.current.value,
          "condition": condition.current.value,
          "size": size.current.value,
          "imageid": res.data.public_id,
          "listingtype": location.state.listingtype
        }).then(
          (res) => {
            console.log(res)
            navigate("/listing/" + res.data.id)
          }
        )
          .catch(
          (err) => console.log(err)
        )
      })
  }

  // home button sends user back to homepage
  let handleHome = (e) => {
    e.preventDefault()
    navigate("/")
  }

  console.log(location.state)

  return (
    <div className="submit-container">
      <div className="submit-header">
        <button className="home-button" onClick={handleHome}>CL</button>
        <div>craigslit &gt; post &gt; { location.state.listingtype }</div>
      </div>
      <form className="form-container">
        <div className="top-row">
          <div>
              <input type="text" placeholder="title" ref={title} className={titleMissing ? "incomplete" : "input"} id="title" autoComplete="off" required/>
              <input type="text" placeholder="author" ref={author} className={authorMissing ? "incomplete" : "input"} autoComplete="off"/>
          </div>
          <div>
            <span data-tip='price must be a number' data-event='click focus'>
              $ <input type="text" placeholder="price" ref={price} className={priceMissing ? "incomplete" : "input"} id="price" autoComplete="off" />
              <ReactTooltip globalEventOff='click'/>
            </span>
            <input type="text" placeholder="location" ref={itemlocation} className={locationMissing ? "incomplete" : "input"} autoComplete="off"/>
          </div>
        </div>
        <textarea ref={description} className={descriptionMissing ? "description-incomplete" : "description"} placeholder="description"/>
        <div className="detail-container">
          <div className="bottom-row">
            <div>
              <input type="text" placeholder="condition" ref={condition} className={conditionMissing ? "incomplete" : "input"} id="condition" autoComplete="off"/>
              <input type="text" placeholder="size/dimensions" ref={size} className={sizeMissing ? "incomplete" : "input"} id="size" autoComplete="off"/>
              <span className="image-text">image: </span><input type="file" className={imageMissing ? "image-incomplete" : ""} onChange={(e) => setImage(e.target.files[0])} />
            </div>
            <button className="submit-button" onClick={handleSubmit}>submit listing</button>
          </div>
        </div>
      </form>
    </div>
  );
}