import React, { useState, useEffect } from "react";

function JobPost() {
  const getDatafromLS = () => {
    const data = localStorage.getItem("jobs");
    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  };

  const [job, setJob] = useState(getDatafromLS());
  console.log(job);

  const [newjob, setNewJob] = useState({});

  const [role, setRole] = useState("");
  const [skill, setSkill] = useState("");
  const [experience, setExperience] = useState("");
  const [status, setStatus] = useState("");

  const JobSubmitHandler = (e) => {
    e.preventDefault();
    // creating an object
    let jobs = {
      role,
      skill,
      experience,
      status,
    };
    setJob([...job, jobs]);
    setRole("");
    setSkill("");
    setExperience("");
    setStatus("");
    localStorage.setItem("jobs", JSON.stringify(job));
  };

  return (
    <>
      <div className="head-title">
        <div className="left">
          <h1>POST JOB</h1>
          <ul className="breadcrumb">
            <li>
              <a href="/">POST</a>
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
      <div id="dlautomatic" className="mb-3 w-50 mt-2">
        <form onSubmit={JobSubmitHandler} action="/">
          <div className="row">
            <div className="col-md-12">
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Role
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  name="role"
                  onChange={(e) => setRole(e.target.value)}
                  value={role}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Skills
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  name="skill"
                  onChange={(e) => setSkill(e.target.value)}
                  value={skill}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Experience
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  name="experience"
                  onChange={(e) => setExperience(e.target.value)}
                  value={experience}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Status
                </label>
                <select
                  className="form-control"
                  name="status"
                  onChange={(e) => setStatus(e.target.value)}
                  value={status}
                  required
                >
                  <option>Select Status </option>
                  <option value="New">New</option>
                  <option value="Processing">Processing</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default JobPost;
