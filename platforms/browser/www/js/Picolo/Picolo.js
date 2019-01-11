//require("./GameManager");

$(window).on('load', init);

var gameManager;
function init(evt){
    gameManager = new GameManager();
    $("#deck").on('click', function(){
        gameManager.switchCard();
    });
}