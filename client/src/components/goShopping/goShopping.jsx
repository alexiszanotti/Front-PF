import React, {useEffect} from "react";
import {shoppingCart} from "../../Redux/Actions/index"
import { useSelector, useDispatch } from "react-redux";


export default function GoShopping() {
    const dispatch = useDispatch();
    const products = useSelector(state => state.shoppingCart);

    useEffect(() => {
        dispatch(shoppingCart());
    }, [dispatch]);

    console.log(products);
    return(
        <div>
            <h1>Estas en el shoping</h1>
        </div>
    )
}