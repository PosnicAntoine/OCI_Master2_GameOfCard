var RankEnum = {
    Trouduc: 0,
    ViceTrou: 1,
    Neutre: 2,
    VicePres: 3,
    President: 4
};


class Player{
    
    constructor(id){
        this.cards = [];
        this.rank = RankEnum.Neutre;
        this.state = false;
        this.id = id;
    }

    GetId(){
        return this.id;
    }

}

