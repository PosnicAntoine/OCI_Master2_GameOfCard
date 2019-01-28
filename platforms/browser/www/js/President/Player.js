var RankEnum = {
    Trouduc: 0,
    ViceTrou: 1,
    Neutre: 2,
    VicePres: 3,
    President: 4
};


class Player{
    
    constructor(id){
        this.cards = [];
        this.rank = RankEnum.Neutre;
        this.state = false;
        this.id = id;
        this.hand = $('#playerhand_' + this.id);
    }

    SetCards(cards){
        this.cards = [];
        for(var i = 0; i < cards.length; i++){
            this.AddCard(new Card(cards[i].value, cards[i].color));
        }
    }

    GetCards(){
        return this.cards;
    }

    AddCard(card){
        this.cards.push(card);
        this.hand.append(card.carteToHtml());
    }

    GetId(){
        return this.id;
    }

    CardsToJson(){
        var json = [];
        for(var i = 0; i < this.cards.length; i++){
            json.push(this.cards[i].ToJson());
        }
        return json;
    }

    ToJson(){
        return {
            id: this.id,
            rank: this.rank,
            cards: this.CardsToJson()
        }
    }

}

