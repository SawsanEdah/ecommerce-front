import { useContext} from "react"
import { CartContext } from "../../../Context/CartContext"


export default function CartProduct({product}) {
    const{cart, dispatch}=useContext(CartContext)
    console.log(product)

   const Increase=(id)=>{
     const Index=cart.findIndex((p)=> p.id === id)
     if(cart[Index].quantity < 10){
      dispatch({type :'increase', id })
     }
   }

   const Decrease =(id)=>{
    const Index= cart.findIndex((p)=> p.id === id)
    if(cart[Index].quantity >1){
      dispatch ({type : 'decrease' , id})
    }
   }
  return (
  
  <div className="mt-3 col-lg-6 col-md-6 col-sm-12" >
      <div className="m-1 border boxshadow rounded p-3 h-100">
        <div className=" border-bottom pb-3">
          <p className="text-truncate" style={{ color: "gray" }}>{product.title}</p>
          <p className="text-truncate">{product.description}</p>
          <img src={product.images[0].image} className="w-25 h-25 ms-5" alt="" />
        </div>
        <div className="d-flex align-items-center justify-content-between mt-2">
          <div>
          
            
            <div className="d-flex align-items-center gap-3">
              <h5 className="m-0 text-primary"> {product.discount}$</h5>
              <h6
                className="m-0"
                style={{ color: "gray", textDecoration: "line-through" }}
              >
              {product.price}
              </h6>
            </div>
            
          </div>
          <button
         className="btn btn-sm btn-warning rounded-circle fw-bold"
         onClick={() =>  Increase(product.id)}
       >
        +1
      </button>
      <button
         className="btn btn-sm btn-warning rounded-circle fw-bold"
         onClick={() => Decrease(product.id)}
       >
        -1
      </button>
          <button
         className="btn btn-sm btn-danger "
         onClick={() => dispatch({ type: "remove",id: product.id })}
       >
        Remove
      </button>
         
        </div>
      </div>
    </div>
  )
}
