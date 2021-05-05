import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "react-js-pagination";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import API from "../apiconfi";
import style from "../styles/home.module.css";
import Header from "../maincomponent/header";
import styles from "../styles/home.module.css";
import DeleteIcon from "../Static/DeleteIcon.png";

function Home() {
  const [posts, setPosts] = useState([]);
  const [getPost, setgetPost] = useState(true);
  const history = useHistory();
  const [activePage, setactivePage] = useState(1);
  const [total, settotal] = useState();
  const [searchString, setSearchString] = useState("");

  // Fetch all Post
  useEffect(() => {
    getRecords(activePage);
  }, []);

  const getRecords = (pageNumber) => {
    axios
      .get(`${API}/allpost?page=${pageNumber}`)
      .then((data) => {
        setactivePage(pageNumber);
        setPosts(data.data.data);
        settotal(data.data.doc);
        setgetPost(false);
      })
      .catch((err) => {
        toast.error("Post not found");
      });
  };

  // Update Post
  const UpdatePost = (Title, Body, Id) => {
    history.push({ pathname: "/addpost", state: { Title, Body, Id } });
  };

  const handlechangespage = (pageNumber) => {
    getRecords(pageNumber);
    getRecords(1);
    // console.log(pageNumber);
  };

  const handleSearch = (e, sorting) => {
    e.preventDefault();
    let URL;
    if(sorting !== undefined) {
      URL = `${API}/searchPost?search=${searchString}&page=${activePage}&sort=${sorting}`
    } else {
      URL = `${API}/searchPost?search=${searchString}&page=${activePage}`
    }
    axios
      .get(URL)
      .then((data) => {
        setactivePage(activePage);
        setPosts(data.data.data);
        settotal(data.data.doc);
        setgetPost(false);
      })
      .catch((err) => {
        toast.error("Post not found");
      });
  };

  const handleDelete = (deleteId) => {
    axios
      .delete(`${API}/deletepost/${deleteId}`)
      .then((data) => {
        toast.success("Post delete successfully");
        getRecords(1);
      })
      .catch((error) => {
        toast.error("There was some internal error");
      });
  };

  if (getPost) {
    return (
      <>
        <h1 style={{ color: "red", fontSize: "30px" }}>Loading...</h1>
      </>
    );
  }
  return (
    <>
      <Header />
      <div>
        <nav aria-label="Page navigation example" className={style.nav}>
          <div className={style.filterDiv}>
            <ul>
              <Pagination
                activePage={activePage}
                itemsCountPerPage={9}
                totalItemsCount={total}
                onChange={handlechangespage}
                itemClass="page-item"
                linkClass="page-link"
                activeLinkClass="page-link"
                activeClass="active"
              />
            </ul>
            <div>
              <div class="form-group">
                <select class="form-control" onChange={(e) => handleSearch(e, e.target.value)} id="exampleFormControlSelect1">
                  <option>Select Sort</option>
                  <option value="country">Country</option>
                  <option value="city">City</option>
                  <option value="weather">Weather</option>
                </select>
              </div>
            </div>
            <form
              class={`form-inline ${style.searchForm}`}
              onSubmit={(e) => handleSearch(e)}
            >
              <input
                class="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchString}
                onChange={(e) => setSearchString(e.target.value)}
              />
              <button
                class="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
        </nav>

        <div className="container" className={style.maindiv}>
          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Place Name</th>
                <th scope="col">Country</th>
                <th scope="col">City</th>
                <th scope="col">Weather</th>
                <th scope="col">Radius</th>
                <th scope="col">Create Date</th>
                <th scope="col">Update Date</th>
                <th scope="col" colSpan="2">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {console.log("Posts", posts)}
              {posts.map((post, index) => {
                return (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{post.place_name}</td>
                    <td>{post.country}</td>
                    <td>{post.city}</td>
                    <td>{post.weather}</td>
                    <td>{post.radius}</td>
                    <td>{post.createdAt}</td>
                    <td>{post.updatedAt}</td>
                    <td>
                      <img
                        src={DeleteIcon}
                        onClick={() => handleDelete(post._id)}
                        className={styles.DeleteIcon}
                      ></img>
                    </td>
                    {/* <td>{DeleteIcon}</td> */}
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* {posts.map((post, index) => {
            return (
              <div className={styles.scard} key={index}>
                <div className={styles.body}>
                  <h3 className={styles.indexs}>Post :- {index + 1}</h3>
                  <h3>
                    <span>Posted By :-</span> {post.Postedby.Username}
                  </h3>
                  <h1 className={styles.title}>
                    <span>Title :-</span> {post.Title}
                  </h1>
                  <p className={styles.text}>
                    <span>Body :-</span> {post.Body}
                  </p>
                  <p className={styles.text}>
                    <span>Created At :-</span> {post.createdAt}
                  </p>
                  <p className={styles.text}>
                    <span>Updated At :-</span> {post.updatedAt}
                  </p>
                  {post.Postedby.Username ===
                  localStorage.getItem("Username") ? (
                    <>
                      <br />
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => deletePost(post._id)}
                      >
                        Delete Post
                      </button>
                      &nbsp;
                      <button
                        onClick={() =>
                          UpdatePost(post.Title, post.Body, post._id)
                        }
                        type="button"
                        className="btn btn-outline-primary"
                      >
                        Update Post
                      </button>{" "}
                    </>
                  ) : null}
                </div>
              </div>
            );
          })} */}
        </div>
      </div>
    </>
  );
}

export default Home;
