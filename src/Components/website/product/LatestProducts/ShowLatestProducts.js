import { useEffect, useState } from "react";
import { Axios } from "../../../../Api/Axios";
import { Lastest } from "../../../../Api/Api";
import SkeletonCom from "../../skeleton/Skeleton";
import SaleProducts from "../SaleProducts/SaleProducts";

export default function ShowLatestProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Axios.get(`${Lastest}`)
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
      col="6"
    />
  ));


  return (
    <div className="col-md-6 col-12 "  >
      <div className="ms-md-3 ">
        <h1 className="text-center m-0 p-3  text-secondary boxshadow fw-bold" >
          Latest Products
        </h1>
        <div className=" d-flex align-items-stretch justify-content-center p-3 flex-wrap mt-3 row-gap-2 mb-5">
          {loading ? (
            <>
              <SkeletonCom
                baseColor="#0B5ED7"
                height="300px"
                length={6}
                classes=" col-md-6 col-12"
              />
            </>
          ) : (
            productsShow
          )}
        </div>
      </div>
    </div>
  );
}
