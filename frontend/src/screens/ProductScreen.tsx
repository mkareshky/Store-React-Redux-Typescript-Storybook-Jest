import React, { useEffect, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import Rating from '../components/Rating';
import {  useDispatch, useSelector } from 'react-redux';
import { detailsProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ApplicationState } from '../store';


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

interface MatchParams {
  id: string;
  name: string;
}

interface Props extends RouteComponentProps<MatchParams> {
}

export default function ProductScreen(props:Props) {

  const dispatch = useDispatch();
  const productDetails = useSelector((state: ApplicationState) => state.productDetails);
  var { loading, error, product } = productDetails;
  const productId = props.match.params.id;
  const [qty, setQty] = useState<string>('1');

  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };


  const ProuductQty = () => {

    const iterator = product?.countInStock===undefined?0:product.countInStock;
    var arrx = [];
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
                    src={product?.image}
                    alt={product?.name}
                  ></img>
                </div>
                <div className="col-1">
                  <ul>
                    <li>
                      <h1>{product?.name}</h1>
                    </li>
                    <li>
                      <Rating
                        rating={product?.rating||0}
                        numReviews={product?.numReviews||0}
                      ></Rating>
                    </li>
                    <li>Pirce : ${product?.price}</li>
                    <li>
                      Description:
                      <p>{product?.description}</p>
                    </li>
                  </ul>
                </div>
                <div className="col-1">
                  <div className="card card-body">
                    <ul>
                      <li>
                        <div className="row">
                          <div>Price</div>
                          <div className="price">${product?.price}</div>
                        </div>
                      </li>
                      <li>
                        <div className="row">
                          <div>Status</div>
                          <div>
                            {product===undefined?0:
                            product.countInStock > 0 ? (
                              <span className="success">In Stock</span>
                            ) : (
                                <span className="danger">Unavailable</span>
                              )}
                          </div>
                        </div>
                      </li>
                      {product===undefined?0:
                      product.countInStock > 0 && (
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
