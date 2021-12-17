import React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";

export default function CreateReview({ review, score }) {
  return (
    <div>
      <div className='detailContainer'>
        <Box
          sx={{
            width: 750,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            flexDirection: "row",
          }}
        >
          <h3>{review}</h3>
          <Rating className="reseñas_estrellas" name='half-rating-read' value={score} precision={0.5} readOnly />
        </Box>
      </div>
    </div>
  );
}
