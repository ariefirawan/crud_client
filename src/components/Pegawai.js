import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import './pegawai.css';

const Pegawai = () => {
  const [peg, setPeg] = useState([]);
  const token = localStorage.getItem('token');
  const config = {
    Authorization: 'Bearer ' + token,
  };
  let navigate = useNavigate();

  useEffect(() => {
    const isAuth = localStorage.getItem('isAuth');
    if (!isAuth) {
      navigate('/');
    }
    getPeg();

    return () => !isAuth;
  }, [peg]);

  const getPeg = async () => {
    const pegawai = await axios.get('http://localhost:3001/api/', {
      headers: config,
    });
    setPeg(pegawai.data);
  };

  const deletePeg = (e, id) => {
    e.preventDefault();
    axios.delete(`http://localhost:3001/api/delete/${id}`);
  };

  return (
    <div>
      <div>
        <table id="tabel">
          <thead>
            <tr>
              <th>Aksi</th>
              <th>No</th>
              <th>Nama Pegawai</th>
              <th>Email</th>
              <th>Alamat</th>
              <th>Jabatan</th>
            </tr>
          </thead>
          <tbody>
            {peg &&
              peg.map((item, idx) => (
                <tr key={item.id_peg}>
                  <td width='200px'>
                    <Link className="aksi" to={`/view/${item.id_peg}`}>
                      View
                    </Link>
                    <Link className="aksi" to={`/edit/${item.id_peg}`}>
                      Edit
                    </Link>
                    <button
                      className="aksi"
                      onClick={(e) => deletePeg(e, item.id_peg)}
                    >
                      Delete
                    </button>
                  </td>
                  <td>{idx + 1}</td>
                  <td>{item.nama_peg}</td>
                  <td>{item.email}</td>
                  <td>{item.alamat}</td>
                  <td>{item.nama_jab}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Pegawai;
