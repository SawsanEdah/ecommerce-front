import Form from "react-bootstrap/Form";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { LOGIN, baseURL } from "../../../Api/Api";
import Loading from "../../Components/Loading/Loading";
import Cookie from "cookie-universal";
import { Link} from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({
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
 
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${baseURL}/${LOGIN}`, form);
      setLoading(false);
      const token = res.data.token;
      const role=res.data.user.role;
      
     const go= role === '1995'? "users" :'writer' ;
      cookie.set("ecommerce", token,{path:"/"});
    window.location.pathname=`/dashboard/${go}`;
    } catch (err) {
      setLoading(false);
      if (err.response.status === 401) {
        setErr("Wrong email or password");
      } else {
        setErr("Intrnal server error");
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
              <h1 className="mb-5">Log In</h1>
              <Form.Group className="form-custom " controlId="email">
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  ref={focus}
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
              <button className="btn btn-primary">Login</button>
              <div className="google-btn">
                <a href={`http://127.0.0.1:8000/login-google`}>
                  <div className="google-icon-wrapper">
                    <img
                      className="google-icon"
                   src={new URL(require("../../../Assets/images/googleicon.png")) }
                      width="80px" alt="sign in with google"
                    />
                  </div>
                  <p className="btn-text">
                    <b>sign in with google</b>
                  </p>
                </a>
              </div>
              {err !== "" && <span className="error">{err}</span>}
              <p className="mt-3 fw-bold">don't have an account! <Link to="/register" className="btn btn-primary">  sign up here</Link></p>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
