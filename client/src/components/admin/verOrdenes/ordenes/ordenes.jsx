import React, { useState } from "react";
import "./ordenes.css";
import { modifyOrders, getAllOrders } from "../../../../Redux/Actions/index";
import { useDispatch } from "react-redux";

export default function Ordenes({ estadoOrden, idOrden, fechaCompra }) {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    status: "",
  });
  const handleSelectChange = function (e) {
    setInput({ ...input, status: e.target.value });
  };
  const handleSubmit = function (e) {
    e.preventDefault();
    dispatch(
      modifyOrders({
        cartId: idOrden,
        status: input.status,
      })
    );
    alert("Estado modificado con éxito");
    dispatch(getAllOrders());
  };

  return (
    <div className='ordenesContainer'>
      <div className='misOrdenesDiv'>
        <label>Fecha de compra:</label>
        <p>{fechaCompra}</p>
      </div>
      <div className='misOrdenesDiv'>
        <label>Número de orden:</label>
        <p>{idOrden}</p>
      </div>
      <div className='misOrdenesDiv'>
        <label>Estado:</label>
        <p>{estadoOrden}</p>
      </div>
      <div className='misOrdenesDiv'>
        <select onChange={handleSelectChange}>
          <option>Seleccione un estado</option>
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

        <button className='btn-orders' onClick={handleSubmit}>
          <strong> Actualizar estado</strong>
        </button>
      </div>
    </div>
  );
}
