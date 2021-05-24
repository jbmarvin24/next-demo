import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  DateInput,
} from 'react-admin';

const EmployeeEdit = (props) => {
  return (
    <Edit title='Edit a Employee' {...props}>
      <SimpleForm>
        <NumberInput disabled source='id' />
        <TextInput source='name' />
        <NumberInput source='age' />
        <DateInput source='birthday' />
      </SimpleForm>
    </Edit>
  );
};

export default EmployeeEdit;
