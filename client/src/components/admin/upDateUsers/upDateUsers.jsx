import React, {useState, useEffect} from "react";
import {getAllUsers, modifyUser} from "../../../Redux/Actions/index"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import swal from 'sweetalert';
import "./upDateUsers.css"

export default function UpDataUsers(){

    const history = useHistory();
    const dispatch = useDispatch();
    const usersData = useSelector(state => state.users);

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    const [input, setInput] = useState({
      id: "",
      
    });



      const handleSelectChange = function (e) {
        setInput({ ...input, id: e.target.value });
      };
      
      const handleSelect = function (e) {
        setInput({
          ...input,
          [e.target.name]: e.target.value,
        });
      };

      const handleInputChange = function (e) {
        setInput({
          ...input,
          [e.target.name]: e.target.value,
        });
      };

      function handleSubmit(e) {
        e.preventDefault()
        dispatch(modifyUser(input));
        swal("Modificacion Exitosa!", "Usuario modificado!", "success");
        setInput({
            id: "",
        });
        history.push('/');
      }
  
      let aux = usersData.filter((el) => el.id === input.id)
      console.log(input)
    return(
        <div className="updateUserContainer">
            <h1>ELIJA EL USUARIO A MODIFICAR</h1>

                <Box sx={{ minWidth: 120 }}>
                <select onChange={(e) => handleSelectChange(e)} className="select" required="required" >
                        <option value="">USUARIOS</option>
                        {usersData.map((el) => {
                            return (
                                <option key={el.id} name="id" value={el.id}>
                                {el.email}
                                </option>
                            );
                        })}
                    </select> 
                </Box>
                
                <Box sx={{ minWidth: 120 }}>
                <h1>MODIFICAR USUARIO</h1>
                <form onSubmit={(e) => handleSubmit(e)} className="CreacionUsuario">
                    <label>NOMBRE DE USUARIO</label>
                    <input type="text" name="email" onChange={handleInputChange} placeholder={aux?.map((el) => el.email)} />
                    <label>NOMBRE</label>
                    <input type="text" name="name" onChange={handleInputChange} placeholder={aux?.map((el) => el.name)}/>
                    <label>APELLIDO</label> 
                    <input type="text" name="lastName" onChange={handleInputChange} placeholder={aux?.map((el) => el.lastName)}/>
                    <label>FECHA</label>
                    <input type="text" name="birthDay" onChange={handleInputChange} placeholder={aux?.map((el) => el.birthDay)}/>
                    <label>GENERO</label>
                    <select onChange={(e) => handleSelect(e)} name="gender" >
                        <option value=""></option>
                        <option value="Male" name="gender">Male</option>
                        <option value="Female" name="gender">Female</option>
                        <option value="Other" name="gender">Other</option>
                    </select>
                    <label>TIPO</label>
                    <select onChange={(e) => handleSelect(e)} name="type" >
                        <option value="" ></option>
                        <option value="Admin" name="type">Admin</option>
                        <option value="User" name="type">User</option>
                        <option value="Locked" name="type">Eliminar</option>
                    </select>
                    <br></br>
                    <button className="btn">Cargar datos</button>

                </form>
                </Box>


        </div>
    )
}

