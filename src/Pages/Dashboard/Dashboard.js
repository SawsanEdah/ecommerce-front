import { Outlet } from "react-router-dom";
import './Dashboard.css'
import TopBar from '../../Components/Dashboard/TopBar';
import SideBar from '../../Components/Dashboard/SideBar';



export default function Dashboard() {
  return (<div className="position-releative  ">
  <TopBar/>
  <div className="dashboard d-flex">
    <SideBar/>
  <Outlet /> 
  </div>
  </div>)
}
