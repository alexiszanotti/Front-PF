import "./home.css";
import React from "react";
import Products from "../product/product";
import {useSelector} from "react-redux"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
export default function Home() {
    const shoes =  useSelector((state) => state.products)
    
    return (
        <div>
            <div className="boxCategories">
                <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} columns={16}>
                    <Grid item xs={4}>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">MODELO</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Age"
                            >
                            <MenuItem value={"CORE/NEO"}>CORE/NEO</MenuItem>
                            <MenuItem value={"SPORT PERFORMANCE"}>SPORT PERFORMANCE</MenuItem>
                            <MenuItem value={"ORIGINALS"}>ORIGINALS</MenuItem>
                            </Select>
                        </FormControl>
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">TALLE</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Age"
                            >
                            <MenuItem value={10}>40</MenuItem>
                            <MenuItem value={20}>41</MenuItem>
                            <MenuItem value={30}>42</MenuItem>
                            </Select>
                        </FormControl>
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">PRECIO</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Age"
                            >
                            <MenuItem value={10}>MAYOR A MENOR</MenuItem>
                            <MenuItem value={20}>MENOR A MAYOR</MenuItem>
                            
                            </Select>
                        </FormControl>
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">DESCUENTO</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Age"
                            >
                            <MenuItem value={"0.00"}>Sin descuento</MenuItem>
                            <MenuItem value={"40.00"}>40%</MenuItem>
                            <MenuItem value={"50.00"}>50%</MenuItem>
                            </Select>
                        </FormControl>
                        </Box>
                    </Grid>
                </Grid>
                </Box>
            </div>
            <div className="contenedor">
                
                {
                    shoes.length &&
                    shoes.map((products) =>{
                        return(
                            <Products 
                            key={products.id}
                            title={products.productName}
                            image={products.images[0]}
                            price={products.salePrice + "$"}
                            id= {products.id}
                            />
                        )
                    })
                }
            </div>
    </div>
    )

}