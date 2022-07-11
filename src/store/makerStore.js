import { runInAction, observable  } from "mobx";

const makerStore = observable({
    cards : {}, 
    userId : '',

    createOrUpdateCard (card) {
        runInAction(() => {
            const updated = { ...this.cards };
            updated[card.id] = card; 
            this.cards = updated
        })
    },

    deleteCard (card) {
        runInAction(() => {
            const updated = { ...this.cards };
            delete updated[card.id] 
            this.cards = updated
        })
    },
    
    stopSync (cards) {
        this.cards = cards
    },

    
});

export { makerStore };

/*
[createOrUpdateCard]
현재 cards는 리스트가 아닌 오브젝트의 묶음으로 updated[card]를 통해 cards를 구성하는 개별 card에 접근할 수 있음. 개별 오브젝트는 id를 통해 구분됨으로 따라서 본 코드에서는 card.i(id는 개별카드를 구성하는 전체 정보를 포함)에 새로운 card를 적용시킴

[deleteCard]
createOrUpdateCard와 동일한 방식으로 동작
*/