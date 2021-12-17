import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import { useSelector } from 'react-redux';

export default function Pago() {
    const products = useSelector((state) => state.shoppingCart);


  return (
    <ImageList sx={{ width: 500, height: 450 }}>
      <ImageListItem key="Subheader" cols={2}>
        <ListSubheader component="div">CARRITO</ListSubheader>
      </ImageListItem>
      {products.map((item) => (
        <ImageListItem key={item.images[0]}>
          <img
            src={item.images[0]}
            alt="sin imagen"
          />
          <ImageListItemBar
            title={item.productName}
            subtitle={item.salePrice}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

