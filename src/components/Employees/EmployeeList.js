import {
  List,
  Datagrid,
  TextField,
  DateField,
  NumberField,
  EditButton,
  DeleteButton,
} from 'react-admin';

const EmployeeList = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <NumberField source='id' />
        <TextField source='name' />
        <NumberField source='age' />
        <DateField source='birthday' />
        <EditButton basePath='/employees' />
        <DeleteButton basePath='/employees' />
      </Datagrid>
    </List>
  );
};

export default EmployeeList;
