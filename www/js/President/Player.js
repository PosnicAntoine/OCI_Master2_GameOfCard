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
        var space_between_card = GLOBAL_SPACING_SIZE + ((MAX_CARD_IN_HAND - nbCard) / MAX_CARD_IN_HAND) * card_width; 
        //console.log("Updating card positions => nbCard : " + nbCard + " | space : " + space_between_card);
        for(var i = 0; i < cards.length; i++){
            $(cards[i]).css('left', actualIndex * space_between_card);
            actualIndex++;
            //console.log("card : ", $(cards[i]));
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

    UpdateHandWithActualCards(){
        this.hand.empty();
        for(var i = 0; i < this.cards.length; i++){
            this.hand.append(this.cards[i].carteToHtml());
        }
        this.UpdateCardPositionInHand();
    }

    SortHand(){
        this.cards = this.cards.sort(function (a, b) {
            var A_value = a.GetValue();
            var B_value = b.GetValue();
            console.log("values to compare => A_v : " + A_value + " | B_v : " + B_value);
            if(A_value == 2){
                return 1;
            }
            if(B_value == 2){
                return -1;
            }
            if(A_value == 1){
                return 1;
            }
            if(B_value == 1){
                return -1;
            }
            if(A_value >= B_value)
                return 1;
            else
                return -1;
        });
        this.UpdateHandWithActualCards();
    }

}