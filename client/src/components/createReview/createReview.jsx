import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";

export default function CreateReview({review, score}) {
  console.log(review, score, "probamd")
  return (
      <div className='detailContainer'>
        <h1>Valoraciones y reseñas</h1>
        <h3>{review}</h3>
        <Box
                  sx={{
                    width: 200,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Rating name="half-rating-read" value={score} precision={0.5} readOnly />
                </Box>
        
    </div>
  )
}