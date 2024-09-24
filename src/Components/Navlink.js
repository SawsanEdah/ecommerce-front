import { faPlus, faUsers, faCartShopping, faTruckFast } from "@fortawesome/free-solid-svg-icons";
export const Links = [
  { path: "users", icon: faUsers, name: "Users", role: ["1995"] },
  {
    path: "/dashboard/user/add",
    icon: faPlus,
    name: " Add User",
    role: ["1995"],
  },
  {
    path: "/dashboard/categories",
    icon: faCartShopping,
    name: " Categories",
    role: ["1999","1995"],
  },
  {
    path: "/dashboard/category/add",
    icon: faPlus,
    name: " Add Category",
    role: ["1999","1995"],
  },
  {
    path: "/dashboard/products",
    icon: faTruckFast,
    name: " Products",
    role: ["1999","1995"],
  },
  {
    path: "/dashboard/product/add",
    icon: faPlus,
    name: " Add Product",
    role: ["1999","1995"],
  },

  {
    path: "/dashboard/writer",
    icon: faPlus,
    name: "Writer",
    role: ["1995", "1996"],
  },
];
