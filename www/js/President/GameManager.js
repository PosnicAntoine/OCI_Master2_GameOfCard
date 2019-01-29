class GameManager {
    constructor(playersId, localPlayerId, peerManager) {
        var players = [];
        for(var i = 0; i < playersId.length; i++){
            players[playersId[i]-1] = new Player(playersId[i], false);
        }
        this.localPlayer = new Player(localPlayerId, true);
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
    pass() {
        for (let i = 0; this.players.length; i++) {
            if (this.players[i].id == playing.id) {
                playing = players[i + 1];
                return;
            }
        }
    }
    play(cards) {
        if (cards.length != this.currentCardNumber) {
            let cartesnombre;
            let tailleTas = this.tas.length;
            switch (this.currentCardNumber) {
                case 1: cartesnombre = "simple"; break;
                case 2: cartesnombre = "double"; break;
                case 3: cartesnombre = "triplette"; break;
                case 4: cartesnombre = "quadruplette"; break;
            }
            return "Pas le bon nombre de carte, il faut jouer en " + cartesnombre;
        }
        else if (this.currentCardNumber > 1) {
            let current = cards[0].value;
            for (var i = 0; i < cards.length; i++) {
                if (current != cards[i].value) {
                    return "Tu ne peux pas jouer des cartes de valeurs différentes";
                }
            }
        }
        else if (cards[0].value < this.tas[tailleTas - 1]) {
            return "Tu ne peux pas jouer des cartes inférieures à celle posée sur le tas";
        }
        else{
            for(var i = 0; i < cards.length; i++){
                tas.push[cards[i]];
                if(this.playing.hand.length==0){
                    this.playing.rank=this.finishplayers;
                    finishplayers--;
                }
                this.pass();
            }
        }
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

    SetTurnTo(player){
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

