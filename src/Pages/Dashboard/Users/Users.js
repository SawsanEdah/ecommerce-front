import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Axios } from "../../../Api/Axios";
import { USER, USERS } from "../../../Api/Api";
import TableShow from "../../../Components/Dashboard/Table";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);

  //header

  const header = [
    { key: "name", name: "Username" },
    { key: "email", name: "Email" },
    { key: "created_at", name: "Created" },
    { key: "updated_at", name: "Last login" },
    { key: "role", name: "Role" },
  ];

  // Get current user
  useEffect(() => {
    setLoading(true);
    Axios.get(`${USER}`).then((data) => setCurrentUser(data.data));
  }, []);

  // Get all users
  useEffect(() => {
    setLoading(true);
    try {
      Axios.get(`${USERS}?limit=${limit}&page=${page}`)
        .then((data) => {
          setUsers(data.data.data);
          setTotal(data.data.total);
        })
        .finally(() => setLoading(false));
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }, [limit, page]);

  // Handle delete

  async function handleDelete(id) {
    try {
      await Axios.delete(`${USER}/${id}`);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="bg-white w-100 py-3 px-4 rounded shadow-sm">
      <div className="d-flex justify-content-between align-items-center">
        <h1>Users Page</h1>
        <Link className="btn btn-primary" to="/dashboard/user/add">
          Add User
        </Link>
      </div>
      <TableShow
        total={total}
        loading={loading}
        limit={limit}
        setLimit={setLimit}
        page={page}
        setPage={setPage}
        header={header}
        data={users}
        delete={handleDelete}
        currentUser={currentUser}
         search="name"
         searchLink={USER}
      />
    </div>
  );
}

