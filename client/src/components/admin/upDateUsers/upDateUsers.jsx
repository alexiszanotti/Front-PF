import React, {useState, useEffect} from "react";
import {getAllUsers, modifyUser} from "../../../Redux/Actions/index"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import "./upDateUsers.css"
import { Button } from "@mui/material";


export default function UpDataUsers(){

  const History = useHistory()
  
  const localStorage = window.localStorage;

  const userLogin = JSON.parse(localStorage.getItem('user'));
  console.log(userLogin, 'uoUser')
  if(userLogin.type !== 'Admin') {
    console.log('no es admin')
    History.push("/home");
    
    window.location.replace('');
    
  }

    const dispatch = useDispatch();
    const usersData = useSelector(state => state.users);

    console.log(usersData)
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
        e.preventDefault();
        dispatch(modifyUser(input));
        alert("USUARIO CREADO");
        setInput({
          id: "",
        });
        window.location.replace('');
      }
  
      let aux = usersData.filter((el) => el.id === input.id)
      console.log(input)
    return(
        <div className="editProductContainer">
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
                    <label>EMAIL</label>
                    <input placeholder={aux?.map((el) => el.email)}  type="text" name="email"  onChange={handleInputChange} />
                    <label>NOMBRE</label>
                    <input type="text" name="name" onChange={handleInputChange} placeholder={aux?.map((el) => el.name)}/>
                    <label>APELLIDO</label> 
                    <input type="text" name="lastName" onChange={handleInputChange} placeholder={aux?.map((el) => el.lastName)}/>
                    <label>FECHA</label>
                    <input type="text" name="birthDay" onChange={handleInputChange} placeholder={aux?.map((el) => el.birthDay)}/>
                    <label>CONTRASEÑA</label>
                    <input type="text" name="password" onChange={handleInputChange} />
                    <label>GENERO</label>
                    <select onChange={(e) => handleSelect(e)} name="gender" >
                        <option value=""></option>
                        <option value="Male" name="gender">MASCULINO</option>
                        <option value="Female" name="gender">FEMENINO</option>
                        <option value="Other" name="gender">OTRO</option>
                    </select>
                    <label>TIPO</label>
                    <select onChange={(e) => handleSelect(e)} name="type" >
                        <option value="" ></option>
                        <option value="Admin" name="type">ADMIN</option>
                        <option value="User" name="type">USER</option>
                    </select>
                    <Button>CARGAR DATOS</Button>

                </form>
                </Box>


        </div>
    )
}

