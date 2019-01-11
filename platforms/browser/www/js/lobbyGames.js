$(window).on('load', init);

var PRESIDENT_LOBBY_CODE_LENGTH = 4;


function init(evt){
    var values = window.location.search.substring(1);
    var jeu = values.substring(values.indexOf('=')+1,values.indexOf('&'));
    var lobbyCode = values.substring(values.indexOf('=', values.indexOf('&'))+1).toUpperCase();
   
    console.log("jeu :", jeu);
    console.log("lobbyCode :", lobbyCode);

    $("#titleLobbyGames").text(jeu);
    $("#codeLobby").text(lobbyCode);

    switch(jeu) {
	  case "President":
	    $('#President').addClass("show");
	    break;
	  default:
	}
}