import { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Cat } from "../../../Api/Api";
import { Axios } from "../../../Api/Axios";
import "./Navbar.css";
import StringSlice from "../../../helper/StringSlice";

import SkeletonCom from "../skeleton/Skeleton";
import { CartContext } from "../../../Context/CartContext";

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(`${Cat}`)
      .then((res) => {
        setCategories(res.data.slice(-8));
      })
      .finally(setLoading(false));
  }, []);

  const categoriesShow = categories.map((category, index) => (
    <p key={index} className="mt-0 category-title">
      {StringSlice(category.title, 15)}
    </p>
  ));
  return (
    <nav className="py-3 navy " data-bs-theme="dark">
      <Container>
        <div className="d-flex justify-content-between align-items-center flex-wrap">
          <Link className="col-2" to="/">
            <img
              src={require("../../../Assets/images/sunsilklogo.png")}
              width="110px"
              alt=""
            />
          </Link>

          <div className="col-3 mx-5 d-flex jusity-content-end align-items-center  gap-4 order-md-3 order-1">
            <Link to="/cart" className="d-flex" title="cart">
              <img
                src={require("../../../Assets/images/cartshopping.png")}
                width="40px"
                alt=""
              />
              <div className="text-center text-white totaleItems">
                {" "}
                {cart.length}
              </div>
            </Link>
            <Link to="/login" title="login">
              <img
                src={require("../../../Assets/images/profile.png")}
                width="35px"
                alt=""
              />
            </Link>
          </div>
        </div>
      </Container>
      <div className=" mt-2 p-2 bg-dark text-white">
        <div className=" ms-5 d-flex justify-content-start align-items-center  gap-5 flex-wrap">
          {loading ? (
            <>
              <SkeletonCom height="30px" width="80px" length="8" />
            </>
          ) : (
            categoriesShow
          )}
          <Link className="text-white category-title mb-3" to="/categories">
            Show All
          </Link>
        </div>
      </div>
    </nav>
  );
}
