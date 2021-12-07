import React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";

export default function CreateReview({ review, score }) {
  return (
    <div>
      <h3>Valoraciones y reseñas</h3>
    <div className='detailContainer'>
      <Box
        sx={{
          width: 930,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <h3>{review}</h3>
        <Rating name="half-rating-read" value={score} precision={0.5} readOnly />
      </Box>

    </div>
    </div>
  )
}