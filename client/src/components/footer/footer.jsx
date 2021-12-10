import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import "./footer.css";

export default function Footer() {
  return (
    <div>
      <footer sx={{ bgcolor: "yellow" }}>
        <Box
          px={{ xs: 3, sm: 10 }}
          py={{ xs: 5, sm: 2 }}
          bgcolor='text.secondary'
          color='white'
          sx={{ bgcolor: "#4527a0" }}
        >
          <Container maxWidth='lg'>
            <Grid container spacing={12}>
              <Grid item xs={9} sm={3} mt={5}>
                <Box borderBottom={2}>Institucional</Box>
                <Box mt={2}>
                  <Link href='/aboutUs' className='links-footer' color='inherit'>
                    Quiénes Somos
                  </Link>
                </Box>
                <Box mt={1}>
                  <Link
                    href='https://www.adidas.com.ar/help-topics-privacy_policy.html'
                    color='inherit'
                  >
                    Políticas de Privacidad
                  </Link>
                </Box>
                <Box mt={1}>
                  <Link href='/asdsa' color='inherit'>
                    Protocolos COVID-19
                  </Link>
                </Box>
              </Grid>
              <Grid item xs={9} sm={3} mt={5}>
                <Box borderBottom={2}>Ayuda</Box>
                <Box mt={2}>
                  <Link href='/asdsa' color='inherit'>
                    Preguntas Frecuentes
                  </Link>
                </Box>
                <Box mt={1}>
                  <Link href='/asdsa' color='inherit'>
                    Sucursales
                  </Link>
                </Box>
              </Grid>
              <Grid item xs={9} sm={3} mt={5}>
                <Box borderBottom={2}>Redes Sociales</Box>
                <Box sx={{ mt: 2, display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
                  <Box>
                    <Link href='/asdsa' color='inherit'>
                      <i className='fa fa-twitter'></i>
                    </Link>
                  </Box>
                  <Box>
                    <Link href='/asdsa' color='inherit'>
                      <i className='fa fa-facebook'></i>
                    </Link>
                  </Box>
                  <Box>
                    <Link href='/asdsa' color='inherit'>
                      <i className='fa fa-instagram'></i>
                    </Link>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={9} sm={3} mt={5}>
                <Box borderBottom={2}>Terminos y condiciones</Box>
                <Box mt={2}>
                  <Link href='/asdsa' color='inherit'>
                    Política de Cookies
                  </Link>
                </Box>

                <Box mt={1}>
                  <img
                    alt='j'
                    height='70'
                    width='60'
                    src='https://www.afip.gob.ar/images/f960/DATAWEB.jpg'
                  />
                  <img
                    alt='j'
                    height='70'
                    width='70'
                    src='https://www.adidas.com.ar/on/demandware.static/-/Sites-adidas-AR-Library/es_AR/dwbff8f2e3/000-Sello-Argentina_2018.jpg'
                  />
                  <img
                    alt='j'
                    height='70'
                    width='70'
                    src='https://www.lacamaradetrenque.com.ar/wp-content/uploads/2016/09/AHORA12.png'
                  />
                </Box>
              </Grid>
            </Grid>
            <Box textAlign='center' pt={{ xs: 5, sm: 10 }} pb={{ xs: 5, sm: 0 }}>
              Proyecto Final Grupo N°3 &reg; 2021
            </Box>
          </Container>
        </Box>
      </footer>
    </div>
  );
}
