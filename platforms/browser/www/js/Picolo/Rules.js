class Rules {
    constructor(title,text,value,color){
        this.title = title;
        this.value = value;
        this.text = text;
        this.color = color;
        console.log(this.title);
    }
    getRuleAndTitle(){
            return '<h3>'+ this.title +' :</h3><br></br><p>'+ this.text+'</p>';
        }
    }
