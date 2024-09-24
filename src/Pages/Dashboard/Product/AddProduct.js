import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Axios } from "../../../Api/Axios";
import { Cat, Pro } from "../../../Api/Api";

import Loading from "../../Components/Loading/Loading";

export default function AddProduct() {
  const [form, setForm] = useState({
    category: "",
    title: "",
    description: "",
    price: "",
    discount: "",
    About: "",
  });
  const dummyForm = {
    category: null,
    title: "dummy",
    description: "dummy",
    price: "654",
    discount: "5",
    About: "about",
  };
  const [categories, setCategories] = useState([]);

  const [images, setImages] = useState([]); console.log(images)
  const [sent, setSent] = useState(false);
  
  const [id, setId] = useState();
  const [loading, setLoading] = useState(false);

  //useRef
  const focus = useRef("");
  const openImage = useRef(null);
  const progress = useRef([]);
 const ids=useRef([]);console.log(ids.current)
  //handleOpenImage
  function handleOpenImage() {
    openImage.current.click();
  }
  //Handle focuse
  useEffect(() => {
    focus.current.focus();
  }, []);
  // Get Categories
  useEffect(() => {
    Axios.get(`/${Cat}`).then((data) => setCategories(data.data));
  }, []);
  // Handle Edit
  async function handleEdit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      await Axios.post(`/${Pro}/edit/${id}`, form);
      window.location.pathname = "/dashboard/products";
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  //Handle submit form

  async function handleSubmitForm() {
    try {
      const res = await Axios.post(`${Pro}/add`, dummyForm);
      setId(res.data.id);
    } catch (err) {
      console.log(err);
    }
  }

  // handle change
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSent(true);
    if (!sent) {
      handleSubmitForm();
    }
  }
  //handle images change
  const j=useRef(-1);
  async function handleImageChange(e){
    setImages(prev => [...prev,...e.target.files]);
   
    const imagesAsFiles=e.target.files;
    const data=new FormData();
    for (let i = 0; i < imagesAsFiles.length; i++) {
      j.current++;
     data.append('image',imagesAsFiles[i]);
     data.append('product_id',id);
     try{
      const res= await Axios.post("/product-img/add",data,{
       
        onUploadProgress : (ProgressEvent)=>{
          const {loaded,total}=ProgressEvent;
          const percent=Math.floor((loaded*100)/total);
          if(percent % 10 === 0){
            progress.current[j.current].style.width=`${percent}%`;
            progress.current[j.current].setAttribute('percent',`${percent}%`);
          }
        }
      })
      ids.current[j.current]=res.data.id}
     catch(err){console.log(err)}
      
    }
  }

    //Mapping
    const categoriesShow = categories.map((category, key) => (
      <option key={key} value={category.id}>
        {category.title}
      </option>
    ));
    
     const imagesShow=images.map((img,key)=>  (
      <div className="border  p-2 w-100">
        <div className="d-flex justify-content-between align-items-center">
        <div
          key={key}
          className="d-flex justify-content-start align-items-center gap-4"
        >
          <img src={URL.createObjectURL(img)} alt="ddd" width="80px" />
          <div>
            <p>{img.name}</p>
            <p>
              {img.size/1024 < 900 ? (img.size/1024).toFixed(2) + "KB" : (img.size/1024*1024).toFixed(2) + "MB"}
            </p>
          </div>
          </div>
          <Button variant="danger" onClick={()=>handleImageDelete(key,img)}>delete</Button>
        </div>
        <div className="custom-progress mt-3">
          <span
          ref={e => progress.current[key] = e}
          
            className="inner-progress"
          ></span>
        </div>
      </div>
    ));

    //delete image
    async function handleImageDelete(key,img){
     const findId=ids.current[key]; 
     try{
      const res=await Axios.delete(`product-img/${findId}`);
      setImages(prev => prev.filter((image) => image!==img));
      ids.current=ids.current.filter(i => i!==findId)
      --j.current;
     }
     catch(err){console.log(err)}
    }
    return (
      <>
        {loading && <Loading />}
        <Form className="w-100 bg-white py-3 px-4 rounded shadow-sm" onSubmit={handleEdit}>
          <Form.Label>Category </Form.Label>
          <Form.Group className="mb-3" controlId="category">
            <Form.Select
              ref={focus}
              name="category"
              type="text"
              value={form.category}
              onChange={handleChange}
              required
            >
              <option disabled value="">
                select category
              </option>
              {categoriesShow}
            </Form.Select>
          </Form.Group>
          <Form.Label>Title </Form.Label>
          <Form.Group className="mb-3" controlId="title">
            <Form.Control
              name="title"
              type="text"
              placeholder="title"
              value={form.title}
              onChange={handleChange}
              disabled={!sent}
            />
          </Form.Group>
          <Form.Label>Description </Form.Label>
          <Form.Group className="mb-3" controlId="description">
            <Form.Control
              name="description"
              type="text"
              placeholder="description"
              value={form.description}
              onChange={handleChange}
              disabled={!sent}
            />
          </Form.Group>
          <Form.Label>Price </Form.Label>
          <Form.Group className="mb-3" controlId="price">
            <Form.Control
              name="price"
              type="text"
              placeholder="price"
              value={form.price}
              onChange={handleChange}
              disabled={!sent}
            />
          </Form.Group>

          <Form.Label>Discount </Form.Label>
          <Form.Group className="mb-3" controlId="discount">
            <Form.Control
              name="discount"
              type="text"
              placeholder="discount"
              value={form.discount}
              onChange={handleChange}
              disabled={!sent}
            />
          </Form.Group>
          <Form.Label>About </Form.Label>
          <Form.Group className="mb-3" controlId="About">
            <Form.Control
              name="About"
              type="text"
              placeholder="About "
              onChange={handleChange}
              disabled={!sent}
            />
          </Form.Group>
          <Form.Label>Images </Form.Label>
          <Form.Group className="mb-3" controlId="image">
            <Form.Control
              ref={openImage}
              name="image"
              type="file"
              hidden
              multiple
              onChange={handleImageChange}
              disabled={!sent}
            />
          </Form.Group>
          <div
            onClick={handleOpenImage}
            className="d-flex justify-content-center align-items-center py-3 rounded flex-column"
            style={{
              border: !sent ? "2px dashed gray" : "2px dashed skyblue",
              cursor: sent && "pointer",
            }}
          >
            <img
              src={require("../../../Assets/images/upload.jpg")}
              alt="upload"
              width="150px"
              style={{ filter: !sent && "grayscale(1)" }}
            />
            <p
              className="mb-0 fw-bold"
              style={{ color: !sent ? "gray" : "skyblue" }}
            >
              upload here
            </p>
          </div>
          <div className=" justify-content-start align-items-center gab-4 p-2">
            {imagesShow}
          </div>
          <button
            disabled={form.title.length > 1 ? false : true}
            className="btn btn-primary"
          >
            Add
          </button>
        </Form>
      </>
    );
  }

