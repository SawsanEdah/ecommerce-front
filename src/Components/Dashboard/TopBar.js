import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu } from "../../Context/MenuContext";
import { useContext, useEffect, useState } from "react";
import { Axios } from "../../Api/Axios";
import { LOGOUT, USER } from "../../Api/Api";
import { DropdownButton, DropdownItem } from "react-bootstrap";
import Cookie from 'cookie-universal'

export default function Topbar() {
  const[name,setName]=useState("");
  const menu=useContext(Menu)
  const setIsOpen=menu.setIsOpen

  const cookie=Cookie();
 

  useEffect(() => {
    Axios.get(`${USER}`)
      .then((info) => setName(info.data.name))
      
  }, []);

  async function handleLogOut() {

    try {
      const res = await Axios.get(`/${LOGOUT}`);
      cookie.remove('ecommerce');
     window.location.pathname="/login"
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="top-bar bg-white  py-3 px-4 rounded shadow-sm ">
    <div className="d-flex g-4 align-items-center h-100">
      <div className="d-flex align-items-center justify-content-start gap-4">
      <h3 className="fw-bold">Sun-Silk</h3>
      
      </div>
      <div className="d-flex align-items-center justify-content-start gap-4 ms-4" >
        <DropdownButton  id="dropdown-basic-buttom"  title={name}>
          <DropdownItem onClick={handleLogOut}>Log Out</DropdownItem>
        </DropdownButton>
        <FontAwesomeIcon onClick={()=>setIsOpen(prev => !prev)} cursor={'pointer'} icon={faBars} />
      </div>
    </div>
    </div>
  );
}
