import Header from '../header/header'
import Footer from '../footer/footer'
import React, { useEffect } from 'react';
import styles from './maker.module.css';
import { useNavigate } from 'react-router-dom';
import Editor from '../editor/editor';
import Preview from '../preview/preview';
import { useObserver  } from 'mobx-react';
import useStore from '../../store/store';

const Maker = ({ FileInput, authService, cardRepository }) => {
    const { makerStore } = useStore();
    const { loginStore } = useStore();

    const navigate = useNavigate();

    const onLogout = () => {
        authService.logout();
    };

    //DB출력(Mount 및 사용자 아이디 변경 시)
    useEffect(() => {
        authService.onAuthChange(
            //user정보가 남아있다면, logingStore의 id를 user.uid로 변경
            user => {user && loginStore.setLoginStore(user.uid)
            const stopSync = cardRepository.syncCards(loginStore.id, cards => {makerStore.stopSync(cards)})
            return () => stopSync();
          })
    }, [loginStore.id]);
    

    //동일 아이디의 DB출력(로그인 시)
    useEffect(() => {
        authService.onAuthChange(user => {
            if(user) {
                loginStore.setLoginStore(user.uid)
            } else {
                navigate('/');
            }
        });
    });

    return useObserver(() => (
    <section className={styles.maker}>
            <Header onLogout={onLogout}/>
            <div className={styles.container}>
                <Editor 
                    FileInput={FileInput}
                    cardRepository={cardRepository} />
                <Preview cards={makerStore.cards}/>
            </div>
            <Footer />
        </section>
    ))
}

export default Maker;