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
  TextField,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
}));

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

const CreateUserMutation = gql`
  mutation CreateUser($user: users_insert_input! = {}) {
    insert_users_one(object: $user) {
      id
    }
  }
`;

const Apollo = () => {
  const classes = useStyles();
  const [fullName, setFullName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [age, setAge] = useState("");
  const [roleId, setRoleId] = useState("");

  const { data, loading, error, refetch } = useQuery(UsersQuery);
  const [addUser, { createdUser }] = useMutation(CreateUserMutation);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return (
    <React.Fragment>
      <Typography component="h1" variant="h4">
        Apollo Client Demo
      </Typography>
      <br />
      <Typography component="h1" variant="h5">
        User List
      </Typography>
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
                  >
                    Update
                  </Button>
                  <Button color="primary" variant="contained">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          User Form
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="fullname"
                variant="outlined"
                required
                fullWidth
                id="fullname"
                label="Full Name"
                autoFocus
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
                value={fullName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="birthdate"
                label="Birthday"
                name="birthdate"
                autoComplete="lname"
                type="date"
                onChange={(e) => {
                  setBirthdate(e.target.value);
                }}
                value={birthdate}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="age"
                label="Age"
                name="age"
                autoComplete="age"
                type="number"
                onChange={(e) => {
                  setAge(e.target.value);
                }}
                value={age}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="role"
                label="Role"
                id="role"
                type="number"
                onChange={(e) => {
                  setRoleId(e.target.value);
                }}
                value={roleId}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={async () => {
                  addUser({
                    variables: {
                      user: {
                        fullname: fullName,
                        birthdate,
                        age,
                        roleId,
                      },
                    },
                  });

                  await refetch();
                }}
              >
                Create
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Apollo;
