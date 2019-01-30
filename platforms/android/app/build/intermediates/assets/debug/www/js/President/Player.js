var RankEnum = {
    Trouduc: 0,
    ViceTrou: 1,
    Neutre: 2,
    VicePres: 3,
    President: 4
};

var GLOBAL_SPACING_SIZE = 24;
var MAX_CARD_IN_HAND = 26;

var positions = [{top: 50, left: 100}, {top: 50, left: 250},{top: 50, left: 400}, {top: 50, left: 550}, {top: 50, left: 700}, {top: 50, left: 850}, {top: 50, left: 100}, {top: 50, left: 250}]
var colors = ["blue", "red", "green", "yellow", "purple", "orange", "pink", "brown"];


class Player{
    
    constructor(id){
        this.cards = [];
        this.rank = RankEnum.Neutre;
        this.state = false;
        this.id = id;
        this.hand = $('#playerhand_' + this.id);
        this.ActualSpaceBetweenCard = GLOBAL_SPACING_SIZE;
        this.hand.append("<section class='displayNbCard text-" + colors[id-1] + "' value='0'></section>");
        this.nbCardTxt = $("#playerhand_" + this.id + " .displayNbCard");
        this.hand.css(positions[id-1]);
    }

    
    SetCardsFromJSON(cards){
        this.cards = [];
        for(var i = 0; i < cards.length; i++){
            this.AddCard(new Card(cards[i].value, cards[i].color));
        }
        this.nbCardTxt.text(cards.length);
    }

    TurnToThisPlayer(lastValuePlaced){
        this.state = true;
    }

    EndTurn(){
        this.state = false;
    }

    GetCards(){
        return this.cards;
    }

    AddCard(card){
        this.cards.push(card);
    }

    RemoveThoseCardFromDeck(cardsToRemove){
        for(var i = 0; i < cardsToRemove.length; i++)
            this.RemoveCardFromJson(cardsToRemove[i]);
        
        this.nbCardTxt.text(this.cards.length);
    }

    RemoveCardFromJson(cardToRemoveJson){
        var cardToRemove = new Card(cardToRemoveJson.value, cardToRemoveJson.color);
        for(var i = 0; i < this.cards.length; i++){
            if(this.cards[i].localCompare(cardToRemove) == 0){ // if same card
                this.cards.splice($.inArray(this.cards[i], this.cards), 1);
            }
        }
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

    UpdateHandWithActualCards(){
        this.nbCardTxt.text(this.cards.length);
    }

    SortHand(){
        this.cards = this.cards.sort(function (a, b) {
            return a.localCompare(b); // method Card.localCompare(card);
        });
        this.UpdateHandWithActualCards();
    }

}