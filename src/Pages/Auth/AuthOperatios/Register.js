import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { baseURL, LW_GOOGLE, REGISTER } from "../../../Api/Api";
import Cookie from "cookie-universal";
import Loading from "../../Components/Loading/Loading";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

export default function Register() {
  //states
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  // useRef
const focus=useRef(null);

//Handle focus
useEffect(()=>{
 focus.current.focus()
},[])
  //cookie
  const cookie = Cookie();
  //navigate
 const navigate=useNavigate()
  //handleChange
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  //handleSubmit
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${baseURL}/${REGISTER}`, form);
      const token = res.data.token;
      cookie.set("ecommerce", token,{path:"/"});
      setLoading(true);
      navigate("/dashboard/users",{replace :true})
    } catch (err) {
      console.log(err);
      setLoading(false);
      if (err.response.status === 422) {
        setErr("The email has already been taken");
      } else {
        setErr("Internal server error");
      }
    }
  }
  return (
    <>
      {loading && <Loading />}
      <div className="container">
        <div className="row" style={{ height: "80vh" }}>
          <Form className="form" onSubmit={handleSubmit}>
            <div className="custom-form">
              <h1 className="mb-4">Register Now</h1>
              <Form.Group className="form-custom " controlId="name">
                <Form.Control
                ref={focus}
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <Form.Label>Email </Form.Label>
              </Form.Group>
              <Form.Group className="form-custom " controlId="email">
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                <Form.Label>Email </Form.Label>
              </Form.Group>

              <Form.Group className="form-custom" controlId="password">
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  minLength="6"
                />
                <Form.Label>Password </Form.Label>
              </Form.Group>
              <button className="btn btn-primary">Register</button>
              <div className="google-btn">
                <a href={`http://127.0.0.1:8000/${LW_GOOGLE}`}>
                  <div className="google-icon-wrapper">
                    <img
                      className="google-icon"
src={new URL(require("../../../Assets/images/googleicon.png")) } 
alt="sign in with google"
                    />
                  </div>
                  <p className="btn-text">
                    <b>Register with google</b>
                  </p>
                </a>
              </div>
              {err !== "" && <span className="error">{err}</span>}
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

