import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
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
  const { setAuth } = useContext(AuthContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password
        })
      });

      if (!response.ok) {
        throw new Error('Failed to register');
      }

      const data = await response.json();
      document.cookie = `token=${data.token};path=/;`;

      setAuth({ name: `${formData.firstName} ${formData.lastName}`, email: formData.email });

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