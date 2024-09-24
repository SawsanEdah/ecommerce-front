import { Link } from "react-router-dom";
import "./403.css";

export default function Err403({ role }) {
  return (
    <div className="text-wrapper">
      <div className="title" data-content={404}>
        403 - ACCES DENIED
      </div>
      <div className="subtitle">
        Oops, You don't have premission to access this page.
      </div>

      <Link
        className="d-block text-center btn btn-primary"
        to={role === "1996" ? "/dashboard/writer" : "/"}
      >
        {role === "1996" ? "Go To The Writer Page" : "Go To The Home Page"}
      </Link>
    </div>
  );
}
