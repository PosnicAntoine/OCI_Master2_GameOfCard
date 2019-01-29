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
    
    constructor(id, isLocalPlayer){
        this.cards = [];
        this.rank = RankEnum.Neutre;
        this.state = false;
        this.id = id;
        this.isLocalPlayer = isLocalPlayer;
        this.hand = $('#playerhand_' + this.id);
        this.SelectedCard = [];

        this.SelectCard = (evt) => {
            if(this.state){
                var cardHtml = evt.target;
                console.log("clicked card :", cardHtml);
                if($(cardHtml).hasClass("card__inner"))
                    cardHtml = $(cardHtml).parent();
                else if(!$(cardHtml).hasClass("card")){
                    console.error("Not a card : ", cardHtml);
                    return;
                }
                var card = this.cards[$(cardHtml).index()];
                if(card != undefined){
                    if($(cardHtml).hasClass("selected")){ // if already selected
                        this.SelectedCard.splice($.inArray(card, this.SelectedCard),1);
                        $(cardHtml).removeClass("selected");
                        $(cardHtml).draggable("disable");
                    }else{ // otherwise
                        this.SelectedCard.push(card);
                        $(cardHtml).addClass("selected");
                        $(cardHtml).draggable("enable");
                    }
                }
            }
        }
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

    TurnToThisPlayer(){
        this.state = true;
        
        this.SelectedCard = [];
        if(this.isLocalPlayer){
            var cards = this.hand.children();
            $("#tas").droppable({
                accept: cards,
                drop: this.OnCardDrop
            });
            for(var i = 0; i < cards.length; i++){
                $(cards[i]).draggable("disable");
            }
        }
    }

    EndTurn(){
        this.state = false;
        
        this.SelectedCard = [];
        if(this.isLocalPlayer){
            var cards = this.hand.children();
            $("#tas").droppable("disable");
            for(var i = 0; i < cards.length; i++){
                $(cards[i]).draggable("disable");
            }
        }
    }

    OnCardDrop(event, ui){
        console.log("Dropped :", ui);
    }

    GetCards(){
        return this.cards;
    }

    AddCard(card){
        this.cards.push(card);
        var cardHtml = this.isLocalPlayer ? card.carteToHtml() : card.OtherHand_CardToHtml();
        this.hand.append(cardHtml);
        if(this.isLocalPlayer){
            var lastChild = this.hand.children().last();
            lastChild.draggable();
            lastChild.on('click',this.SelectCard);
        }
        //this.hand.children().last().draggable();
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
            var cardHtml = this.isLocalPlayer ? this.cards[i].carteToHtml() : this.cards[i].OtherHand_CardToHtml();
            this.hand.append($(cardHtml));
            if(this.isLocalPlayer){
                var lastChild = this.hand.children().last();
                lastChild.draggable();
                lastChild.on('click',this.SelectCard);
            }
            //console.log("applying draggable and disable");
        }
        this.UpdateCardPositionInHand();
    }

    SortHand(){
        this.cards = this.cards.sort(function (a, b) {
            var A_value = a.GetValue();
            var B_value = b.GetValue();
            //console.log("values to compare => A_v : " + A_value + " | B_v : " + B_value);
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