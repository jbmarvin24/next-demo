import {
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  makeStyles,
  Paper,
  Typography,
  Button,
} from "@material-ui/core";
import { useContext, useEffect } from "react";
import ShopContext from "../context/shop-context";

const useStyles = makeStyles({
  table: {
    //minWidth: 650,
  },
});

const Carts = () => {
  const context = useContext(ShopContext);

  // useEffect(() => {
  //   console.log(context);
  // }, [context]);

  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" gutterBottom>
        Carts
      </Typography>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell align="right">title</TableCell>
            <TableCell align="right">price</TableCell>
            <TableCell align="right">quantity</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {context.cart.map((cart) => (
            <TableRow key={cart.id}>
              <TableCell component="th" scope="row">
                {cart.id}
              </TableCell>
              <TableCell align="right">{cart.title}</TableCell>
              <TableCell align="right">{cart.price}</TableCell>
              <TableCell align="right">{cart.quantity}</TableCell>
              <TableCell align="right">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={context.removeProductFromCart.bind(this, cart.id)}
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default Carts;
