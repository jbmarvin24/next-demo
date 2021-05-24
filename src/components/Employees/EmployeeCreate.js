import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  DateInput,
} from 'react-admin';

const EmployeeCreate = (props) => {
  return (
    <Create title='Create a Employee' {...props}>
      <SimpleForm>
        <TextInput source='name' />
        <NumberInput source='age' />
        <DateInput source='birthday' />
      </SimpleForm>
    </Create>
  );
};

export default EmployeeCreate;
