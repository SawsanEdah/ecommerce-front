import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Bars.css";

import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Menu } from "../../Context/MenuContext";
import { WindowSize } from "../../Context/WindowContext";
import { Axios } from "../../Api/Axios";
import { USER } from "../../Api/Api";
import { Links } from "../Navlink";

export default function Sidebar() {
  const [user, setUser] = useState("");
  const menu = useContext(Menu);
  const isOpen = menu.isOpen;
  const windowContext = useContext(WindowSize);
  const windowSize = windowContext.windowSize;

  //Get user
  useEffect(() => {
    Axios.get(`${USER}`).then((res) => setUser(res.data));
  }, []);

  return (
    <>
      <div
        style={{
          position: "fixed",
           top:  "70px",
          left: "0",
          width: "100%",
          height: "100vh",
          backgroundColor: "rgb(0,0,0,0.2)",
          display: windowSize < "768" && isOpen ? "block" : "none",
        }}
      ></div>
      <div
        className="side-bar bg-white py-2 rounded shadow-sm"
        style={{
          width: isOpen ? "220px" : "70px",
          left: windowSize < "768" ? (isOpen ? "0" : "-100%") : "0",
          
          position:"sticky"
        }}
      >
        {Links.map((link, key) => (link.role.includes(user.role) &&
          <NavLink
            key={key}
            to={link.path}
            className="d-flex align-items-center side-bar-link gap-2"
          >
            <FontAwesomeIcon icon={link.icon} />
            <p className="m-0" style={{ display: isOpen ? "block" : "none" }}>
              {link.name}
            </p>
          </NavLink>
        ))}
      </div>
    </>
  );
}
