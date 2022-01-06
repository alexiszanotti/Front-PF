import "./verOrdenes.css";
import React, { useEffect } from "react";
import { getAllOrders, filterStatus } from "../../../Redux/Actions/index";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Ordenes from "./ordenes/ordenes";

export default function VerOrdenes() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const allOrders = useSelector(state => state.orders);

  function handleFilterStatus(e) {
    e.preventDefault();

    dispatch(filterStatus(e.target.value));
  }

  return (
    <div className='verOrdenesContainer'>
      <div >
        <h1>ORDENES</h1>

        <select onChange={e => handleFilterStatus(e)}>
          <option value='TODOS'>Estado de orden</option>
          <option value='PENDING' name='status'>
            PENDING
          </option>
          <option value='COMPLETED' name='status'>
            COMPLETED
          </option>
          <option value='PROCESSING' name='status'>
            PROCESSING
          </option>
          <option value='CANCELED' name='status'>
            CANCELED
          </option>
        </select>
      </div>
      {allOrders?.map(e => {
        return (
          <div key={e.id} classname='verOrdenes'>
            <Ordenes
              key={"222"}
              estadoOrden={e.status}
              idOrden={e.id}
              fechaCompra={e.dateOfPurchase}
            />
          </div>
        );
      })}
      <Link to='/'>
        <button className='botonCart1'>
          Volver
        </button>
      </Link>
    </div>
  );
}
