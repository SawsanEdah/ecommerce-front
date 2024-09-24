import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../../Api/Axios";
import { USER } from "../../../Api/Api";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";


export default function User() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  
const {id}=useParams()
console.log(id)
  // Disabled save button until getting user data
  useEffect(() => {
    setLoading(true)
    Axios.get(`${USER}/${id}`).then((data) => {
      setName(data.data.name);
      setEmail(data.data.email);
      setRole(data.data.role);
      setLoading(false)
    }).then(()=> setDisable(false))
    .catch(()=> navigate("/dashboard/users/page/404" ,{replace:true}));
    
  }, []);

  // Handle Submit
  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    try {
     await Axios.post(`${USER}/edit/${id}`, {
        name: name,
        email: email,
        role: role,
      });
      window.location.pathname="/dashboard/users";
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

        <Form.Label>Role</Form.Label>
        <Form.Group className="mb-3" controlId="role">
          <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
            <option disabled value="">
              Select Role
            </option>
            <option value="1995">admin</option>
            <option value="2001">user</option>
            <option value="1996">writer</option>
          </Form.Select>
        </Form.Group>
        <button disabled={disable} className="btn btn-primary">
          Save
        </button>
      </Form>
    </>
  );
}
