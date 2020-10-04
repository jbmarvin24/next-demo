import {
  Typography,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  makeStyles,
  Badge,
} from "@material-ui/core";
import { Menu as MenuIcon, ShoppingCart } from "@material-ui/icons";
import Products from "../components/products";
import Carts from "../components/carts";
import ShopContext from "../context/shop-context";
import { useContext } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  cart: {
    marginLeft: theme.spacing(3),
  },
}));

const Context = () => {
  const context = useContext(ShopContext);

  const classes = useStyles();

  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          React Context Demo for Global State Management.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6">Shop</Typography>
              <Badge
                className={classes.cart}
                badgeContent={context.cart.reduce((count, curItem) => {
                  return count + curItem.quantity;
                }, 0)}
                color="error"
              >
                <ShoppingCart />
              </Badge>
            </Toolbar>
          </AppBar>
        </div>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Products />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Carts />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Affected files
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          1. _app.js
          <br />
          2. context folder
          <br />
          3. carts and products components
          <br />
          4. context page
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Context;
