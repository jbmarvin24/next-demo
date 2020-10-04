import { useContext, useEffect } from "react";
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
import ShopContext from "../context/shop-context";

const useStyles = makeStyles({
  table: {
    //minWidth: 650,
  },
});

const Products = () => {
  const context = useContext(ShopContext);

  useEffect(() => {
    //console.log(context);
  }, []);

  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" gutterBottom>
        Products
      </Typography>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>title</TableCell>
            <TableCell align="right">price</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {context.products.map((product) => (
            <TableRow key={product.id}>
              <TableCell component="th" scope="row">
                {product.id}
              </TableCell>
              <TableCell align="right">{product.title}</TableCell>
              <TableCell align="right">{product.price}</TableCell>
              <TableCell align="right">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={context.addProductToCart.bind(this, product)}
                >
                  Add to Cart
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default Products;
