import { useEffect, useState } from "react";
import { Axios } from "../../../Api/Axios";
import { Cat } from "../../../Api/Api";

import { Container } from "react-bootstrap";
import StringSlice from "../../../helper/StringSlice";

import SkeletonCom from "../skeleton/Skeleton";


export default function WebsiteCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Axios.get(`${Cat}`).then((res) => {
      setCategories(res.data)
      
    }).finally(setLoading(false));
  }, []);

  const showCategories = categories.map((item ,key) => (
    <div key={key} className="col-lg-2 col-md-6 col-12 bg-transparent border-0">
      <div className="m-1 bg-white border d-flex align-items-center justify-content-start gap-3 rounded py-2 h-100">
        <img className="ms-3 ima" width="50px" height="50px" src={item.image} alt="ima" />

        <p className="m-0">
          {StringSlice(item.title, 12)}
        </p>
      </div>
    </div>
  ));
  return (
    <>
     
      <div className="bg-secondary py-5">
        <Container>
          <div className="d-flex align-items-stretch justify-content-center flex-wrap row-gap-2">
            {loading ? <>
            
           <SkeletonCom baseColor="white" height="70px"  length={categories.length} classes="col-lg-2 col-md-6 col-12 "/>
            
            </> :showCategories}
          </div>
        </Container>
      </div>
    </>
  );
}
