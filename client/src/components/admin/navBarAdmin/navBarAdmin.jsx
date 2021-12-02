import "./navBarAdmin.css";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { userLogout } from "../../../Redux/Actions/index";
import { useHistory, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
const drawerWidth = 240;

export default function NavBarAdmin() {

  const history = useHistory();

  const dispatch = useDispatch();
  
  const { logout } = useAuth0();
  
  const logOut = () => {
    dispatch(userLogout());
    logout({ returnTo: window.location.origin });
    history.push("/");
  };
  
  return (
    <div className="navBarContainer">
      <Box sx={{ display: "flex" }}>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Link to="/">
            <Button>ADMIN</Button>
          </Link>
          <img alt="k" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAdVBMVEX///8AecEAcr4AbbwAdsD2+vwAcL3B1urS4fBhm8+qxuMAbLwAdL8Ad8DZ5fKmxOJxpdS30OeEsNhqodLt8/myzOZLkcvq8fh+rNeSuNwAZrqfwODk7fZbmc7I2uwAabs2iMcvhcYbfsOLtNoAYrlEjsozh8Z6oCd3AAAK+UlEQVR4nO2deb+yKhDHQ5RKpGyvk2bL6bz/l3hlccFcqEey22e+f937nCR+AgMMwzQaAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWCPeDF0Dy6xIshi6DlbZE4SSydC1sIiPEUIM74auhzVmCeKw69AVsYXnMqEQBauhq2KJ2EUK/J0GdYNRDvaGro0FPFIIRMF26OpYYOqWFCI8Hro+vXOiZYGIuUNXqHeuTFOInMPQNeoZn6AK9MuMTcCqCoNw6Dr1ytGpCkwbcT10rfrEeWhChNxvasR5TRN+VyOymiZMR+Jy6Hr1xvjBkErw0BXrjXttE6Zz4nzomvVEROsFIvQtG8V90KQQf4lDgzR00q+ZMJrszPfYmmljJ0WIfIVrsdHO8G4aD127Hli0dNJ0XTN09Xpg5bYpJJ+z199MXvTjtjbhy9Y0OvU9gtc/BNO/cBM9++CkXSFznq7KbB5eKSY/Tz/YTiT88a6D3fC5fnWo3VYU4NkzpXmbKSGOa2MER1lTMJfQ6RM9pGlNmuEcjYvy/Dt1Cq9yz16QqNzZXEL2pt21ba4QZZnOF5NVSZ4NhVivWEDvRr21YximEKPv96+4snDou5eucbVmjFwNTh/qHDQ62KA3HJ3HF9X7TFrX2wjr1Ng+G3KczjIOpMbNw1A/ugpqe1vajh19FXUYmm5fhu/UubEQu/enTXJpqCq+t/Uyr8vQdFX1dG3Ye/V/Bjlt6m4u3Tc/1W1oWk2NF+OmPtD/qcCteQ/kuKempzadhqbNqejj5lHc/76rbYvAaFOXaXkvRV0bXBneva0DkKfXj11UJ0SdgNVXc2WgsMGYLkirGbbgHWhViFhSOy661mxCYe2TYcf39W5KR6Ntx8xG6g6uXQOFbo2lWl86BrCN48fO1YnLHodG92RRuzKdNLvnFKTRuL1Ot+FnuPq1XntXU4+dq1/lJ51Nb8X7YTC1Jb7+yM5IYdXzvex+yo4Hy8QuUn14zAzeSjqm9O8JDR5yKq+yH9qdZgqsmQ2TJU21x01NnrF09GhiNhApS3xBYWywCqoZuv3QuDTVJZb2CqenFU5NBFo7lms7gCiBi7H4tEKTMYgsRqp0zlLq+/Nl2LMKD2YC7Z0FNB8E6uRxzmbjMF9iboxGuk1HefNhrg4j6ycUsiB7H4lh8cyWQLOFNMdVk7jZfKg+vDYcBFZD4gxtTVqJqfh8ZNSGZ1n4xchUI8sRcd2OJQUW9vzRB1mDshuh0TyBbB+N1wc31UHFRsNobyFqPDYc41nJ1qj17NUh19MmvTS4pR/0jAu2fWx8/MGG/PC1zYUafJCfzcSJabm/Tx1WvYBnjumnebHrp4oFAODrWS/Gg/GmEKorGYqk5RCoT2aGe4Deed9Fm5vx2q1fqAU3cAPG24Becd7URzlrOsAgxBYOY5qJJgPwToEAAADvYrydvontUNvekLrvIPh531rmQaKp//RfYMmQ0e57E4fovxE0RRS9iWPi2AUPNgYzJnPfKp9zHwMAAMA+3va35TRlvav+ld5Hp+ZTHvr7ide8N80xy2T24L1KopbDSPL3mekWvJg2HALy4Ak9uwn3KjWFdrjU/C7Uuxmz+mbhgc5aWJy4lNcQY0W3n9mAikP1epIg4I1yLwkS6czONS3efUdlcLw9fWwaER+yLk7qXREx/Rj2wJzASlhlz6xDWj2UF0f1o2PeT7Hoh9V9CSPu5w5AHe9G9Ogfdbcp66dUHiHp0RcBNrkL9zlsztR5UOhJ3Y66f1JS6Dp09b/z+EaHa37pM7ufduKnVllcdxbmzu/dbjdD7wJfIzpuKXFcpsZhyhEXYX2pQuYGBAfh4v8pTzGZh3/4J1M4Ckkemun9UrRdLuxGOL0Lr5jD4+Kg+ntT0QIAAACGVAIwuz71ZOH/VLWe+M2iXac8NvanYVG9T7IQ2idYLzfzD8hgK3ZKJFUY8rVp093yJd8vP3vVbu8dN97wEu0pnEyi02H05Qr3360w7aXRR/XSVZuleUlhtBxvPiC5a65wzdk12PeXFKYaP2G6yBW28qJCq4xv0+12deDREacjp+ReWW/28XYbHrmuXOFYfKos9XRYbbfTG/eLPigURcSiCE88ePS0x+L93OqWeRdSEvD4D4fgvXfDjuMUHvjJljr8j66D0bw0DsWnckvjLQnhHwsCgkPvpivMi+CON++Hn+P/KIX8MVeWfrEX7X0oO3sDchaOs+yQKC79kZELqrelG+xoRbCSQq9cBFJFyKRlE6f0GMO2fjtiWxc9oxTu3Dpv/oPCsHJDTXoXpcIoqDvHEApnlTQSwcWKwHv2GrXs3FLhLvcAa1WpKlzl70grwm8pQiiU0h2MCZZZaxwbdxD3snaM4MuFFNlxpEJVK5eQvwsu/N0VhUdcX4T/WISmUP6wAplzf1Ykb2Im/dubiexf5CxizCZxduggFO7FtzIaCpO5uGatrSvcySKc66JShJ8XgehUFZF1eq5QpMYpBjz/v9wD2x/yKKzIJrDAhcJdIpsmnziyeDddocxOR/IONsaFQllE6cdZsuQKXKEYFnnpi4SHtfeeCnwmakNKb079rApXKGY17faqyoOiKZS528p51rIi/Ow8uHyhQuU04grFURY7q3nDOwn6VigmLvZX/idZKa5Q5ErS03RKa6Qp9Hmr6HfpVRG+EhGUL1SoYw2uUPYfhqf+zN5yTdzE13MZyDZJFcrsrXqWGRmFoCkUnVR/D6oIX2US06+hS/lcYZYTzXUIZfHNziGxqEElg1hmAMQt/codcpldSFP4x19S5Vfl7mrGF0UwfSKXSTW4wl3pohU/zKErCwcC4mVXRrdcVM5lYr1qLln6oFAEY1TyO+1dqVD04EqOSHmZX8yHh8pxsZv0flgsBgWrrCQyhaJ61ZQxj23o1CkMjBSObkllvYN73wHLJtH/LVa9VMSRVKv32IZXUbN1TRG+LKJy035CCoWjWUjESWRO0vel9Ys2JUmwsjQiv0clY+rm0dKI8JlKCkGsLI1MEaKPc5lFukgXPDnEASUkszp9r9tEd3I1UyBrwHunXFRpe5rr42xxFBPOtaYIP5OqdT0Z0KEnRPai8V4uCnv/mUhp2EhprzorZnwhgjmlDriUKxJNoVy0OcvHIvxsvUNLXU8tGlKFcqedq1/L+DGzDMtPIEZRKUFSlviPK5Q1ZShf1GS2T1+1yVVKYSPyIvxs2csKt4da6HOFPi1vhdXb6D+PsFqH4ljUIdpnQXrChqpfp8Q30YyTPPGorlDdHyZ3MZx3RRG8Z8SiyRjdi6lucs4W76lC+QKLLix2IRYSgMgqIBejOEbFZlwoVIEyKKDXOA6KfVFl96T2D4y427iUn1so9FQ+3QBf461bbMD4OFT9R82B8nUSC+4rpCrO3LLVlvNgkeJJ+2N1B3wOaosQlT1lReh/5ApV7honWN1uU2lMX/jFgW48VOeoUDP9qTa09MGLca6LzlRejHFtxkthS9VujAVB5ulI7FyF0jIzMxXCpdYykZaW2iX1CkchrSlCdbgZKkf8BU6hcLTXX6BLbbnbxunoEXs17tM7VbyJR+WYSP9IQ0/cFkoyb2LxY9yTsywibZC8iHzBd8iKCBy6j5KSCU0fy5Y06d+mFmNsJ8szptTZHtK6n/itnXlpCluEV0opmvpprcRlIe5ZGYv/KO2OZ7c7oZTcbx1FeLKIbJKYHVIDRym+rPyPjiEGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGBI/gPvr6XxBWt/xAAAAABJRU5ErkJggg==" />
          <Toolbar />
          <Box sx={{ overflow: "auto" }}>
            <List>
              <ListItem button>
                <Link to="/userUpdata">
                  <Button>MODIFICAR USUARIOS</Button>
                </Link>
              </ListItem>
              <ListItem button>
                <Link to="/updateProduct">
                  <Button>MODIFICAR PRODUCTOS</Button>
                </Link>
              </ListItem>
              <ListItem button>
                <Link to="/createProduct">
                  <Button>CREAR PRODUCTOS</Button>
                </Link>
              </ListItem>
              <ListItem button>
                <Link to="/createCollection">
                  <Button>CREAR CATEGORÍAS</Button>
                </Link>
              </ListItem>
              <ListItem button>
                <Link to="/deleteCollection">
                  <Button>ELIMINAR CATEGORÍAS</Button>
                </Link>
              </ListItem>
              <ListItem button>
              <Link to="/stock">
                <Button>STOCK</Button>
              </Link>
              </ListItem>
              <Link to='/verOrdenes'>
              <ListItem button>
                <Button>ESTADOS DE ORDEN</Button>
              </ListItem>
              </Link>
            </List>
            <ListItem button>
              <Button onClick={logOut}>SALIR</Button>
            </ListItem>
            <Divider />
          </Box>
        </Drawer>
      </Box>
    </div>
  );
}
