class HostGameManager extends GameManager{
    constructor(players,localPlayer, peerManager){
        super(players, localPlayer, peerManager);
        this.filldeck();
        this.shuffleDeck();
        this.distribute();
    }

    filldeck() {
        for (var i = 1; i < 14; i++) {
            var card1 = new Card(i, 'heart');
            var card3 = new Card(i, 'diamond');
            var card2 = new Card(i, 'spade');
            var card4 = new Card(i, 'club');
            this.deck.push(card1);
            this.deck.push(card2);
            this.deck.push(card3);
            this.deck.push(card4);
        }
    }
    shuffleDeck() {
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }
    distribute() {
        for (let i = 0; i < this.deck.length; i++) {
            let taker = i % this.players.length;
            this.PlayerGetCard(taker, this.deck[i]);
        }
        this.peerManager.SendCardsToAllPlayers(this.players);
        this.ResetAllPlayersHandCardsPosition();
        this.StartGame();
    }

    SetTurnTo(player){
        super.SetTurnTo(player);
        this.peerManager.SendTurnToPlayer(this.playing);
    }

    StartGame(){
        super.SetTurnToNobody();
        this.SetTurnTo(this.playing);
    }

    otherPlayerPlayedCards(playerJson, playedCardsJson, nextPlayerJson){
        super.otherPlayerPlayedCards(playerJson, playedCardsJson, nextPlayerJson);
    }
}