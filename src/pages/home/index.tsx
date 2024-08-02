import { Button, Card, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './index.module.css';


function Home() {
  return (
    <main className={styles.main}>
    <div className={styles.containerMain}>
      <Card variant="outlined" className={styles.card}>
        {/* <Image
          src={swim}
          className={styles.cardImg}
          alt="Picture of the author"
        /> */}
        <form className={styles.form}>
          <Typography variant="h4">
            Faça login
          </Typography>
          <TextField
            id="standard-basic"
            label="Email"
            name="email"
            required
            variant="standard" />
          <TextField
            id="standard-password-input"
            label="Senha"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            variant="standard"
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