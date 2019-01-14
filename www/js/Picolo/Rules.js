class Rules {
    constructor(title,text,value,color){
        this.title = title;
        this.value = value;
        this.text = text;
        this.color = color;
    }
    getRuleAndTitle(){
            return '<h3>'+ title +' :</h3><br></br><p>'+ text+'</p>';
        }
    }
