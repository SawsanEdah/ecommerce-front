import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Axios } from "../../../Api/Axios";

import { PRO, Pro } from "../../../Api/Api";
import TableShow from "../../../Components/Dashboard/Table";

export default function Products() {
  // States
  const [products, setProducts] = useState([]);
  console.log(products);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  // Get products
  useEffect(() => {
    setLoading(true);
    Axios.get(`/${PRO}?limit=${limit}&page=${page}`)
      .then((data) => {
        setProducts(data.data.data);
        setTotal(data.data.total);
      })
      .finally(() => setLoading(false));
  }, [limit, page]);

  //header
  const header = [
    { key: "images", name: "images" },
    { key: "category", name: "Category" },
    { key: "title", name: "Title" },
    { key: "description", name: "Description" },
    { key: "price", name: "price" },
    { key: "discount", name: "Discount" },
    { key: "created_at", name: "Created" },
    { key: "updated_at", name: "Updated" },
    { key: "About", name: "About" },
  ];

  // Handle Delete
  async function handleDelete(id) {
    try {
      await Axios.delete(`${Pro}/${id}`);
      setProducts((Prev) => Prev.filter((product) => product.id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="w-100 bg-white py-3 px-4 rounded shadow-sm">
      <div className="d-flex justify-content-between align-items-center">
        <h1>Products Page</h1>
        <Link className="btn btn-primary" to="/dashboard/category/add">
          Add Product
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
        data={products}
        delete={handleDelete}
         search="title"
         searchLink={Pro}
      />
    </div>
  );
}
