import './misCompras.css';
import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

export default function MisCompras() {

    
    const userLogeado = useSelector((state) => state.userLogin);
    
    const history = useHistory();   
        
    const { user, isAuthenticated, logout } = useAuth0();

    if(!isAuthenticated && userLogeado.type === undefined) history.push("/home");

    return (
        <div className='misComprasContainer'>
            <h1>Mis compras</h1>
            <p>Total de compras</p>
            <div>
                <Card sx={{ maxWidth: 1200 }}>
                    <CardActionArea>
                        <CardMedia
                        // component="img"
                        // height="140"
                        // image="/static/images/cards/contemplative-reptile.jpg"
                        // alt="green iguana"
                        />
                            <TextField
                                id="outlined-read-only-input"
                                fullWidth
                                defaultValue="Fecha de compra"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        <CardContent className="misComprasCard">
                            <Typography gutterBottom variant="h5" component="div">
                                Imagen
                            </Typography>
                            <div className="misCompras">
                                <Typography gutterBottom variant="h5" component="div">
                                    Status
                                </Typography>
                                <Typography gutterBottom variant="h5" component="div">
                                    Fecha de entrega
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Nombre del producto
                                </Typography>
                            </div>
                            <Stack direction="column" spacing={2}>
                                <Button variant="contained">Ver compra</Button>
                                <Button variant="contained"> Volver a comprar</Button>
                            </Stack>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>
        </div>
    )
}