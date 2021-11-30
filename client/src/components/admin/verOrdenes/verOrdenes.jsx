import "./verOrdenes.css"
import React, { useState, useEffect } from "react";
import { getAllOrders, filterStatus } from "../../../Redux/Actions/index"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import swal from 'sweetalert';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import TextField from '@mui/material/TextField';
import Ordenes from "./ordenes/ordenes"
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

export default function VerOrdenes() {
    const history = useHistory();
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getAllOrders());
    }, [dispatch]);
    
    const allOrders = useSelector(state => state.orders);
    console.log(allOrders, "queremos ver las ordenes")
    
    function handleFilterStatus(e) {
        e.preventDefault();
        // console.log(e.target.value, "enzooo")
        dispatch(filterStatus(e.target.value))
    }

    return (
        <div >
            <div className="verOrdenesContainer">

                <h1>Ordenes</h1>

                <select onChange={(e) => handleFilterStatus(e)}>
                    <option value='TODOS'>Estado de orden</option>
                    <option value="PENDING" name="status">PENDING</option>
                    <option value="COMPLETED" name="status">COMPLETED</option>
                    <option value="PROCESSING" name="status">PROCESSING</option>
                    <option value="CANCELED" name="status">CANCELED</option>
                </select>
            </div>
            {
                allOrders?.map(e => {
                    return (
                        <div key={e.id}>
                            <Ordenes key={"222"} estadoOrden={e.status} idOrden={e.id} fechaCompra={e.dateOfPurchase} />
                        </div>
                    )
                })
            }



        </div>
    )
}