import React, { useContext } from 'react'
import { CartContext } from '../../../Context/CartContext'
import CartProduct from './CartProduct'
import { Container } from 'react-bootstrap'
import { totalItems, totalPrice } from '../../../Reducer/CartReducer'


export default function Cart() {
    const {cart}=useContext(CartContext)
    console.log(cart)
    
    
  return (
    <Container>
        <div className="d-flex align-items-start flex-wrap mt-5 ">
                <div className='col-md-9 col-12'>
                    {cart.map((p,key) => (
                        <CartProduct key={key} product={p}></CartProduct>
                    ))}
                </div>
                <div className="col-md-3 col-12 bg-secondary p-3  mt-5 text-white">
                    <h5 >Total Items:<span className='ms-3 fw-bolder'>{totalItems(cart)}</span></h5>
                    <h5>Total Price: <span className='ms-3 fw-bolder'>${totalPrice(cart)}</span> </h5>
                    <button className='btn btn-warning'>Checkout</button>
                </div>
        </div>
    </Container>
    
  )
}
