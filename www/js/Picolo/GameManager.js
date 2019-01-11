class GameManager{
    constructor(){
        this.deck = [];
        filldeck(deck);
        shuffle(deck);
    }
    filldeck(){
        for(var i=1 ;i<14 ;i++){
            var card1 = new Card(i,'heart');
            var card2 = new Card(i,'spade');
            var card3 = new Card(i,'diamond');
            var card4 = new Card(i,'club');
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
        return a;
     }
     shift(){
         return this.deck.shift();
     }

     switchCard(){
        var current = this.deck[0];
        shift();
        var element = document.getElementsByClassName("cards");
        element.innerHTML = current.carteToHtml();
     }  
}