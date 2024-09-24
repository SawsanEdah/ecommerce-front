import {faStar as solid } from "@fortawesome/free-solid-svg-icons";
import {faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons/faCartShopping";
import { useContext } from "react";
import { CartContext } from "../../../../Context/CartContext";


export default function SaleProducts(props) {
 const {dispatch}=useContext(CartContext)
  const roundStars=Math.round(props.rating)
  const stars=Math.min(roundStars,5)
  const showGoldenStars=Array.from({length:stars}).map((star,index)=>
    <FontAwesomeIcon key={index} icon={solid} color="gold"/>)
  const showEmptyStars=Array.from({length:5-stars}).map((star,index)=>
    <FontAwesomeIcon key={index} icon={regularStar} />)

  return (
    <div className={`mt-3 col-lg-${props.col} col-md-6 col-12 `}>
      <div className="m-1 border boxshadow rounded p-3 h-100">
        <div className=" border-bottom pb-3">
          <p className="text-truncate" style={{ color: "gray" }}>{props.title}</p>
          <p className="text-truncate">{props.description}</p>
          <div className="px-5 py-4 position-relative">
            {props.sale && <p
              className="m-0 position-absolute top-0 start-0  rounded-circle text-white text-uppercase d-inline-block text-center"
              style={{ width: "50px", height: "50px", lineHeight: "50px",backgroundColor:"#803D3B" }}
            >
              Sale
            </p>}
            <div
              className="w-100"
              style={{
                backgroundImage:`url('${props.img}')`,
                backgroundSize :"cover",
                backgroundPosition:"center",
                width:"100%",
                height:"170px"
              }}
            ></div>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between mt-2">
          <div>
            {showGoldenStars}
            {showEmptyStars}
            
            <div className="d-flex align-items-center gap-3">
              <h5 className="m-0 text-primary"> {props.discount}$</h5>
              <h6
                className="m-0"
                style={{ color: "gray", textDecoration: "line-through" }}
              >
              {props.price}
              </h6>
            </div>
          </div>
          <div className=" p-2 rounded">
          <FontAwesomeIcon cursor="pointer" title="add to cart" icon={faCartShopping}  width="20px" onClick={()=>{dispatch({type : 'add',product :props.product})}}/>
             
            
          </div>
        </div>
      </div>
    </div>
  );
}
