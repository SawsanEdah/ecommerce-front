import { faStar as solid } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons/faCartShopping";
import { useContext } from "react";
import { CartContext } from "../../../../Context/CartContext";


export default function TopRated(props) {
  const{dispatch}=useContext(CartContext)
  const roundStars = Math.round(props.rating);
  const stars = Math.min(roundStars, 5);
  const showGoldenStars = Array.from({ length: stars }).map((star, index) => (
    <FontAwesomeIcon key={index} icon={solid} color="gold" />
  ));
  const showEmptyStars = Array.from({ length: 5 - stars }).map(
    (star, index) => <FontAwesomeIcon key={index} icon={regularStar} />
  );

  return (
    <div className="col-12 border-bottom d-flex align-items-start flex-wrap mb-2">
      <div
        className="col-md-4 col-12"
        style={{
          backgroundImage: `url('${props.img}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "170px",
        }}
      ></div>
      <div className="m-1 col-md-7 col-12 rounded p-3 h-100 d-flex flex-column justify-content-between">
        <div>
          <p className="text-truncate" style={{ color: "gray" }}>
            {props.title}
          </p>
          <p className="text-truncate">{props.description}</p>
        </div>
        <div className="d-flex align-items-center justify-content-between pt-4">
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
            <FontAwesomeIcon cursor="pointer" title="add to cart" icon={faCartShopping} width="20px" onClick={()=>{dispatch({type : 'add', product : props.product})}}/>
          </div>
        </div>
      </div>
    </div>
  );
}
