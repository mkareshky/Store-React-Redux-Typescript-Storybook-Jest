import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { detailsProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';


// interface product {
//     match: any;
//     _id: string;
//     image: string;
//     name: string;
//     rating: number;
//     numReviews: number;
//     price: number;
//     countInStock:number;

//   }
// const product:product = {
//   match:2,
//   _id: "0",
//   image: "1",
//   name: "NoName",
//   rating: 0,
//   numReviews: 0,
//   price: 0,
//   countInStock:0
// }


export default function ProductScreen(props: any) {
  
  const dispatch = useDispatch();
  const productDetails = useSelector<string, any>((state: any) => {
    return {
      data: state.productDetails,
    }
  }, shallowEqual);
  var { loading, error, product } = productDetails.data;
  const productId = props.match.params.id;
  const [qty, setQty] = useState<any>(1);

  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };


  const ProuductQty=()=>{

      const iterator = product.countInStock;
      var arrx:any = [];
      for (let index = 0; index < iterator; index++) {
        arrx.push(index + 1)
      }
  

  const listqty=  arrx.map(
    (x:any) => (
      <option key={x} value={x}>
        {x}
      </option>
    )
  )
  
  return(
    <React.Fragment>
      {listqty}
    </React.Fragment>
  )
  }


  useEffect(() => {
    dispatch(detailsProducts(productId));
  }, [dispatch, productId]);

  //const product = data.products.find((x) => x._id === props.match.params.id);

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
            <div>
              <Link to="/">Back to result</Link>
              <div className="row top">
                <div className="col-2">
                  <img
                    className="large"
                    src={product.image}
                    alt={product.name}
                  ></img>
                </div>
                <div className="col-1">
                  <ul>
                    <li>
                      <h1>{product.name}</h1>
                    </li>
                    <li>
                      <Rating
                        rating={product.rating}
                        numReviews={product.numReviews}
                      ></Rating>
                    </li>
                    <li>Pirce : ${product.price}</li>
                    <li>
                      Description:
                <p>{product.description}</p>
                    </li>
                  </ul>
                </div>
                <div className="col-1">
                  <div className="card card-body">
                    <ul>
                      <li>
                        <div className="row">
                          <div>Price</div>
                          <div className="price">${product.price}</div>
                        </div>
                      </li>
                      <li>
                        <div className="row">
                          <div>Status</div>
                          <div>
                            {product.countInStock > 0 ? (
                              <span className="success">In Stock</span>
                            ) : (
                                <span className="danger">Unavailable</span>
                              )}
                          </div>
                        </div>
                      </li>
                      {product.countInStock > 0 && (
                        <>
                          <li>
                            <div className="row">
                              <div>Qty</div>
                              <div>
                                <select
                                  value={qty}
                                  onChange={(e) => setQty(e.target.value)}
                                >
                                  <ProuductQty></ProuductQty>
                                </select>
                              </div>
                            </div>
                          </li>
                          <li>
                            <button
                              onClick={addToCartHandler}
                              className="primary block"
                            >
                              Add to Cart
                      </button>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
    </div>
  );
}
