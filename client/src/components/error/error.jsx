import React from "react";
import { useHistory } from "react-router-dom";
import "./error.css"

export default function DefaultError() {
    const history = useHistory();
    function handleButtonHome(e) {
        e.preventDefault();
        history.push("/home");
      }
    return (
        <div className="errorContainer">
            {/* <h1></h1> */}
            {/* <img src="https://dam.muyinteresante.com.mx/wp-content/uploads/2020/04/error-404.jpg" /> */}
            <br></br>
            <br></br>
            <div>
            <button onClick={handleButtonHome} className='btn'>
                Ir a la página principal
            </button>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        </div>
    )

}