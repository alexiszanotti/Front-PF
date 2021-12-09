import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import { CardMedia } from '@material-ui/core';

export default function Footer() {
  return (
    <div>
     <footer sx={{bgcolor:"yellow"}}>
      <Box
        px={{ xs: 3, sm: 10 }}
        py={{ xs: 5, sm: 10 }}
        bgcolor="text.secondary"
        color="white"
        sx={{bgcolor:"#4527a0"}}
      >
        <Container maxWidth="lg" >
          <Grid container spacing={5}>
            <Grid item xs={9} sm={3}>
              <Box borderBottom={2}>Institucional</Box>
              <Box>
                <Link href="/aboutUs" color="inherit">
                Quiénes Somos
                </Link>
              </Box>
              <Box>
                <Link href="https://www.adidas.com.ar/help-topics-privacy_policy.html" color="inherit">
                Políticas de Privacidad
                </Link>
              </Box>
              <Box>
                <Link href="/asdsa" color="inherit">
                Protocolos COVID-19
                </Link>
              </Box>
            </Grid>
            <Grid item xs={9} sm={3}>
              <Box borderBottom={2}>Ayuda</Box>
              <Box>
                <Link href="/asdsa" color="inherit">
                Preguntas Frecuentes
                </Link>
              </Box>
              <Box>
                <Link href="/asdsa" color="inherit">
                Sucursales
                </Link>
              </Box>
            </Grid>
            <Grid item xs={9} sm={3}>
              <Box borderBottom={2}>Redes Sociales</Box>
              <Box>
                <Link href="/asdsa" color="inherit">
                Twitter
                </Link>
              </Box>
              <Box>
                <Link href="/asdsa" color="inherit">
                Facebook
                </Link>
              </Box>
              <Box>
                <Link href="/asdsa" color="inherit">
                Instagram
                </Link>
              </Box>
            </Grid>
            <Grid item xs={9} sm={3}>
              <Box borderBottom={2}>TÉRMINOS Y CONDICIONES</Box>
              <Box>
                <Link href="/asdsa" color="inherit">
                Terminos y Condiciones
                </Link>
              </Box>
              <Box>
                <Link href="/asdsa" color="inherit">
                Politicas de Privacidad
                </Link>
              </Box>
              <Box>
                  <img alt="j" height="70" width="60" src="https://www.afip.gob.ar/images/f960/DATAWEB.jpg" />
                  <img  alt="j" height="70" width="70" src="https://www.adidas.com.ar/on/demandware.static/-/Sites-adidas-AR-Library/es_AR/dwbff8f2e3/000-Sello-Argentina_2018.jpg" />
                  <img  alt="j" height="70" width="70" src="https://www.lacamaradetrenque.com.ar/wp-content/uploads/2016/09/AHORA12.png" />
                  
              </Box>
            </Grid>
          </Grid>
          <Box textAlign="center" pt={{ xs: 5, sm: 10 }} pb={{ xs: 5, sm: 0 }}>
           Proyecto Final Grupo N°3 &reg; 2021
          </Box>
        </Container>
      </Box>
    </footer>
    </div>
  );
}
