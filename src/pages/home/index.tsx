import { Button, Card, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './index.module.css';
import { useContext, useState } from 'react';
import AuthContext from '../../context/AuthContext';


function Home() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { login } = useContext(AuthContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({
        email: formData.email,
        password: formData.password
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className={styles.main}>
    <div className={styles.containerMain}>
      <Card variant="outlined" className={styles.card}>
        {/* <Image
          src={swim}
          className={styles.cardImg}
          alt="Picture of the author"
        /> */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <Typography variant="h4">
            Faça login
          </Typography>
          <TextField
            id="standard-basic"
            label="Email"
            name="email"
            required
            variant="standard"
            onChange={handleChange}
          />
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
          <Button variant="contained" type="submit">Login</Button>
          <Typography variant="body1">
            Não possui cadastro?
            &nbsp;
            <Link to={"/register"}>Registre-se</Link>
          </Typography>
        </form>
      </Card>
    </div>
  </main>
  )
}

export default Home;