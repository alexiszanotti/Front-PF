import React, {useState, useEffect} from "react";
import {getAllUsers, modifyUser} from "../../Redux/Actions/index"
import { useDispatch, useSelector } from "react-redux";
import Box from '@mui/material/Box';
import "./upDateUsers.css"

export default function UpDataUsers(){
    const dispatch = useDispatch();
    const usersData = useSelector(state => state.users);

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    const [input, setInput] = useState({
        id: "",
        userName: "",
        name: "",
        lastName: "",
        birthDay: "",
        password: "",
        gender:"",
        type:""

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
            userName: "",
            name: "",
            lastName: "",
            birthDay: "",
            password: "",
            gender:"",
            type:""
        });
      }
      console.log(usersData)

    return(
        <div>
            <h1>ELIJA EL USUARIO A MODIFICAR</h1>

                <Box sx={{ minWidth: 120 }}>
                <select onChange={(e) => handleSelectChange(e)} className="select" required="required" >
                        <option value="">USUARIOS</option>
                        {usersData.map((el) => {
                            return (
                                <option key={el.id} name="id" value={el.id}>
                                {el.userName}
                                </option>
                            );
                        })}
                    </select> 
                </Box>
                <Box sx={{ minWidth: 120 }}>
                <h1>MODIFICAR USUARIO</h1>
                <form onSubmit={(e) => handleSubmit(e)} className="CreacionUsuario">
                    <label>USERNAME</label>
                    <input type="text" name="userName" type="text" onChange={handleInputChange} />
                    <label>NAME</label>
                    <input type="text" name="name" type="text" onChange={handleInputChange}/>
                    <label>LASTNAME</label>
                    <input type="text" name="lastName" type="text" onChange={handleInputChange}/>
                    <label>BIRTDAY</label>
                    <input type="text" name="birthDay" type="text" onChange={handleInputChange}/>
                    <label>PASSWORD</label>
                    <input type="text" name="password" type="text" onChange={handleInputChange}/>
                    <label>GENDER</label>
                    <select onChange={(e) => handleSelect(e)} name="gender" required="required">
                        <option value=""></option>
                        <option value="Male" name="gender">Male</option>
                        <option value="Female" name="gender">Female</option>
                        <option value="Other" name="gender">Other</option>
                    </select>
                    <label>TYPE</label>
                    <select onChange={(e) => handleSelect(e)} name="type" required="required">
                        <option value="" ></option>
                        <option value="Admin" name="type">Admin</option>
                        <option value="User" name="type">User</option>
                    </select>
                    <button>UPDATE</button>

                </form>
                </Box>


        </div>
    )
}

