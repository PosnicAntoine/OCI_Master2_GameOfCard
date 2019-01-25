class GameManager {
    constructor(players,localPlayer) {
        this.players = players;
        this.deck = [];
        this.tas = [];
        this.playing = players[0];
        this.currentNumber = 0;
        this.finishplayers=4;
        this.localPlayer=localPlayer;
        filldeck();
        shuffle();
        distribute();

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
    shuffle() {
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }
    distribute() {
        for (let i = 0; i < this.deck.length; i++) {
            let taker = i % this.players.length;
            this.players[taker].hand.push(this.deck[i]);
        }
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
        if (cards.length != this.currentNumber) {
            let cartesnombre;
            let tailleTas = this.tas.length;
            switch (this.currentNumber) {
                case 1: cartesnombre = "simple"; break;
                case 2: cartesnombre = "double"; break;
                case 3: cartesnombre = "triplette"; break;
                case 4: cartesnombre = "quadruplette"; break;
            }
            return "Pas le bon nombre de carte, il faut jouer en " + cartesnombre;
        }
        else if (this.currentNumber > 1) {
            let current = cards[0].value;
            for (let i = 0; i < cards.length; i++) {
                if (current != cards[i].value) {
                    return "Tu ne peux pas jouer des cartes de valeurs différentes";
                }
            }
        }
        else if (cards[0].value < this.tas[tailleTas - 1]) {
            return "Tu ne peux pas jouer des cartes inférieures à celle posée sur le tas";
        }
        else{
            for(let i=0;i<cards.length;i++){
                tas.push[cards[i]];
                if(this.playing.hand.length==0){
                    this.playing.rank=this.finishplayers;
                    finishplayers--;
                }
                pass();
            }
        }
    }
    getLastCardofTas(){
      this.tas[this.tas.length-1].carteToHtml();
    }
    htmloflocalplayer(){
        var rep = "";
        for(let i=0;i<this.localPlayer.hand.length;i++){
           rep+= this.localPlayer.hand[i].carteToHtml();
        }
        return rep;
    }

}

