import "./App.css";
import { Routes, Route } from "react-router-dom";
import Register from "./Pages/Auth/AuthOperatios/Register";
import Login from "./Pages/Auth/AuthOperatios/Login";
import HomePage from "./Pages/Website/HomePage/HomePage";

import Users from "./Pages/Dashboard/Users/Users";
import GoogleCallBack from "./Pages/Auth/AuthOperatios/GoogleCallBack";
import Dashboard from "./Pages/Dashboard/Dashboard";
import RequireAuth from "./Pages/Auth/Protecting/RequireAuth";
import User from "./Pages/Dashboard/Users/User";
import AddUser from "./Pages/Dashboard/Users/AddUser";
import AddCategory from "./Pages/Dashboard/Category/AddCategory";
import Writer from "./Pages/Auth/Writer";
import Err404 from "./Pages/Auth/Errors/404";
import RequireBack from "./Pages/Auth/Protecting/RequireBack";
import Categories from "./Pages/Dashboard/Category/Categories";
import UpdateCategory from "./Pages/Dashboard/Category/UpdateCategory";
import Products from "./Pages/Dashboard/Product/Products";
import AddProduct from "./Pages/Dashboard/Product/AddProduct";
import UpdateProduct from "./Pages/Dashboard/Product/UpdateProduct";
import WebsiteCategories from "./Components/website/categories/Categories";
import Website from "./Components/website/Website";
import Cart from "./Components/website/cart/Cart";


function App() {
  
  return (
   
    <div className='app'>
      <Routes>
        {/*public routes */}
        <Route element={<Website />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/categories" element={<WebsiteCategories />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
        </Route>

        <Route element={<RequireBack />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/auth/google/callback" element={<GoogleCallBack />} />
        <Route path="/*" element={<Err404 />} />

        {/*protected Routes*/}
        <Route element={<RequireAuth allowedRole={["1995", "1996", "1999"]} />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route element={<RequireAuth allowedRole={["1995"]} />}>
              <Route path="users" element={<Users />} />
              <Route path="users/:id" element={<User />} />
              <Route path="user/add" element={<AddUser />} />
            </Route>

            <Route element={<RequireAuth allowedRole={["1995", "1999"]} />}>
              {/*Categories */}
              <Route path="categories" element={<Categories />} />
              <Route path="category/add" element={<AddCategory />} />
              <Route path="categories/:id" element={<UpdateCategory />} />
              {/*Products */}
              <Route path="products" element={<Products />} />
              <Route path="product/add" element={<AddProduct />} />
              <Route path="products/:id" element={<UpdateProduct />} />
            </Route>
            <Route element={<RequireAuth allowedRole={["1995", "1996"]} />}>
              <Route path="writer" element={<Writer />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
 );
}

export default App;
