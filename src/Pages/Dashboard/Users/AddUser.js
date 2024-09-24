import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../../Api/Axios";
import { USER } from "../../../Api/Api";
import { useNavigate } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";

export default function User() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // useRef
const focus=useRef(null);

//Handle focus
useEffect(()=>{
 focus.current.focus()
},[])
  // Handle Submit
  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();

    try {
      await Axios.post(`/${USER}/add`, {
        name: name,
        email: email,
        password: password,
        role: role,
      });
      navigate("/dashboard/users", { replace: true });
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
            name="name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Label>Email </Form.Label>
        <Form.Group className="mb-3" controlId="email">
          <Form.Control
            name="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Label>Password </Form.Label>
        <Form.Group className="mb-3" controlId="password">
          <Form.Control
            name="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Label>Role</Form.Label>
        <Form.Group className="mb-3" controlId="role">
          <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
            <option disabled value="">
              Select Role
            </option>
            <option value="1995">Admin</option>
            <option value="2001">User</option>
            <option value="1996">Writer</option>
            <option value="1999">Product Manger</option>
          </Form.Select>
        </Form.Group>
        <button
          disabled={
            name.length > 1 && email.length > 1 && password.length > 6 && role !==""
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
