import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory, useLocation } from "react-router-dom";

import "../styles/addpost.css";
import Header from "../maincomponent/header";
import API from "../apiconfi";


function Addpost(props) {
  const [formData, setFormData] = useState({});
  const [editData, setEditData] = useState({});
  const [UpdatedTitle, setUpdatedTitle] = useState("");
  const [UpdatedBody, setUpdatedBody] = useState("");
  const [UpdatedId, setUpdatedId] = useState();

  const history = useHistory();
  const location = useLocation();

  const handleChange = (e, category) => {
    if (category == "addPost") {
      setFormData({...formData, [e.target.name] : e.target.value})
    } else if(category == "editPost") {
      setEditData({...editData, [e.target.name] : e.target.value})
    }
  }

  //**** Addpost */
  const sendPost = () => {
    if (Object.keys(formData).length < 5) {
      return toast.warn("please add both field");
    }

    axios
      .post(
        `${API}/addPost`,
        formData,
      )
      .then(() => {
        toast.success("Post saved Successfully...");
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log("editData -- ", editData);
  console.log("addData -- ", formData);

  //**** Update Post */

  useEffect(() => {
    if (location.state) {
      const post = location.state;
      setUpdatedId(post._id);
      delete post._id;
      delete post.createdAt;
      delete post.updatedAt;
      setEditData(post);
    }
  }, [location.state]);

  const UpdatePost = () => {
    axios
      .patch(
        `${API}/updatepost/${UpdatedId}`,
        editData
      )
      .then(() => {
        toast.success("Post Updated succssfully");
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Data not Found");
      });
  };

  return (
    <Fragment>
      <Header />
      {location.state ? (
        <div className="container px-5 py-24 mx-auto flex">
          <div
            style={{ padding: "0px auto" }}
            className="bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10"
          >
            <h1 className="text-gray-900 text-lg mb-1 font-medium title-font">
              Update Post
            </h1>
            <br />
            <h3>Place Name</h3>
            <input
              type="text"
              value={editData?.place_name}
              name="place_name"
              onChange={(e) => handleChange(e, "editPost")}
              className="bg-white rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 mb-4"
              placeholder="Enter Title"
            />
            <h3>Country</h3>
            <input
              type="text"
              value={editData?.country}
              name="country"
              onChange={(e) => handleChange(e, "editPost")}
              className="bg-white rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 mb-4"
              placeholder="Enter Body"
            />
            <h3>City</h3>
            <input
              type="text"
              value={editData?.city}
              name="city"
              onChange={(e) => handleChange(e, "editPost")}
              className="bg-white rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 mb-4"
              placeholder="Enter Body"
            />
            <h3>Weather</h3>
            <input
              type="text"
              value={editData?.weather}
              name="weather"
              onChange={(e) => handleChange(e, "editPost")}
              className="bg-white rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 mb-4"
              placeholder="Enter Body"
            />
            <h3>Radius</h3>
            <input
              type="text"
              value={editData?.radius}
              name="radius"
              onChange={(e) => handleChange(e, "editPost")}
              className="bg-white rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 mb-4"
              placeholder="Enter Body"
            />
            <button
              onClick={UpdatePost}
              className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              Update Post
            </button>
          </div>
        </div>
      ) : (
        <div className="container px-5 py-24 mx-auto flex">
          <div
            style={{ maxWidth: "60%", padding: "0px auto" }}
            className="bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10"
          >
            <h1 className="text-gray-900 text-lg mb-1 font-medium title-font">
              Add Post
            </h1>
            <br />
            <h3>Place Name</h3>
            <input
              type="text"
              value={formData.place_name}
              name="place_name"
              onChange={(e) => handleChange(e, "addPost")}
              className="bg-white rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 mb-4"
              placeholder="Enter Place Name"
            />
            <h3>Country</h3>
            <input
              type="text"
              value={formData.country}
              name="country"
              onChange={(e) => handleChange(e, "addPost")}
              className="bg-white rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 mb-4"
              placeholder="Enter Country"
            />
            <h3>City</h3>
            <input
              type="text"
              value={formData.city}
              name="city"
              onChange={(e) => handleChange(e, "addPost")}
              className="bg-white rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 mb-4"
              placeholder="Enter City"
            />
            <h3>Weather</h3>
            <input
              type="text"
              value={formData.weather}
              name="weather"
              onChange={(e) => handleChange(e, "addPost")}
              className="bg-white rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 mb-4"
              placeholder="Enter Weather"
            />
            <h3>Radius</h3>
            <input
              type="number"
              value={formData.radius}
              name="radius"
              onChange={(e) => handleChange(e, "addPost")}
              className="bg-white rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 mb-4"
              placeholder="Enter Radius"
            />
            <button
              onClick={sendPost}
              className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              AddPost
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default Addpost;
