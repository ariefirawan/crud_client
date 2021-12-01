import { Routes, Route } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/react-toastify.css';
import Header from './components/Header';
import Pegawai from './components/Pegawai';
import TambahPeg from './components/TambahPeg';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Pegawai />} />
        <Route path="/edit/:id" element={<TambahPeg />} />
        <Route path="/add" element={<TambahPeg />} />
      </Routes>
    </div>
  );
}

export default App;
