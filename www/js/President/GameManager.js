class GameManager {
    constructor(playersId, localPlayerId, peerManager) {
        
        this.PassActualPlayerTurn = ()=>{
            var actualPlayerid = this.playing.GetId();
            this.playing = this.players[actualPlayerid % this.players.length];
        }
    
        this.CanActualPlayThat = (playedCards)=>{
            console.log("canPlay ? :" + this.currentCardNumber);
            if(this.currentCardNumber != 0){ // if there are already played cards
                if (this.currentCardNumber != playedCards.length){
                    return false;
                }
                else{
                   return playedCards[0].localCompare(this.tas[this.tas.length-1]) >= 0 //if played cards values are greater than last card on the tas
                }
            }else{
                return true;
            }
        }
    
        this.ActualPlayerPlayed = (playedCards)=>{
            if(this.CanActualPlayThat(playedCards)){
                if(this.tas.length == 0){ // if first cards of the tas
                    this.currentCardNumber = playedCards.length;
                }
                this.tas.push(playedCards);
                for(var i = 0; i < playedCards.length; i++){
                    $("#tas").append(playedCards[i].carteToHtml());
                    $("#tas " +playedCards[i].SelectorForCard()).css({top:0, left: i * GLOBAL_SPACING_SIZE});
                }
                this.peerManager.PlayerHasPlayed(this.playing, playedCards, this.GetNextPlayer());
                this.SetTurnTo(this.GetNextPlayer());
            }
        }
        
        var players = [];
        for(var i = 0; i < playersId.length; i++){
            players[playersId[i]-1] = new Player(playersId[i]);
        }
        this.localPlayer = new LocalPlayer(localPlayerId, this.CanActualPlayThat, this.ActualPlayerPlayed, this.PassActualPlayerTurn);
        players[localPlayerId-1] = this.localPlayer;
        this.peerManager = peerManager;
        this.players = players;
        //console.log("players :", this.players);
        this.deck = [];
        this.tas = [];
        this.playing = this.players[0];
        this.currentCardNumber = 0;
        this.finishplayers = 4;
    }

    otherPlayerPlayedCards(playerJson, playedCardsJson, nextPlayerJson){
        this.players[playerJson.id - 1].RemoveThoseCardFromDeck(playedCardsJson);
        if(this.tas.length == 0){ // if first cards of the tas
            this.currentCardNumber = playedCardsJson.length;
        }
        var playedCards = [];
        for(var j = 0; j < playedCardsJson.length; j++){
            playedCards.push(new Card(playedCardsJson[j].value, playedCardsJson[j].color));
        }
        this.tas.push(playedCards);
        for(var i = 0; i < playedCards.length; i++){
            $("#tas").append(playedCards[i].carteToHtml());
            $("#tas " +playedCards[i].SelectorForCard()).css({top:0, left: i * GLOBAL_SPACING_SIZE});
        }
        this.SetTurnTo(this.players[nextPlayerJson.id -1]);
    }

    getLastCardofTas(){
      this.tas[this.tas.length-1].carteToHtml();
    }

    htmloflocalplayer(){
        var rep = "";
        for(let i=0;i<this.localPlayer.hand.length;i++){
           rep += this.localPlayer.hand[i].carteToHtml();
        }
        return rep;
    }

    SetPlayersCard(playersJson){
        for(var i = 0; i < playersJson.length; i++){
            this.players[playersJson[i].id-1].SetCards(playersJson[i].cards);
        }
        this.SetTurnToNobody();
    }

    GetNextPlayer(){
        var actualPlayerid = this.playing.GetId();
        return this.players[actualPlayerid % this.players.length];
    }

    SetTurnTo(player){
        if(player != this.playing){
            this.playing.EndTurn();
        }
        this.playing = player;
        this.playing.TurnToThisPlayer();
    }

    SetTurnToNobody(){
        this.localPlayer.EndTurn();
    }

    ResetAllPlayersHandCardsPosition(){
        for(var i = 0; i < this.players.length; i++){
            this.players[i].SortHand();
        }
    }

    GetPlayerFromJson(playerJson){
        var index_player = playerJson.id;
        return this.players[index_player -1];
    }

    PlayerGetCard(idPlayer, card){
        //console.log(idPlayer + " :", this.players[idPlayer]);
        this.players[idPlayer].AddCard(card);
    }
}

