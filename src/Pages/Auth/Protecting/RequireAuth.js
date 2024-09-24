import { Outlet, useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
import { useEffect, useState } from "react";

import { USER } from "../../../Api/Api";
import Loading from "../../Components/Loading/Loading";
import { Axios } from "../../../Api/Axios";
import Err403 from "../Errors/403";

export default function RequireAuth({ allowedRole }) {
  // Get User
  const [user, setUser] = useState("");
  // console.log(user);
  //navigate
  const navigate = useNavigate();
  // Cookie & Token
  const cookie = Cookie();
  const token = cookie.get("ecommerce");

  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((info) => setUser(info.data))
      .catch(() => navigate("/login", { replace: true }));
  }, []);
  return token ? (
    user === "" ? (
      <Loading />
    ) : allowedRole.includes(user.role) ? (
      <Outlet />
    ) : (
      <Err403 role={user.role} />
    )
  ) : (
    navigate("/login", { replace: true })
  );
}
