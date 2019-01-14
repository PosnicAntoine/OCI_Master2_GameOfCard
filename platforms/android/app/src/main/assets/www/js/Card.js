class Card{
    constructor(value,color){
        this.value = value;
        this.color = color;
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
            case 11 : ret = '<section class="card card--'+ this.color +'" value="J"><div class="card__inner card__inner--centered"><div class="card__column"><div class="jack"></div></div></div></section> '; break;
            case 12 : ret = '<section class="card card--'+ this.color +'" value="Q"><div class="card__inner card__inner--centered"><div class="card__column"><div class="queen"></div></div></div></section> '; break;
            case 13 : ret = '<section class="card card--'+ this.color +'" value="K"><div class="card__inner card__inner--centered"><div class="card__column"><div class="king"></div></div></div></section> '; break;
            case 1 : ret = '<section class="card card--'+ this.color +'" value="1"><div class="card__inner card__inner--centered"><div class="card__column"><div class="card__symbol ace"></div></div></div></section>'; break;
            default: ret = "DEFAULT_value : " + this.value; break;
        }
        //console.log("cardToHtml : " + ret);
        return ret;
    }
    carteToString(){
        return 'La carte est le '+ this.value+' de ' + this.color;
    }
}

