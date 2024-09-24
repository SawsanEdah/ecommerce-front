import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../../Api/Axios";
import { category } from "../../../Api/Api";

import Loading from "../../Components/Loading/Loading";

export default function AddCategory() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  
  const [loading, setLoading] = useState(false);
  //useRef
  const focus=useRef("");
  //Handle focuse
  useEffect(()=>{
    focus.current.focus();
  },[])

  // Handle Submit
  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    const form=new FormData();
    form.append('title',title);
    form.append('image',image);
    try {
      await Axios.post(`/${category}/add`, form);
      window.location.pathname="/dashboard/categories"
    } catch (err) {
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
          ref={focus}
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
          
            onChange={(e)=> setImage(e.target.files.item(0))}
            required
          />
        </Form.Group>
        
        <button
          disabled={
            title.length > 1 
              ? false
              : true
          }
          className="btn btn-primary"
        >
          Add
        </button>
      </Form>
    </>
  );
}
