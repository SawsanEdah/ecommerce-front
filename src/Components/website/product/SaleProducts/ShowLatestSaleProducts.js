import { useEffect, useState } from "react";
import { Axios } from "../../../../Api/Axios";
import { LastestSale } from "../../../../Api/Api";

import { Container } from "react-bootstrap";

import SkeletonCom from "../../skeleton/Skeleton";
import SaleProducts from "./SaleProducts";

export default function ShowLatestSaleProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Axios.get(`${LastestSale}`)
      .then((res) => {
        setProducts(res.data);
        console.log(res.data);
      })
      .finally(setLoading(false));
  }, []);

  const productsShow = products.map((product, key) => (
    <SaleProducts
      product={product}
      key={key}
      title={product.title}
      description={product.description}
      discount={product.discount}
      img={product.images[0].image}
      price={product.price}
      sale
      rating={product.rating}
      col="3"
    />
  ));
  return (
    <Container>
      <h1 className="mt-5 fw-bold">Latest Sale Products</h1>
      <div className="d-flex align-items-stretch justify-content-center flex-wrap mt-5 row-gap-2 mb-5">
        {loading ? (
          <>
            <SkeletonCom
              baseColor="#0B5ED7"
              height="300px"
              length={products.length}
              classes="col-lg-3 col-md-6 col-12"
            />
          </>
        ) : (
          productsShow
        )}
      </div>
    </Container>
  );
}
