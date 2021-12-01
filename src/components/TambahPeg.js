import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import './tambahpeg.css';

const initialState = {
  nama_peg: '',
  email: '',
  alamat: '',
  id_jab: '1',
};

const TambahPeg = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState(initialState);
  const { nama_peg, email, alamat, id_jab } = form;
  const token = localStorage.getItem('token');
  const config = {
    Authorization: 'Bearer ' + token,
  };
  const isAuth = localStorage.getItem('isAuth');

  useEffect(() => {
    if (isAuth === null) {
      navigate('/');
    }
    if (id) {
      getPegawai(id);
    }
    return () => !isAuth;
  }, [id]);

  const getPegawai = async (id_peg) => {
    const pegawai = await axios.get(
      `http://localhost:3001/api/pegawai/${id_peg}`,
      { headers: config }
    );
    setForm({ ...pegawai.data[0] });
  };

  const addPegawai = async (data) => {
    await axios.post('http://localhost:3001/api/add', data, {
      headers: config,
    });
    navigate('/home');
  };

  const updatePegawai = async (data) => {
    await axios
      .patch(`http://localhost:3001/api/update/${id}`, data, {
        headers: config,
      })
      .then((res) => navigate('/home'));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      updatePegawai(form);
    } else {
      addPegawai(form);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <label>Nama</label>
          <input
            type="text"
            name="nama_peg"
            value={nama_peg}
            onChange={handleChange}
          />
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
          <label>Alamat</label>
          <input
            type="text"
            name="alamat"
            value={alamat}
            onChange={handleChange}
          />
          <label>Jabatan</label>
          <select name="id_jab" id="jab" value={id_jab} onChange={handleChange}>
            <option value="1">Prakom</option>
            <option value="2">Administrator DB</option>
            <option value="3">Ahli Pranata Komputer</option>
            <option value="4">Terampil Prakom</option>
          </select>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default TambahPeg;
