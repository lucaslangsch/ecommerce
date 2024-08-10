import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { Button, Card, TextField, Typography } from '@mui/material';
import styles from './index.module.css';

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register({
        name: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
      });
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.containerMain}>
        <Card variant="outlined" className={styles.card}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <Typography variant="h4">
              Preencha seus dados para se cadastrar
            </Typography>
            <TextField
              id="standard-first-name-input"
              label="Primeiro nome"
              name="firstName"
              type="text"
              required
              variant="standard"
              onChange={handleChange}
            />
            <TextField
              id="standard-last-name-input"
              label="Sobrenome"
              name="lastName"
              type="text"
              required
              variant="standard"
              onChange={handleChange}
            />
            <TextField
              id="standard-basic"
              label="Email"
              name="email"
              required
              variant="standard"
              onChange={handleChange}/>
            <TextField
              id="standard-password-input"
              label="Senha"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              variant="standard"
              onChange={handleChange}
            />
            <Button variant="contained" type="submit">Registro</Button>
            <Typography variant="body1">
              Já possui cadastro?
              &nbsp;
              <Link to={"/"}>Login</Link>
            </Typography>
          </form>
        </Card>
      </div>
    </main>
  )
}

export default Register;