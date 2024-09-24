import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";


export default function Landing() {
  return (
    <div className="d-flex justify-between-center align-items-center flex-wrap hand">
    <Container>
      <div className="col-lg-5 col-md-8 col-12 text-md-start text-center ">
      <h1 className="display-2 fw-bold ">Sunsilk Beauty Products</h1>
      <h5 className="col-10  fw-bold" style={{color:"rgb(73, 80, 87)"}}>
      leave a little sparkle everywhere you go
      </h5>
      <Link  className="btn  mt-3 py-3 px-4 fw-bold text-light " style={{backgroundColor:"#803D3B"}}  to="/shop">
     Shop Now 
      </Link>
      </div>
    </Container>
   </div>
  )
}
