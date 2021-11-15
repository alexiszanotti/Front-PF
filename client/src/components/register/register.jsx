import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postCreateUser } from "../../Redux/Actions/index";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import "./register.css";
import { useHistory } from "react-router-dom";

export default function Register() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [values, setValues] = useState({
    password: "",
    userName: "",
    name: "",
    lastName: "",
    birthDay: "",
    gender: "",
  });

  const [error, setError] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const validarPass = (p1, p2) => {
    if (/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(p1)) {
      // ----- La contraseña debe tener entre 8 y 16 caracteres, al menos un número, una minúscula y al menos una mayúscula.

      if (p1 !== p2) {
        alert("Las contraseña no coinciden");

        setValues({ ...values, password: "" });

        setRepeatPassword("");

        return false;
      } else {
        return true;
      }
    }
  };

  const handleRPChange = e => {
    setRepeatPassword(e.target.value);
  };

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handleSelectChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  //----------------- lo de arriba es del MATERIAL UI -------------

  const emailHandleChange = e => {
    if (!/\S+@\S+\.\S+/.test(e.target.value)) {
      // ---- el correo debe ser "texto@texto.texto"
      setError("Debe ser un email valido");
    } else {
      setError("");
    }
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const inputHandleChange = e => {
    if (e.target.name === "name") setValues({ ...values, [e.target.name]: e.target.value });
    else if (e.target.name === "lastName")
      setValues({ ...values, [e.target.name]: e.target.value });
  };

  const compDate = date => {
    let hoy = new Date();

    let res1 = hoy.getFullYear() - 18;

    let año = date.split("-");

    if (res1 < año[0]) {
      alert("Debe ser mayor de 18 años para crear la cuenta");

      document.getElementById("date").value = res1;
    } else {
      setValues({ ...values, birthDay: date });
    }
  };

  const handleSubmitCreate = () => {
    if (
      values.name === "" ||
      values.lastName === "" ||
      values.gender === "" ||
      values.birthDay === "" ||
      values.userName === "" ||
      values.password === ""
    )
      return alert("Hay campos vacios");

    if (validarPass(values.password, repeatPassword)) {
      dispatch(postCreateUser(values));

      alert("Usuario registrado");
      history.push("/home");
      setValues({
        password: "",
        userName: "",
        name: "",
        lastName: "",
        birthDay: "",
        gender: "",
      });

      setRepeatPassword("");

      document.getElementById("date").value = "";

      document.getElementById("name").value = "";

      document.getElementById("lastName").value = "";
    }
  };

  return (
    <div className='contReg'>
      <h1 className='h5Reg'>Registrarse</h1>

      <Box
        component='form'
        sx={{
          "& > :not(style)": { m: 1, width: "50ch" },
        }}
        noValidate
        autoComplete='off'
        className='inputReg'
      >
        <TextField
          name='name'
          id='name'
          label='Nombre'
          variant='outlined'
          onChange={e => inputHandleChange(e)}
        />

        <TextField
          name='lastName'
          id='lastName'
          label='Apellido'
          variant='outlined'
          onChange={e => inputHandleChange(e)}
        />
      </Box>

      <div className='selectReg'>
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>Sexo</InputLabel>
          <Select
            name='gender'
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={values.gender}
            label='sexo'
            onChange={e => handleSelectChange(e)}
          >
            <MenuItem value='Male'>Masculino</MenuItem>
            <MenuItem value='Female'>Femenino</MenuItem>
            <MenuItem value='Other'>Prefiero no Decirlo</MenuItem>
          </Select>
        </FormControl>

        <TextField id='date' type='date' onChange={e => compDate(e.target.value)} />
      </div>

      <Box
        component='form'
        sx={{
          "& > :not(style)": { m: 1, width: "50ch" },
        }}
        noValidate
        autoComplete='off'
        className='inputReg'
      >
        <TextField
          name='userName'
          id='email'
          value={values.userName}
          label={!error ? "E-mail" : error}
          variant='outlined'
          onChange={e => emailHandleChange(e)}
        />
      </Box>

      <p className='pRegister'>
        La contraseña debe tener entre 8 y 16 caracteres, al menos un número, una minúscula y al
        menos una mayúscula.
      </p>

      <div className='inputReg'>
        <FormControl sx={{ m: 1, width: "50ch" }} variant='outlined'>
          <InputLabel
            id='password'
            name='password'
            value={values.password}
            onChange={e => inputHandleChange(e)}
            htmlFor='outlined-adornment-password'
          >
            Password
          </InputLabel>
          <OutlinedInput
            id='outlined-adornment-password'
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge='end'
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label='Password'
          />
        </FormControl>
      </div>

      <div className='inputReg'>
        <FormControl sx={{ m: 1, width: "50ch" }} variant='outlined'>
          <InputLabel
            id='repeatPassword'
            name='repeatPassword'
            value={repeatPassword}
            htmlFor='outlined-adornment-password'
          >
            Repeat Password
          </InputLabel>
          <OutlinedInput
            id='outlined-adornment-password'
            type={values.showPassword ? "text" : "password"}
            value={repeatPassword}
            onChange={e => handleRPChange(e)}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge='end'
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label='Repeat Password'
          />
        </FormControl>
      </div>

      <div>
        <Button onClick={handleSubmitCreate} variant='contained'>
          Registrarse
        </Button>
      </div>

      <div className='buttomReg'>
        <Button variant='outlined' size='large'>
          Google
        </Button>

        <Button variant='outlined' size='large'>
          Github
        </Button>
      </div>
    </div>
  );
}
