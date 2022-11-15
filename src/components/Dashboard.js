import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import "../components/dashboard/style.css";
import JobPost from "./JobPost";
import AllUsers from "./AllUsers";

const getDatafromLS = () => {
  const data = localStorage.getItem("jobs");
  if (data) {
    return JSON.parse(data);
  }
};

function Dashboard() {
  let { user } = useContext(AuthContext);
  console.log(user);

  const [isActive, setIsActive] = useState(false);

  const bxMenu = () => {
    setIsActive(!isActive);
  };

  const [darkMode, setDarkMode] = useState(false);

  const bxTheame = () => {
    setDarkMode(!darkMode);
  };

  const opensideView = (evt) => {
    var sideview = evt.currentTarget.getAttribute("data-id");
    var a, b, c;
    c = document.getElementsByClassName("sideView");
    for (a = 0; a < c.length; a++) {
      c[a].style.display = "none";
    }
    b = document.getElementsByClassName("anchor-links");
    for (a = 0; a < b.length; a++) {
      b[a].className = b[a].className.replace(" active", "");
    }
    document.getElementById(sideview).style.display = "block";
    evt.currentTarget.className += " active";
  };

  const [job, setJob] = useState(
    localStorage.getItem("jobs") ? getDatafromLS() : null
  );

  console.log(job);

  const [editForm, setEditForm] = useState(false);

  const [updateJob, setJobUpdate] = useState("");

  const [id, setId] = useState();

  const [selctdJobId, setSelctdJobId] = useState("");

  const [selctdJob, setSelctdJob] = useState([]);

  console.log(selctdJob);

  const updateChangeHandle = (e) => {
    setSelctdJob({ ...selctdJob, [e.target.name]: e.target.value });
  };

  const updateSubmitHandle = (e) => {
    e.preventDefault();
    job[selctdJobId] = selctdJob;
    console.log(job);
    localStorage.setItem("jobs", JSON.stringify(job));
    window.location.href = "/";
  };

  const selectedJob = (index) => {
    setSelctdJobId(index);
    setSelctdJob(job[index]);
  };

  const handleEdit = (individualJob, index) => {
    setEditForm(true);
    selectedJob(index);
  };

  return (
    <div className={isActive ? "main-body " : "main-body"}>
      <div className={darkMode ? "main-body dark" : null}>
        {/* <!-- SIDEBAR --> */}
        <section id="sidebar" className={isActive ? "hide" : null}>
          <a href="/" className="brand">
            <img
              className="ms-3"
              src={require("./dashboard/img/id-card-icon.png")}
              height={30}
              width={30}
            ></img>
            {!isActive ? (
              <span className="text ms-2">My Job Portal</span>
            ) : null}
          </a>
          <ul className="side-menu top">
            <li
              onClick={opensideView}
              data-id="dashboard"
              className="anchor-links active"
            >
              <a href="/" style={{ pointerEvents: "none" }}>
                <i className="bx bxs-dashboard"></i>
                <span className="text">All Posted Jobs</span>
              </a>
            </li>
            <li
              onClick={opensideView}
              data-id="rcCard"
              className="anchor-links"
            >
              <a href="/" style={{ pointerEvents: "none" }}>
                <i className="bx bxs-id-card"></i>
                <span className="text">Post New Job</span>
              </a>
            </li>

            <li onClick={opensideView} data-id="pan" className="anchor-links">
              <a href="/" style={{ pointerEvents: "none" }}>
                <i className="bx bxs-credit-card-front"></i>
                <span className="text">Search Resumes</span>
              </a>
            </li>
          </ul>
          <ul className="side-menu">
            <li>
              <a href="/logout" className="logout">
                <i className="bx bxs-log-out-circle"></i>
                <span className="text">Logout</span>
              </a>
            </li>
          </ul>
        </section>
        {/* <!-- SIDEBAR --> */}

        {/* <!-- CONTENT --> */}
        <section id="content">
          {/* <!-- NAVBAR --> */}
          <nav>
            <i onClick={bxMenu} className="bx bx-menu"></i>
            <a href="/" className="nav-link">
              HR/Recruitment Admin Dashboard
            </a>
            <form action="/">
              <div className="form-input align-content-center justify-content-end">
                <h5 className="header-name">Welcome {user.full_name}</h5>
              </div>
            </form>
            <input type="checkbox" id="switch-mode" hidden />
            <label
              htmlFor="switch-mode"
              className="switch-mode"
              onClick={bxTheame}
            ></label>
            <a href="/" className="notification">
              <i className="bx bxs-bell"></i>
              <span className="num">8</span>
            </a>
            <a href="/" className="profile">
              <img src={require("./dashboard/img/people.png")} alt="img" />
            </a>
          </nav>
          {/* <!-- NAVBAR --> */}

          {/* <!-- MAIN --> */}
          <main
            className="sideView"
            id="dashboard"
            style={{ display: "block" }}
          >
            <div className="head-title">
              <div className="left">
                <h1>View All Posted Jobs</h1>
                <ul className="breadcrumb">
                  <li>
                    <a href="/">Dashboard</a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>
                  </li>
                  <li>
                    <a className="active" href="/">
                      Home
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="table-data d-block">
              <div className="row">
                <div className="col-md-12">
                  <div className="order">
                    <div className="head">
                      <h3>Recent Job Postings</h3>
                      <i className="bx bx-search"></i>
                      <i className="bx bx-filter"></i>
                    </div>
                    <div className="scrollable-content">
                      <table className="w-100">
                        {editForm === false && (
                          <>
                            <thead>
                              <tr>
                                <th>Job</th>
                                <th>Skills</th>
                                <th>Experience</th>
                                <th>Status</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {job
                                ? job.map((individualJob, index) => (
                                    <tr>
                                      <td>
                                        <p>{individualJob.role}</p>
                                      </td>
                                      <td>{individualJob.skill}</td>
                                      <td>{individualJob.experience}</td>
                                      <td>
                                        <span className="status pending">
                                          {individualJob.status}
                                        </span>
                                      </td>
                                      <td className="d-flex">
                                        <div
                                          style={{
                                            marginRight: 7 + "px",
                                            cursor: "pointer",
                                          }}
                                          onClick={() =>
                                            handleEdit(individualJob, index)
                                          }
                                        >
                                          Update
                                        </div>
                                        {/* ||
                                        <div
                                          style={{
                                            marginRight: 7 + "px",
                                            cursor: "pointer",
                                          }}
                                          // onClick={() =>
                                          //   handleEdit(individualTodo, index)
                                          // }
                                        >
                                          Delete
                                        </div> */}
                                      </td>
                                    </tr>
                                  ))
                                : null}
                            </tbody>
                          </>
                        )}
                      </table>
                      {/* edit form component */}
                      {editForm === true && (
                        <div id="dlautomatic" className="mb-3 w-50 mt-2">
                          <form onSubmit={updateSubmitHandle}>
                            <div className="row">
                              <div className="col-md-12">
                                <div className="mb-3">
                                  <label
                                    htmlFor="exampleInputEmail1"
                                    className="form-label"
                                  >
                                    Role
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    name="role"
                                    value={selctdJob.role}
                                    onChange={updateChangeHandle}
                                  />
                                </div>
                                <div className="mb-3">
                                  <label
                                    htmlFor="exampleInputEmail1"
                                    className="form-label"
                                  >
                                    Skills
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    name="skill"
                                    value={selctdJob.skill}
                                    onChange={updateChangeHandle}
                                  />
                                </div>
                                <div className="mb-3">
                                  <label
                                    htmlFor="exampleInputEmail1"
                                    className="form-label"
                                  >
                                    Experience
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    name="experience"
                                    value={selctdJob.experience}
                                    onChange={updateChangeHandle}
                                  />
                                </div>
                                <div className="mb-3">
                                  <label
                                    htmlFor="exampleInputEmail1"
                                    className="form-label"
                                  >
                                    Status
                                  </label>
                                  <select
                                    className="form-control"
                                    name="status"
                                    onChange={updateChangeHandle}
                                  >
                                    <option name="status">
                                      {selctdJob.status}
                                    </option>
                                    <option>New</option>
                                    <option>Processing</option>
                                    <option>Completed</option>
                                  </select>
                                </div>

                                <button
                                  type="submit"
                                  className="btn btn-primary"
                                >
                                  Submit
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      )}
                      {/* end of edit form component */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
          {/* <!-- MAIN --> */}

          <main className="sideView" id="rcCard">
            <JobPost />
          </main>

          <main className="sideView" id="pan">
            <AllUsers />
          </main>
        </section>
        {/* <!-- CONTENT --> */}
      </div>
    </div>
  );
}

export default Dashboard;
