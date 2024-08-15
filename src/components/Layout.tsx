import { NavLink, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <nav>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/form-unctrld'>Uncontrolled Form</NavLink>
        <NavLink to='/form-hooked'>Hooked Form</NavLink>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
};

export default Layout;
