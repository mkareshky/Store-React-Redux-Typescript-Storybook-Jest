
import React, { useEffect } from 'react';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';

interface product {
    match: any;
    _id: string;
    image: string;
    name: string;
    rating: number;
    numReviews: number;
    price: number;
    countInStock: number;

}
export default function HomeScreen() {

    const dispatch = useDispatch();
    const productList = useSelector<any, any>((state: any) => {
        return {
            list: state.productList,
        }
    }, shallowEqual);
    var { loading, errors, data } = productList.list;



    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);
    return (
        <div>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : errors !== '' ? (
                <MessageBox variant="danger">{errors}</MessageBox>
            ) : (
                        <div className="row center">
                            {data.map((p: product) => (
                                <Product
                                    key={p._id}
                                    _id={p._id}
                                    image={p.image}
                                    name={p.name}
                                    numReviews={p.numReviews}
                                    price={p.price}
                                    rating={p.rating}
                                    countInStock={p.countInStock}></Product>
                            ))}
                        </div>
                    )}
        </div>
    );
}