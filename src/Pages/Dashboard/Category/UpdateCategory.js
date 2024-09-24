import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../../Api/Axios";
import {category } from "../../../Api/Api";

import Loading from "../../Components/Loading/Loading";
import { useNavigate, useParams } from "react-router-dom";


export default function UpdateCategory() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // const id = window.location.pathname.split("/").slice(-1)[0];
  const {id}=useParams();
  console.log(id)
  //get current category
  useEffect(() => {
    setLoading(true)
    Axios.get(`${category}/${id}`).then((data) => {
      setTitle(data.data.title);
      setImage(data.data.image);
      setLoading(false)
    }).then(()=> setDisable(false))
    .catch(()=> navigate("/dashboard/categories/page/404" ,{replace:true}));
  }, []);

  // Handle Submit
  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    const form = new FormData();
    form.append("title", title);
    form.append("image", image);
    try {
      await Axios.post(`/${category}/edit/${id}`, form);
      window.location.pathname = "/dashboard/categories";
    }catch (err) {
        setLoading(false);
        console.log(err);
    }
  }
  return (
    <>
      {loading && <Loading />}
      <Form className="w-100 bg-white py-3 px-4 rounded shadow-sm" onSubmit={handleSubmit}>
        <Form.Label>Name </Form.Label>
        <Form.Group className="mb-3" controlId="name">
          <Form.Control
            name="title"
            type="text"
            placeholder="Enter image title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Label>Image </Form.Label>
        <Form.Group className="mb-3" controlId="image">
          <Form.Control
            name="image"
            type="file"
            placeholder="Enter image "
            onChange={(e) => setImage(e.target.files.item(0))}
            required
          />
        </Form.Group>

        <button disabled={disable} className="btn btn-primary">
          Save
        </button>
      </Form>
    </>
  );
}
