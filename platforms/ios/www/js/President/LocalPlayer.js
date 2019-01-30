class LocalPlayer extends Player{
    constructor(id, canPlayMethod, justPlayedMethod, passTurnMethod){
        super(id);
        this.hand.empty();
        this.hand.css({top: window.innerHeight - 100, left:0})
        this.CanPlay = canPlayMethod;
        this.JustPlayed = justPlayedMethod;
        this.PassTurn = passTurnMethod;
        this.justDroppedCard = false;
        this.SelectedCard = [];

        this.OnBeginDrag = (event, ui) =>{
            this.justDroppedCard = false;
        }

        this.OnDrag = (event, ui) =>{
            var cardDragged = this.cards[$(ui.helper).index()];
            if(cardDragged != undefined){
                var tmpSelected = this.SelectedCard.slice();
                var actualcardPosition = $(ui.helper).position();
                //console.log("Acutal pos ", actualcardPosition);
                //console.log("ympslected bef:", tmpSelected);
                tmpSelected.splice($.inArray(cardDragged, tmpSelected),1); // we remove the card from selected
                //console.log("tmpslected aft:", tmpSelected);
                for(var i = 0; i < tmpSelected.length; i++){
                    var cardHtml = $(tmpSelected[i].SelectorForCard());
                    //console.log("cardHtml !", cardHtml, tmpSelected[i].SelectorForCard());
                    switch(i){
                        case 0: 
                            var offset = {top: actualcardPosition.top, left: actualcardPosition.left - this.ActualSpaceBetweenCard};
                            break;
                        case 1:
                            var offset = {top: actualcardPosition.top, left: actualcardPosition.left + this.ActualSpaceBetweenCard};
                            break;
                        case 2:
                            var offset = {top: actualcardPosition.top, left: actualcardPosition.left + 2 * this.ActualSpaceBetweenCard};
                            break;
                        default:
                        console.error("Should not be possible, can't have more than 4 cards value");
                            break;
                    }
                    $(cardHtml).css(offset);
                    //console.log("position after :", $(cardHtml).position(), offset);
                }
            }
        }

        this.OnEndDrag = (event, ui) =>{
            if(!this.justDroppedCard){
                var cardDragged = this.cards[$(ui.helper).index()];
                if(cardDragged != undefined){
                    var tmpSelected = this.SelectedCard.slice();
                    tmpSelected.splice($.inArray(cardDragged, tmpSelected),1); // we remove the card from selected
                    //console.log("tmpslected aft:", tmpSelected);
                    for(var i = 0; i < tmpSelected.length; i++){
                        var cardHtml = $(tmpSelected[i].SelectorForCard());
                        var offset = {top: -60, left: this.ActualSpaceBetweenCard * $(cardHtml).index()}
                        $(cardHtml).css(offset);
                    }
                }
            }
        }
    
        this.SelectCard = (evt) => {
            if(this.state){
                var cardHtml = evt.target;
                console.log("clicked card :", cardHtml);
                if($(cardHtml).hasClass("card__inner"))
                    cardHtml = $(cardHtml).parent();
                else if(!$(cardHtml).hasClass("card")){
                    if($(cardHtml).hasClass("card__column")){
                        cardHtml = $(cardHtml).parent().parent();
                    }else if($(cardHtml).hasClass("figure__symbol") || $(cardHtml).hasClass("card__symbol")){
                        cardHtml = $(cardHtml).parent().parent().parent();
                    }else{
                        console.error("Not a card : ", cardHtml);
                        return;
                    }
                }
                var card = this.cards[$(cardHtml).index()];
                if(card != undefined && $(cardHtml).hasClass("selectable")){
                    if($(cardHtml).hasClass("selected")){ // if already selected
                        this.SelectedCard.splice($.inArray(card, this.SelectedCard),1);
                        $(cardHtml).removeClass("selected");
                        //console.log("actualPosition ", $(cardHtml).position());
                        var actualOffsetLeft = $(cardHtml).position().left;
                        $(cardHtml).css({top: '0px', left: actualOffsetLeft});
                        $(cardHtml).draggable({
                            disabled: true
                        });
                    }else{ // otherwise
                        if(this.SelectedCard.length < 1){ // if first selected
                            this.SelectedCard.push(card);
                            $(cardHtml).addClass("selected");
                            var actualOffsetLeft = $(cardHtml).position().left;
                            $(cardHtml).css({top: '-60px', left: actualOffsetLeft});
                            $(cardHtml).draggable({
                                disabled: false,
                                revert: "invalid",
                                drag: this.OnDrag,
                                stop: this.OnEndDrag

                            });
                        }else{
                            var valueSelected = this.SelectedCard[0].GetValue();
                            if(card.GetValue() == valueSelected){
                                this.SelectedCard.push(card);
                                $(cardHtml).addClass("selected");
                                var actualOffsetLeft = $(cardHtml).position().left;
                                $(cardHtml).css({top: '-60px', left: actualOffsetLeft});
                                $(cardHtml).draggable({
                                    disabled: false,
                                    revert: "invalid",
                                    drag: this.OnDrag,
                                    stop: this.OnEndDrag
                                });
                            }else{
                                //TODO animation can't select
                                console.log("can't select this card, not same value as previously selected cards");
                            }
                        }
                        
                    }
                }
            }

        }

        this.OnCardDrop = (event, ui)=>{
            console.log("dropped !", this.CanPlay(this.SelectedCard));
            if(this.CanPlay(this.SelectedCard)){ // if you're allowed to play those cards
            this.justDroppedCard = true;
            for(var i = 0; i < this.SelectedCard.length; i++){
                var cardHtml = $(this.SelectedCard[i].SelectorForCard());
                $(cardHtml).remove();
                this.cards.splice($.inArray(this.SelectedCard[i], this.cards), 1); // remove card from owned cards
            }
            this.UpdateCardPositionInHand();
            this.JustPlayed(this.SelectedCard);
            }
            
        }
    }

    TurnToThisPlayer(lastValuePlaced){
        super.TurnToThisPlayer(lastValuePlaced);
                
        this.SelectedCard = [];
        var cards = this.hand.children();
        $("#tas").droppable({
            disabled: false,
            accept: cards,
            drop: this.OnCardDrop
        });
        for(var i = 0; i < cards.length; i++){
            $(cards[i]).draggable("disable");
            var card = this.cards[$(cards[i]).index()];
            if(card.localCompareToValue(lastValuePlaced)>=0){
                $(cards[i]).addClass("selectable");
            }
        }
    }

    SetCardsFromJSON(cards){
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

    AddCard(card){
        this.cards.push(card);
        this.hand.append(card.carteToHtml());
        var lastChild = this.hand.children().last();
        lastChild.draggable();
        lastChild.on('click',this.SelectCard);
    }

    UpdateHandWithActualCards(){
        this.hand.empty();
        for(var i = 0; i < this.cards.length; i++){
            this.hand.append(this.cards[i].carteToHtml());
            var lastChild = this.hand.children().last();
            lastChild.draggable();
            lastChild.on('click',this.SelectCard);
        }
        this.UpdateCardPositionInHand();
    }

    EndTurn(){
        super.EndTurn();
        
        var cards = this.hand.children();
        $("#tas").droppable("disable");
        for(var i = 0; i < cards.length; i++){
            $(cards[i]).draggable("disable");
            $(cards[i]).removeClass("selectable");
        }
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

    SortHand(){
        this.cards = this.cards.sort(function (a, b) {
            return a.localCompare(b); // method Card.localCompare(card);
        });
        this.UpdateHandWithActualCards();
    }
}