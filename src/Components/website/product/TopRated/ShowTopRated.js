import { useEffect, useState } from "react";
import { Axios } from "../../../../Api/Axios";
import {topRatedApi } from "../../../../Api/Api";

import SkeletonCom from "../../skeleton/Skeleton";

import TopRated from "./TopRated";

export default function ShowTopRated() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Axios.get(`${topRatedApi}`)
      .then((res) => {
        setProducts(res.data);
        console.log(res.data);
      })
      .finally(setLoading(false));
  }, []);

  const productsShow = products.map((product, key) => (
    <TopRated
     product={product}
      key={key}
      title={product.title}
      description={product.description}
      discount={product.discount}
      img={product.images[0].image}
      price={product.price}
      sale
      rating={product.rating}
    />
  ));
  return (
    <div className="col-md-6 col-12 mb-5" style={{ border: "2px solid #803D3B" }}>
      <h1 className="text-center m-0 p-3 text-secondary boxshadow fw-bold">
        Top Rated Products
      </h1>
      <div className=" p-5">
        {loading ? (
          <>
            <SkeletonCom
              baseColor="#0B5ED7"
              height="800px"
              length={1}
              classes=" col-12"
            />
          </>
        ) : (
          productsShow
        )}
      </div>
    </div>
  );
}
