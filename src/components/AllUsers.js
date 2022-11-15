import React, { useEffect, useState } from "react";

const userss = [
  {
    id: 1,
    name: "hari",
    mobile: "558585858",
    email: "hari@gmail.com",
    skill: "Python Developer",
    status: "Hired",
  },
  {
    id: 2,
    name: "jhon",
    mobile: "8871585544",
    email: "jhon@gmail.com",
    skill: "Java Developer",
    status: "Profile Viewed",
  },
  {
    id: 3,
    name: "jack",
    mobile: "74110003202",
    email: "jack@gmail.com",
    skill: "Python Fullstack Developer",
    status: "Interview Scheduled",
  },
];

const getDatafromLS = () => {
  const data = localStorage.getItem("users");
  if (data) {
    return JSON.parse(data);
  }
};

function AllUsers() {
  const [users, setUsers] = useState(
    localStorage.getItem("jobs") ? getDatafromLS() : userss
  );

  console.log(users);

  const [search, setSearch] = useState("");

  const [editForm, setEditForm] = useState(false);

  const [updateId, setUpdateId] = useState("");

  const [selecedStudent, setSelectedStudent] = useState([]);

  // console.log(selecedStudent);

  // console.log(updateId);

  const handleEdit = (id) => {
    console.log(users[users.id]);
    setEditForm(true);
    setUpdateId(id);
    setSelectedStudent(users[(users.id = id - 1)]);
  };

  const updateChangeHandle = (e) => {
    setSelectedStudent({ ...selecedStudent, [e.target.name]: e.target.value });
  };

  console.log(updateId);

  const updateSubmitHandle = (e) => {
    e.preventDefault();
    users[updateId - 1] = selecedStudent;
    console.log(users);
    localStorage.setItem("users", JSON.stringify(users));

    window.location.href = "/";
  };

  return (
    <>
      <div className="head-title">
        <div className="left">
          <h1>All Applicants</h1>
          <ul className="breadcrumb">
            <li>
              <a href="/">All Applicants</a>
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
              {editForm === false && (
                <div className="head">
                  <div className="form-input">
                    <input
                      type="search"
                      placeholder="Search..."
                      name="search"
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <button type="submit" className="search-btn btn-warning">
                      <i className="bx bx-search"></i>
                    </button>
                  </div>
                </div>
              )}
              <div className="scrollable-content">
                {editForm === false && (
                  <table>
                    <thead>
                      <tr>
                        <th>Full Name</th>
                        <th>Mobile Number</th>
                        <th>Email</th>
                        <th>Skill</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users
                        .filter(
                          (req) =>
                            req.skill
                              .toLowerCase()
                              .includes(search.toLowerCase()) ||
                            req.email
                              .toLowerCase()
                              .includes(search.toLowerCase())
                        )
                        .map((user) => (
                          <tr>
                            <td>
                              <img
                                src={require("./dashboard/img/people.png")}
                                alt="img"
                              />
                              <p>{user.name}</p>
                            </td>
                            <td>{user.mobile}</td>
                            <td>{user.email}</td>
                            <td>{user.skill}</td>
                            <td>{user.status}</td>
                            <td>
                              <div
                                style={{
                                  marginRight: 7 + "px",
                                  cursor: "pointer",
                                }}
                                onClick={() => handleEdit(user.id)}
                              >
                                Update
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                )}
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
                              Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputEmail1"
                              aria-describedby="emailHelp"
                              name="name"
                              value={selecedStudent.name}
                              onChange={updateChangeHandle}
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="exampleInputEmail1"
                              className="form-label"
                            >
                              Mobile
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputEmail1"
                              aria-describedby="emailHelp"
                              name="mobile"
                              value={selecedStudent.mobile}
                              onChange={updateChangeHandle}
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="exampleInputEmail1"
                              className="form-label"
                            >
                              Email
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputEmail1"
                              aria-describedby="emailHelp"
                              name="email"
                              value={selecedStudent.email}
                              onChange={updateChangeHandle}
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="exampleInputEmail1"
                              className="form-label"
                            >
                              Skill
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputEmail1"
                              aria-describedby="emailHelp"
                              name="skill"
                              value={selecedStudent.skill}
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
                                {selecedStudent.status}
                              </option>
                              <option value="Hired">Hired</option>
                              <option value="Profile Viewed">
                                Profile Viewed
                              </option>
                              <option value="Interview Scheduled">
                                Interview Scheduled
                              </option>
                            </select>
                          </div>

                          <button type="submit" className="btn btn-primary">
                            Submit
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllUsers;
