import React from 'react';
import CardAddForm from '../card_add_form/card_add_form';
import Card_edit_form from '../card_edit_form/card_edit_form';
import styles from './editor.module.css'
import { useObserver  } from 'mobx-react';
import useStore from '../../store/store';

const Editor = ({ FileInput, cardRepository }) => {
    const { makerStore } = useStore();
    const { loginStore } = useStore();
    const cards = makerStore.cards;

    //카드생성 및 업데이트 
    const createOrUpdateCard = card => {
        makerStore.createOrUpdateCard(card);
        cardRepository.saveCard(loginStore.id, card); 
    }

    //카드삭제
    const deleteCard = card => {
        makerStore.deleteCard(card);
        cardRepository.removeCard(loginStore.id, card);
    }

    return useObserver(() => (
    <section className={styles.editor}>
        <h1 className={styles.title}>Card Maker</h1>
        {Object.keys(cards).map(key => (
            <Card_edit_form 
            key={key} 
            FileInput={FileInput}
            card={cards[key]} 
            updateCard={createOrUpdateCard} 
            deleteCard={deleteCard}/>
        ))}
        <CardAddForm 
            FileInput={FileInput} 
            cardRepository={cardRepository}/>
    </section>
    ))
}

export default Editor;