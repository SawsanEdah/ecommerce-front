import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Axios } from "../../../Api/Axios";

import { Cat, category } from "../../../Api/Api";
import TableShow from "../../../Components/Dashboard/Table";


export default function Categories() {
  // States
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(4);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  
  // Get Categories
  useEffect(() => {
    setLoading(true);
    Axios.get(`/${Cat}?limit=${limit}&page=${page}`)
      .then((data) => {
        setCategories(data.data.data);
        setTotal(data.data.total);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [limit, page]);

  

  //header
  const header = [
    { key: "title", name: "Title" },
    { key: "image", name: "Image" },
    { key: "created_at", name: "Created" },
    { key: "updated_at", name: "Updated" },
  ];

  // Handle Delete
  async function handleDelete(id) {
    try {
      await Axios.delete(`${category}/${id}`);
      setCategories((Prev) => Prev.filter((category) => category.id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="w-100 bg-white py-3 px-4 rounded shadow-sm">
      <div className="d-flex justify-content-between align-items-center">
        <h1>Categories Page</h1>
        <Link className="btn btn-primary" to="/dashboard/category/add">
          Add Category
        </Link>
      </div>
      
      <TableShow
        total={total}
        loading={loading}
        setPage={setPage}
        page={page}
        limit={limit}
        setLimit={setLimit}
        header={header}
        data={categories}
        delete={handleDelete}
        search="title"
        searchLink={category}
       
      />
    </div>
  );
}
