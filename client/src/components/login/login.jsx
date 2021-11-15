import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { postUserLogin } from "../../Redux/Actions/index";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import Button from "@mui/material/Button";

import "./login.css";

export default function Login() {
  const history = useHistory();

  const [values, setValues] = useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

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

  //----------------- lo de arriba es del MATERIAL UI -------------

  const dispatch = useDispatch();

  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");

  const inputHandleChange = e => {
    if (!/\S+@\S+\.\S+/.test(e)) {
      setError("Debe ser un email valido");
    } else {
      setError("");
    }
    setUserName(e);
  };

  const handleSubmit = async () => {
    let password = values.password;

    dispatch(postUserLogin({ userName, password }));

    history.push("/home");
  };

  return (
    <div className='contLogin'>
      <h1 className='h5Login'>Iniciar Sesion</h1>

      <Box
        component='form'
        sx={{
          "& > :not(style)": { m: 1, width: "50ch" },
        }}
        noValidate
        autoComplete='off'
        className='inputLogin'
      >
        <TextField
          name='userName'
          id='userName'
          value={userName}
          label={!error ? "E-mail" : error}
          variant='outlined'
          onChange={e => inputHandleChange(e.target.value)}
        />
      </Box>

      <div className='inputLogin'>
        <FormControl sx={{ m: 1, width: "50ch" }} variant='outlined'>
          <InputLabel name='pass' htmlFor='outlined-adornment-password'>
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

      <div className='inputLogin'>
        <FormControlLabel control={<Checkbox defaultChecked />} label='Mantener sesion abierta.' />
      </div>

      <div>
        <Button onClick={handleSubmit} variant='contained'>
          Ingresar
        </Button>
      </div>

      <div className='buttomLogin'>
        <Button variant='outlined' size='large'>
          Google
        </Button>

        <Button variant='outlined' size='large'>
          Github
        </Button>
      </div>

      <p>Registrate</p>
    </div>
  );
}
