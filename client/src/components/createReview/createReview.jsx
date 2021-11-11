import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import TextField from '@mui/material/TextField';

export default function createReview (){

    
    const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};

const [value, setValue] = React.useState(2);
const [hover, setHover] = React.useState(-1);

<Box
        component="form"
        sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        className = "detailContainer"
        >

        <div className="detailBox">
          <h1>Reseñas y validaciones</h1>
          <TextField
            required
            id="outlined-required"
            label="Nombre de usuario"
            // placeholder="Nombre de usuario"
            />
          <TextField
            required
            id="outlined-required"
            label="Detalle de la compra"
            // placeholder="Detalle de la compra"
            />

          <Box
            sx={{
                width: 200,
                display: 'flex',
                alignItems: 'center',
            }}
            >
            <Rating
              name="hover-feedback"
              value={value}
              precision={0.5}
              onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                onChangeActive={(event, newHover) => {
                    setHover(newHover);
                }}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
            {value !== null && (
                <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                )}

          </Box>
          <br></br>
          <div>
          <button type='submit' className="btn">Publicar</button>
            </div>
        </div>
      </Box>
}