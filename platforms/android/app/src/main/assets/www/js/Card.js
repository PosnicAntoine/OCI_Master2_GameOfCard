class Card{
    constructor(value,color){
        this.value = value;
        this.color = color;
    }

    GetColor(){
        return this.color;
    }

    GetValue(){
        return this.value;
    }

    ValueToChar(value){
        var ret = "null";
        switch(value){
            case 2 : ret = '2'; break;
            case 3 : ret = '3'; break;
            case 4 : ret = '4'; break;
            case 5 : ret = '5'; break;
            case 6 : ret = '6'; break;
            case 7 : ret = '7'; break;
            case 8 : ret = '8'; break;
            case 9 : ret = '9'; break;
            case 10 : ret = '10'; break;
            case 11 : ret = 'J'; break;
            case 12 : ret = 'Q'; break;
            case 13 : ret = 'K'; break;
            case 1 : ret = '1'; break;
            default: ret = value; break;
        }
        return ret;
    }

    carteToHtml(){
        var ret = "DEFAULT";
        switch(parseInt(this.value)){
            case 2 : ret = '<section class="card card--'+ this.color +'" value="2"><div class="card__inner card__inner--centered"><div class="card__column"><div class="card__symbol"></div><div class="card__symbol"></div> </div></div></section>'; break;
            case 3 : ret = '<section class="card card--'+ this.color +'" value="3"><div class="card__inner card__inner--centered">  <div class="card__column"><div class="card__symbol"></div><div class="card__symbol"></div> <div class="card__symbol"></div></div></div></section> '; break;
            case 4 : ret = '<section class="card card--'+ this.color +'" value="4"><div class="card__inner"> <div class="card__column"> <div class="card__symbol"></div> <div class="card__symbol"></div> </div> <div class="card__column"> <div class="card__symbol"></div> <div class="card__symbol"></div> </div> </div> </section>'; break;
            case 5 : ret = '<section class="card card--'+ this.color +'" value="5"><div class="card__inner"><div class="card__column"> <div class="card__symbol"></div><div class="card__symbol"></div></div><div class="card__column card__column--centered"><div class="card__symbol"></div></div><div class="card__column"><div class="card__symbol"></div><div class="card__symbol"></div></div></div></section>'; break;
            case 6 : ret = '<section class="card card--'+ this.color +'" value="6"><div class="card__inner"><div class="card__column"><div class="card__symbol"></div><div class="card__symbol"></div><div class="card__symbol"></div></div><div class="card__column"><div class="card__symbol"></div><div class="card__symbol"></div><div class="card__symbol"></div></div></div></section>'; break;
            case 7 : ret = '<section class="card card--'+ this.color +'" value="7"><div class="card__inner"><div class="card__column"><div class="card__symbol"></div><div class="card__symbol"></div><div class="card__symbol"></div></div><div class="card__column card__column--centered"><div class="card__symbol card__symbol--huge"></div></div><div class="card__column"><div class="card__symbol"></div><div class="card__symbol"></div><div class="card__symbol"></div></div></div></section>'; break;
            case 8 : ret = '<section class="card card--'+ this.color +'" value="8"><div class="card__inner"><div class="card__column"><div class="card__symbol"></div><div class="card__symbol"></div><div class="card__symbol"></div></div><div class="card__column card__column--centered"><div class="card__symbol card__symbol--big"></div><div class="card__symbol card__symbol--big"></div></div><div class="card__column"><div class="card__symbol"></div><div class="card__symbol"></div><div class="card__symbol"></div></div></div> </section>'; break;
            case 9 : ret = '<section class="card card--'+ this.color +'" value="9"><div class="card__inner"><div class="card__column"><div class="card__symbol"></div><div class="card__symbol"></div><div class="card__symbol card__symbol--rotated"></div><div class="card__symbol"></div></div><div class="card__column card__column--centered"><div class="card__symbol card__symbol"></div></div><div class="card__column"><div class="card__symbol"></div><div class="card__symbol"></div><div class="card__symbol card__symbol--rotated"></div><div class="card__symbol"></div></div></div></section>'; break;
            case 10 : ret = '<section class="card card--'+ this.color +'" value="10"><div class="card__inner"><div class="card__column"><div class="card__symbol"></div><div class="card__symbol"></div><div class="card__symbol card__symbol--rotated"></div><div class="card__symbol"></div></div><div class="card__column card__column--centered"><div class="card__symbol card__symbol--big"></div><div class="card__symbol card__symbol--big"></div></div><div class="card__column"><div class="card__symbol"></div><div class="card__symbol"></div><div class="card__symbol card__symbol--rotated"></div><div class="card__symbol"></div></div></div></section>'; break;
            case 11 : ret = '<section class="card card--'+ this.color +'" value="J"><div class="card__inner card__inner--centered"><div class="card__column"><div class="figure__symbol jack"></div></div></div></section> '; break;
            case 12 : ret = '<section class="card card--'+ this.color +'" value="Q"><div class="card__inner card__inner--centered"><div class="card__column"><div class="figure__symbol queen"></div></div></div></section> '; break;
            case 13 : ret = '<section class="card card--'+ this.color +'" value="K"><div class="card__inner card__inner--centered"><div class="card__column"><div class="figure__symbol king"></div></div></div></section> '; break;
            case 1 : ret = '<section class="card card--'+ this.color +'" value="1"><div class="card__inner card__inner--centered"><div class="card__column"><div class="card__symbol figure__symbol ace"></div></div></div></section>'; break;
            default: ret = "DEFAULT_value : " + this.value; break;
        }
        //console.log("cardToHtml : " + ret);
        return ret;
    }

    localCompare(card, useColor){
        var A_value = this.GetValue();
        var B_value = card.GetValue();
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
        if(A_value > B_value)
            return 1;
        else if(A_value == B_value){
            if(useColor){
                var A_color = this.GetColor();
                var B_color = card.GetColor();
                if(A_color.charCodeAt(0) > B_color.charCodeAt(0)){
                    return 1;
                }else if(A_color.charCodeAt(0) == B_color.charCodeAt(0)){
                    return 0;
                }else
                    return -1;
            }
            else
                return 1;
        }else
            return -1;
    }

    localCompareToValue(value){
        var A_value = this.GetValue();
        var B_value = value;
        //console.log("values to compare => A_v : " + A_value + " | B_v : " + B_value);
        if(B_value == 0){
            return 1;
        }
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
        if(A_value > B_value)
            return 1;
        else if(A_value == B_value)
            return 0;
        else
            return -1;
    }

    SelectorForCard(){
        var beginString = ".card.card--";
        return beginString+this.color+"[value="+this.ValueToChar(this.value)+"]";
    }

    OtherHand_CardToHtml(){
        return '<section class="card" value=""></section>';
    }

    carteToString(){
        return 'La carte est le '+ this.value+' de ' + this.color;
    }

    ToJson(){
        return {
            value: this.value,
            color: this.color
        };
    }
}

