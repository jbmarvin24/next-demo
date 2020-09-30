import { Button, Grid, TextField, Typography } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { gql, useMutation } from "@apollo/client";

const CreateUserMutation = gql`
  mutation CreateUser($user: users_insert_input! = {}) {
    insert_users_one(object: $user) {
      id
    }
  }
`;

const initialValus = {
  fullName: "",
  birthdate: "",
  age: 0,
  roleId: 1,
};

const UserSchema = Yup.object().shape({
  fullName: Yup.string()
    .max(20)
    .required("Full Name is Required")
    .label("Full Name"),
  birthdate: Yup.date().required().label("Birthday"),
  age: Yup.number()
    .min(10, "Minimum 10 years old")
    .max(100, "Buhay kapa?")
    .required(),
  roleId: Yup.number().oneOf([1, 2]).required(),
});

const UserForm = (props) => {
  const [addUser, { createdUser }] = useMutation(CreateUserMutation);
  const { refetch } = props;
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography component="h1" variant="h5">
          User Form
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Formik
          validationSchema={UserSchema}
          initialValues={initialValus}
          onSubmit={async (values) => {
            await addUser({
              variables: {
                user: {
                  fullname: values.fullName,
                  birthdate: values.birthdate,
                  age: values.age,
                  roleId: values.roleId,
                },
              },
            });
            await refetch();
          }}
        >
          {({ values, errors, isSubmitting }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field
                    error={errors.fullName ? true : false}
                    name="fullName"
                    as={TextField}
                    label="Full Name"
                    variant="outlined"
                    fullWidth
                    helperText={errors.fullName && errors.fullName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    error={errors.birthdate ? true : false}
                    name="birthdate"
                    as={TextField}
                    label="Birthday"
                    variant="outlined"
                    fullWidth
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    helperText={errors.birthdate && errors.birthdate}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    error={errors.age ? true : false}
                    name="age"
                    as={TextField}
                    label="Age"
                    variant="outlined"
                    fullWidth
                    type="number"
                    helperText={errors.age && errors.age}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    error={errors.roleId ? true : false}
                    name="roleId"
                    as={TextField}
                    label="Role Id"
                    variant="outlined"
                    fullWidth
                    type="number"
                    helperText={errors.roleId && errors.roleId}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    disabled={isSubmitting}
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Create
                  </Button>
                </Grid>
              </Grid>

              <pre>{JSON.stringify(values, null, 4)}</pre>
            </Form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};

export default UserForm;
