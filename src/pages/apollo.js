import { useEffect, useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  makeStyles,
  Typography,
  Grid,
  Button,
} from "@material-ui/core";
import UserForm from "../components/userForm";

const UsersQuery = gql`
  query UsersQuery {
    users {
      id
      fullname
      birthdate
      age
      role {
        name
      }
    }
  }
`;

const DeleteUser = gql`
  mutation DeleteUser($id: Int!) {
    delete_users(where: { id: { _eq: $id } }) {
      returning {
        id
      }
    }
  }
`;

const Apollo = () => {
  const { data, loading, error, refetch } = useQuery(UsersQuery);
  const [deleteUser, { deletedUser }] = useMutation(DeleteUser);

  async function handleDelete(id) {
    await deleteUser({
      variables: {
        id,
      },
    });
    await refetch();
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography component="h1" variant="h4">
            Apollo Client w/ Formik Demo
          </Typography>
        </Grid>
        <br />
        <Grid item xs={12}>
          <Typography component="h1" variant="h5">
            User List
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell align="right">Full Name</TableCell>
                  <TableCell align="right">Birthdate</TableCell>
                  <TableCell align="right">Age</TableCell>
                  <TableCell align="right">Role</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell component="th" scope="row">
                      {user.id}
                    </TableCell>
                    <TableCell align="right">{user.fullname}</TableCell>
                    <TableCell align="right">{user.birthdate}</TableCell>
                    <TableCell align="right">{user.age}</TableCell>
                    <TableCell align="right">{user.role.name}</TableCell>
                    <TableCell align="right">
                      <Button
                        color="primary"
                        variant="contained"
                        style={{ marginRight: 10 }}
                        onClick={() => {
                          alert(
                            "Not available for now, but update function is the same approach with create and delete."
                          );
                        }}
                      >
                        Update
                      </Button>
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} sm={6}>
          <UserForm refetch={refetch} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Apollo;
