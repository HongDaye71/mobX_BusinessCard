import { runInAction, observable  } from "mobx";

const loginStore = observable({
    id : '',

    createOrUpdateCard (card) {
        runInAction(() => {
            const updated = { ...this.cards };
            updated[card.id] = card; 
            this.cards = updated
        })
    },

    setLoginStore (event) {
        runInAction(() => {
            this.id = event
        })
    },

});

export { loginStore };