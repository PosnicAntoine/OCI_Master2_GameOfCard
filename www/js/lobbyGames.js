$(window).on('load', init);

var PRESIDENT_LOBBY_CODE_LENGTH = 12;

var jeu;
var peer;

function init(evt){

    var values = window.location.search.substring(1);
    jeu = values.substring(values.indexOf("jeux=")+5, values.indexOf('&lobbyCode'));
    var lobbyCode = values.substring(values.indexOf("lobbyCode=") + 10, values.indexOf("lobbyCode=") + 10 + PRESIDENT_LOBBY_CODE_LENGTH).toUpperCase();
    var isHostString = values.substring(values.indexOf("isHost=") + 7);
        
    console.log("jeu :", jeu);
    console.log("lobbyCode :", lobbyCode.toLowerCase());
    var isHost = isHostString == 'true' ? true : false;
    console.log("isHost :", isHost);

    $("#titleLobbyGames").text(jeu);
    $("#codeLobby").text(lobbyCode);
    $("#codeLobbyMark").text(lobbyCode);

    switch(jeu) {
	  case "President":
	    $('#President').addClass("show");
	    break;
	  default:
    }
    if(isHost){
        peer = new HostPeerManager(lobbyCode.toLowerCase(), precedentPage, activatePlayer, deactivatePlayer, selectPlayer);
    }else{
        peer = new ClientPeerManager(lobbyCode.toLowerCase(), precedentPage, activatePlayer, deactivatePlayer, selectPlayer);
    }
    
    console.log("peer : ", peer);
}

function precedentPage(){
    peer.Disconnect();
    window.location.href = 'joinGames.html?jeux='+jeu;
}


function selectPlayer(player){
    var div = $("#squarecontainer>div:nth-child(" + player + ")");
    div.last().removeClass("hide");
}

function activatePlayer(player){
    var div = $("#squarecontainer>div:nth-child(" + player + ")");
    var text_color;
    switch(player) {
      case 1:
      text_color = "text-blue";
        break;
      case 2:
      text_color = "text-red";
        break;
      case 3:
      text_color = "text-green";
        break;
      case 4:
      text_color = "text-yellow";
        break;

      case 5:
      text_color = "text-purple";
        break;
      case 6:
      text_color = "text-orange";
        break;
      case 7:
      text_color = "text-pink";
        break;
      case 8:
      text_color = "text-brown";
        break;
      default:
      text_color = "text-dark-grey";
    }
    $(div).addClass(text_color);
    $(div).removeClass("text-dark-grey");
    $(div).children().first().addClass("fa-check-square");
    $(div).children().first().removeClass("fa-square-o");
}

function deactivatePlayer(player){
    var div = $("#squarecontainer>div:nth-child(" + player + ")");
    var text_color;
    switch(player) {
      case 1:
      text_color = "text-blue";
        break;
      case 2:
      text_color = "text-red";
        break;
      case 3:
      text_color = "text-green";
        break;
      case 4:
      text_color = "text-yellow";
        break;

      case 5:
      text_color = "text-purple";
        break;
      case 6:
      text_color = "text-orange";
        break;
      case 7:
      text_color = "text-pink";
        break;
      case 8:
      text_color = "text-brown";
        break;
      default:
      text_color = "text-dark-grey";
    }
    $(div).removeClass(text_color);
    $(div).addClass("text-dark-grey");
    $(div).children().first().removeClass("fa-check-square");
    $(div).children().first().addClass("fa-square-o");
}