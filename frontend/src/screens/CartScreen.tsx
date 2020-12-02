import React, { useEffect } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';
import { ApplicationState } from '../store';
import { CartItem } from '../constants/cartConstants';


export default function CartScreen(props: any) {


  const Go_Shopping = "Go Shopping";
  const Cart_is_empty = " Cart is empty.";

  const productId = props.match.params.id;
  const qty: number = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;

  const cart = useSelector((state: ApplicationState) => state.cart)
  const { cartItems } = cart;
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);




  const ProuductQty = (count: {count:number}) => {

    const iterator = count===undefined?0:count.count;
    var arrx: number[]=[];
    for (let index = 0; index < iterator; index++) {
      arrx.push(index + 1)
    }


    const listqty = arrx.map(
      (x: number) => (
        <option key={x} value={x}>
          {x}
        </option>
      )
    )

    return (
      <React.Fragment>
        {listqty}
      </React.Fragment>
    )
  }


  const removeFromCartHandler = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    props.history.push('/signin?redirect=shipping');
  };
  return (
    <div className="row top">
      <div className="col-2">
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <MessageBox>
            {Cart_is_empty} <Link to="/"> {Go_Shopping} </Link>
          </MessageBox>
        ) : (
            <ul>
              {cartItems.map((item: CartItem) => (
                <li key={item.product}>
                  <div className="row">
                    <div>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="small"
                      ></img>
                    </div>
                    <div className="min-30">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </div>
                    <div>
                      <select
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        <ProuductQty count={item.countInStock}></ProuductQty>
                      </select>
                    </div>
                    <div>${item.price}</div>
                    <div>
                      <button
                        type="button"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        Delete
                    </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
      </div>
      <div className="col-1">
        <div className="card card-body">
          <ul>
            <li>
              <h2>
                Subtotal ({cartItems.reduce((a: number, c: {qty:number}) => a + c.qty, 0)} items) : $
                {cartItems.reduce((a: number, c: {qty:number,price:number}) => a + c.price * c.qty, 0)}
              </h2>
            </li>
            <li>
              <button
                type="button"
                onClick={checkoutHandler}
                className="primary block"
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}