import React from 'react';
import Rating from './Rating';

interface product {
  _id: string;
  image: string;
  name: string;
  rating: number;
  numReviews: number;
  price: number;
  countInStock: number,

}
// const defaultproduct= {
//   _id: "0",
//   image: "1",
//   name: "NoName",
//   rating: 0,
//   numReviews: 0,
//   price: 0,
//   countInStock: 0,
// }

export default function Product(props:product) {
   // const { product } = props;
    return (
      <div key={props._id} className="card">
        <a href={`/product/${props._id}`}>
          <img className="medium" src={props.image} alt={props.name} />
        </a>
        <div className="card-body">
          <a href={`/product/${props._id}`}>
            <h2>{props.name}</h2>
          </a>
          <Rating
            rating={props.rating}
            numReviews={props.numReviews}
          ></Rating>
          <div className="price">${props.price}</div>
        </div>
      </div>
    );
  }