import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import EmployeeList from './Employees/EmployeeList';
import EmployeeCreate from './Employees/EmployeeCreate';
import EmployeeEdit from './Employees/EmployeeEdit';
import authProvider from '../authProvider';

const dataProvider = jsonServerProvider('http://localhost:5000');

const ReactAdmin = () => {
  return (
    <Admin dataProvider={dataProvider} authProvider={authProvider}>
      <Resource
        name='employees'
        list={EmployeeList}
        create={EmployeeCreate}
        edit={EmployeeEdit}
      />
    </Admin>
  );
};

export default ReactAdmin;
