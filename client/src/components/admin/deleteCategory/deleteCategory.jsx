import "./deleteCategory.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCollection, getCollection } from "../../../Redux/Actions/index";

export default function DeleteCollection() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCollection());
    }, [dispatch]);

    const collections = useSelector((state) => state.collections);

    const [error, setError] = useState({});

    const [input, setInput] = useState({
        name: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.keys(error).length === 0) {
            dispatch(deleteCollection(input));
            alert("Categoría eliminada con éxito");
        } else {
            alert("Por favor, complete todos los campos requeridos");
        }
    };

    const handleSelectChange = (e) => {
        setInput({ name: e.target.value });
      };

    return (
        <div className="deleteCollectionContainer">
            <h1>Eliminar categoría</h1>
            <br></br>
            <div>
                <form className="form-inputs" onSubmit={(e) => handleSubmit(e)}>
                <select
            value={input.name}
            onChange={(e) => handleSelectChange(e)}
          >
            <option>Seleccione una categoria...</option>

            {collections?.map((c) => {
              return (
                <>
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                </>
              );
            })}
          </select>
                    <br></br>
                    <br></br>
                    <br></br>
                    <button className="btn">Eliminar categoría</button>
                </form>
            </div>
        </div>
    )

}