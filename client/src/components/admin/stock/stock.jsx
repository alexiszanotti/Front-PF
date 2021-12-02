import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { modifyProduct, } from "../../../Redux/Actions/index";
import './stock.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Stock(){

    const dispatch = useDispatch()

    const products = useSelector(state => state.products)

    const [input, setInput] = useState({

        id: '',
        stock: 0,

    })

    const handleStock = (e) => {

        setInput({...input, stock: e.target.value})

    }

    if(input.id !== '') {

        console.log(input)
        
        dispatch(modifyProduct(input));
    
    }

    const successSubmit = () => {
        toast.success('Cantidad modificada con éxito', {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }

    const handleButton = () => {
        setTimeout(() => {
            window.location.replace('');    
        }, 2000);
    }

    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    });

    return (
        
        <div className='contentStock' >

            <h1>Modificar Stock</h1>

            <Paper sx={{ p: 2, margin: 'auto', maxWidth: 700, flexGrow: 10 }}>
                    {
                        
                        products.map(e => {
                            
                            return (
                                
                                <>

                                    <Grid container spacing={4}>
                                        <Grid item>
                                            <ButtonBase sx={{ width: 128, height: 128 }}>
                                                <Img alt="complex" src={e.images} />
                                            </ButtonBase>
                                        </Grid>
                                        <Grid item xs={12} sm container>
                                            <Grid item xs container direction="column" spacing={2}>
                                                <Grid item xs>
                                                    <Typography gutterBottom variant="subtitle1" component="div">
                                                        {e.productName}
                                                    </Typography>
                                                </Grid>
                                            <Grid item xs>
                                                <Button onClick={() => {
                                                    
                                                    setInput({...input, id: e.id})
                                                    successSubmit()
                                                    handleButton()

                                                }} variant="outlined">Modificar Stock</Button>
                                            </Grid>
                                            </Grid>
                                            <Grid item>
                                                <TextField
                                                    id="outlined-number"
                                                    label={e.stock}
                                                    type="number"
                                                    onChange={e => handleStock(e) }
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                </>

                            )

                        })

                    }
            </Paper>
            <ToastContainer />
        </div>

      );
}