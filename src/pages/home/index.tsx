import { Button, Card, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import styles from './index.module.css';
import { useContext, useRef } from 'react';
import AuthContext from '../../context/AuthContext';

function Home() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (emailRef?.current?.value && passwordRef?.current?.value) {
      try {
        await login({
          email: emailRef?.current?.value,
          password: passwordRef?.current?.value
        });
        navigate("/dashboard");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.containerMain}>
        <Card variant="outlined" className={styles.card}>
          <img src="/swim_01.jpg" alt="" className={styles.img} />
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
              inputRef={emailRef}
            />
            <TextField
              id="standard-password-input"
              label="Senha"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              variant="standard"
              inputRef={passwordRef}
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