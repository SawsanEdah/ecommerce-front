import { Container } from "react-bootstrap";
import Landing from "../../../Components/website/landing/Landing";
import ShowLatestSaleProducts from "../../../Components/website/product/SaleProducts/ShowLatestSaleProducts";
import ShowTopRated from "../../../Components/website/product/TopRated/ShowTopRated";
import ShowLatestProducts from "../../../Components/website/product/LatestProducts/ShowLatestProducts";

import "./HomePage.css";
import BeforTopRated from "../../../Components/website/BeforTopRated/BeforTopRated";

export default function HomePage() {
  return (
    <div >
      <Landing />
      <ShowLatestSaleProducts />
      <BeforTopRated/>
      <Container>
        <div className="d-flex align-items-start flex-wrap mt-5 ">
          <ShowTopRated />
          <ShowLatestProducts />
        </div>
      </Container>
    </div>
  );
}
