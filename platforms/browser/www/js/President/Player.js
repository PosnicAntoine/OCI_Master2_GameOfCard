var RankEnum = {
    Trouduc: 0,
    ViceTrou: 1,
    Neutre: 2,
    VicePres: 3,
    President: 4
};

var GLOBAL_SPACING_SIZE = 24;
var MAX_CARD_IN_HAND = 26;


class Player{
    
    constructor(id){
        this.cards = [];
        this.rank = RankEnum.Neutre;
        this.state = false;
        this.id = id;
        this.hand = $('#playerhand_' + this.id);
        this.ActualSpaceBetweenCard = GLOBAL_SPACING_SIZE;

    }

    
    SetCards(cards){
        this.cards = [];
        for(var i = 0; i < cards.length; i++){
            this.AddCard(new Card(cards[i].value, cards[i].color));
        }
        this.SortHand();
    }

    UpdateCardPositionInHand(){
        var cards = this.hand.children();
        var nbCard = cards.length;
        var actualIndex = 0;
        var card_width = cards.first().width();
        this.ActualSpaceBetweenCard = GLOBAL_SPACING_SIZE + ((MAX_CARD_IN_HAND - nbCard) / MAX_CARD_IN_HAND) * card_width; 
        //console.log("Updating card positions => nbCard : " + nbCard + " | space : " + space_between_card);
        for(var i = 0; i < cards.length; i++){
            $(cards[i]).css('left', actualIndex * this.ActualSpaceBetweenCard);
            actualIndex++;
            //console.log("card : ", $(cards[i]));
        }
    }

    TurnToThisPlayer(){
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
        this.hand.append(card.OtherHand_CardToHtml());
    }

    RemoveThoseCardFromDeck(cardsToRemove){
        for(var i = 0; i < cardsToRemove.length; i++)
            this.RemoveCardFromJson(cardsToRemove[i]);
        
        this.UpdateCardPositionInHand();
    }

    RemoveCardFromJson(cardToRemoveJson){
        var cardToRemove = new Card(cardToRemoveJson.value, cardToRemoveJson.color);
        for(var i = 0; i < this.cards.length; i++){
            if(this.cards[i].localCompare(cardToRemove) == 0){ // if same card
                var cardHtml = $("#playerhand_" + this.id + " " + cardToRemove.SelectorForCard());
                $(cardHtml).remove();
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
        this.hand.empty();
        for(var i = 0; i < this.cards.length; i++){
            this.hand.append(this.cards[i].OtherHand_CardToHtml());
        }
        this.UpdateCardPositionInHand();
    }

    SortHand(){
        this.cards = this.cards.sort(function (a, b) {
            return a.localCompare(b); // method Card.localCompare(card);
        });
        this.UpdateHandWithActualCards();
    }

}