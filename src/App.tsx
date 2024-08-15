import { Route, Routes } from 'react-router-dom';
import FormHooked from './components/FormHooked';
import FormUncontrolled from './components/FormUncontrolled';
import Home from './components/Home';
import Layout from './components/Layout';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />} errorElement={<div>Something went wrong!</div>}>
        <Route index element={<Home />} />
        <Route path='form-unctrld' element={<FormUncontrolled />} />
        <Route path='form-hooked' element={<FormHooked />} />
        <Route path='*' element={<>404</>} />
      </Route>
    </Routes>
  );
};

export default App;
