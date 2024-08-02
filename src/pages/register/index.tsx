import { Button, Card, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './index.module.css'

function Register() {
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
              Preencha seus dados para se cadastrar
            </Typography>
            <TextField
              id="standard-first-name-input"
              label="Primeiro nome"
              name="first-name"
              type="text"
              required
              variant="standard"
            />
            <TextField
              id="standard-last-name-input"
              label="Sobrenome"
              name="last-name"
              type="text"
              required
              variant="standard"
            />
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