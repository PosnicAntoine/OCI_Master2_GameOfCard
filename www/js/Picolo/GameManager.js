var kingnumber = 0;
class GameManager{
    constructor(){
        this.deck = [];
        this.rules = [];
        this.filldeck();
        this.shuffle();
        this.createRules();
    }
    filldeck(){
        for(var i=1 ;i<14 ;i++){
            var card1 = new Card(i,'heart');
            var card3 = new Card(i,'diamond');
            var card2 = new Card(i,'spade');
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
     }
     
     switchCard(){

        var content = ""
        var element = $("#deck");
        

        if(this.deck.length > 0){
            var current = this.deck.shift();
            if(current.value == 13){
                if(kingnumber == 3){
                    content = current.carteToHtml();
                    var rulee = new Rules("Dernier roi", "Pas de bol, tu bois le verre du milieu",13,"blc");
                    content += rulee.getRuleAndTitle();
                }
                else{
                    kingnumber ++;
                    content = current.carteToHtml();
                    content += this.getRule(current);
                }
            }
            else{
                content = current.carteToHtml();
                content += this.getRule(current);
            }
        }
        else{
            kingnumber =0;
            this.filldeck();
            this.shuffle();
            content = "<img class = 'image' src='../../img/dos-bleu.png'>";
        }
        element.html(content);
     }  
     createRules(){
        var rule2diamond = new Rules('Cheh','Tu bois 2 gorg&eacutes',2,'diamond');
        var rule2heart = new Rules('Cheh','Tu bois 2 gorg&eacutes',2,'heart');
        var rule2spade = new Rules('Nice','Tu distribues 2 gorg&eacutes',2,'spade');
        var rule2club = new Rules('Nice','Tu distribues 2 gorg&eacutes',2,'club');
        var rule3diamond = new Rules('Cheh','Tu bois 3 gorg&eacutes',3,'diamond');
        var rule3heart = new Rules('Cheh','Tu bois 3 gorg&eacutes',3,'heart');
        var rule3spade = new Rules('Nice','Tu distribues 3 gorg&eacutes',3,'spade');
        var rule3club = new Rules('Nice','Tu distribues 3 gorg&eacutes',3,'club');
        var rule4diamond = new Rules('Cheh','Tu bois 4 gorg&eacutes',4,'diamond');
        var rule4heart = new Rules('Cheh','Tu bois 4 gorg&eacutes',4,'heart');
        var rule4spade = new Rules('Nice','Tu distribues 4 gorg&eacutes',4,'spade');
        var rule4club = new Rules('Nice','Tu distribues 4 gorg&eacutes',4,'club');
        this.rules.push(rule2diamond);
        this.rules.push(rule2spade);
        this.rules.push(rule2heart);
        this.rules.push(rule2club);
        this.rules.push(rule3diamond);
        this.rules.push(rule3spade);
        this.rules.push(rule3heart);
        this.rules.push(rule3club);
        this.rules.push(rule4diamond);
        this.rules.push(rule4spade);
        this.rules.push(rule4heart);
        this.rules.push(rule4club);
        var rule5;
        var rule6;
        var rule7;
        var rule8;
        var rule9;
        var rule10;
        var rule11;
        var rule12;
        var rule13;
        var rule1 = new Rules('Fontaine', 'Tout le monde commence a boire tant que le tireur de la carte n"arrête pas de boire, les autres doivent boire quand il a fini, celui de sa droite peut arreter, quand celui la a fini, celui a sa droite peut arreter, ainsi de suite.',1,'diamond');
        var rule12 = new Rules('Fontaine', 'Tout le monde commence a boire tant que le tireur de la carte n"arrête pas de boire, les autres doivent boire quand il a fini, celui de sa droite peut arreter, quand celui la a fini, celui a sa droite peut arreter, ainsi de suite.',1,'spade');
        var rule13 = new Rules('Fontaine', 'Tout le monde commence a boire tant que le tireur de la carte n"arrête pas de boire, les autres doivent boire quand il a fini, celui de sa droite peut arreter, quand celui la a fini, celui a sa droite peut arreter, ainsi de suite.',1,'heart');
        var rule14 = new Rules('Fontaine', 'Tout le monde commence a boire tant que le tireur de la carte n"arrête pas de boire, les autres doivent boire quand il a fini, celui de sa droite peut arreter, quand celui la a fini, celui a sa droite peut arreter, ainsi de suite.',1,'club');
        this.rules.push(rule1);
        this.rules.push(rule12);
        this.rules.push(rule13);
        this.rules.push(rule14);
        for(var i=0;i<4;i++){
            rule5 = new Rules('Regle', 'Creer une nouvelle regle li&eacute au jeu, elles se cumulent', 5 ,'blc');
            this.rules.push(rule5);
        }
        for(var i=0;i<4;i++){
            rule6 = new Rules('Main en bas', 'Le dernier a baisser la main bois',6,'blc');
            this.rules.push(rule6);
        }
        for(var i=0;i<4;i++){
            rule7 = new Rules('Main en haut', 'Le dernier a lever la main bois',7,'blc');
            this.rules.push(rule7);
        }
        for(var i=0;i<4;i++){
            rule8 = new Rules('Histoire', 'Le premier dis un mot, le deuxieme le repete et ajoute un mot et ainsi de suite',8,'blc');
            this.rules.push(rule8);
        }
        for(var i=0;i<4;i++){
            rule9 = new Rules('Thème', 'Tu choisis un theme (films, s&eacuteries, planètes) le premier qui n"a pas de réponse ou qui r&eacutepete bois',9,'blc');
            this.rules.push(rule9);
        }
        for(var i=0;i<4;i++){
            rule10 = new Rules('Bois avec un ami', 'Tu choisis un ami et tu bois une gorg&eacute avec',10,'blc');
            this.rules.push(rule10);
        }
        for(var i=0;i<4;i++){
            rule11 = new Rules('Roi des pouces', 'Le possesseur de la carte peut mettre son pouce ou il veut les autres doivent suivrent, le dernier bois ',11,'blc');
            this.rules.push(rule11);
        }
        for(var i=0;i<4;i++){
            rule12 = new Rules('MotherFucker', 'Lorsque le possesseur de la carte pose une question tout ceux qui ne repondent pas en commenceant par motherfucker boivent (l"ancien motherfucker perds son pouvoir)',12,'blc');
            this.rules.push(rule12);
        }
        for(var i=0;i<4;i++){
            rule13 = new Rules('King of the drink', 'Mets un peu de ton verre dans le verre central',13,'blc');
            this.rules.push(rule13);
        }
    }
     
     getRule(card){
         console.log(card);
         var value = card.value;
         var color = card.color;
         if(value < 5){
            for(var jia = 0 ; jia<this.rules.length;jia++) {
                console.log(this.rules[jia]);
                if(this.rules[jia].value == value){
                    if(this.rules[jia].color == color){
                        var retour =  this.rules[jia].getRuleAndTitle();
                        console.log("je suis passé par inferieur a 5");
                        console.log(retour);
                        return retour;
                    }
                }
             };
         }
         else{
            for(var ji = 0 ; ji<this.rules.length;ji++){
                if(this.rules[ji].value == value){
                        var retour =  this.rules[ji].getRuleAndTitle();
                        console.log("je suis passé par supérieur a 5");
                        console.log(retour);
                        return retour;
                }
             };
         }

     }

    }
