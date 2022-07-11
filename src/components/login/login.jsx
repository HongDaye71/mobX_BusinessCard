import React, { useEffect } from 'react';
import Footer from '../footer/footer';
import Header from '../header/header';
import styles from './login.module.css';
import { useNavigate } from 'react-router-dom';
import { useObserver  } from 'mobx-react';
import useStore from '../../store/store';

const Login = ({ authService }) => {
  const { loginStore } = useStore();
  const navigate = useNavigate();

  const goToMaker = (userId) => {
    navigate(
      '/maker', 
      loginStore.setLoginStore(userId),)
  }

  useEffect(() => {
    authService.onAuthChange(
      user => {user && goToMaker(user.id) 
    })
  })

  const onLogin = event => {
    authService
      .login(event.currentTarget.textContent)
      .then(data => goToMaker(data.user.uid));
  };
  
  return useObserver(() => (
    <section className={styles.login}>
      <Header />
      <section>
        <h1>Login</h1>
        <ul className={styles.list}>
          <li className={styles.item}>
            <button className={styles.button} onClick={onLogin}>
              Google
            </button>
          </li>
          <li className={styles.item}>
            <button className={styles.button} onClick={onLogin}>
              Github
            </button>
          </li>
        </ul>
      </section>
      <Footer />

    </section>
  ));
};

export default Login;
