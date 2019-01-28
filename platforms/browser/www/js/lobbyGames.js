$(window).on('load', init);

var PRESIDENT_LOBBY_CODE_LENGTH = 12;

var jeu;
var peer;

function init(evt){
    var isHost;
    var values = window.location.search.substring(1);
    if(values.indexOf('&') == -1){
      jeu = values.substring(values.indexOf("jeux=")+5);
      isHost = true;
    }else {
      jeu = values.substring(values.indexOf("jeux=")+5, values.indexOf("&lobbyCode"));
      var lobbyCode = values.substring(values.indexOf("&lobbyCode=") + 11).toUpperCase();
      isHost = lobbyCode.length == 0;
      console.log(isHost + " : code : " + lobbyCode);
    }
    //var isHostString = values.substring(values.indexOf("isHost=") + 7);
        
    console.log("jeu :", jeu);
    if(!isHost)
      console.log("lobbyCode :", lobbyCode.toLowerCase());
    //isHost = isHostString == 'true' ? true : false;
    //console.log("isHost :", isHost);

    $("#titleLobbyGames").text(jeu);
    if(!isHost){
      $("#codeLobby").text(lobbyCode);
      $("#codeLobbyMark").text(lobbyCode);
    }
    var methodDisplayGame;
    switch(jeu) {
	  case "President":
      $('#PresidentLobby').addClass("show");
      methodDisplayGame = displayPresidentGamePlate;
	    break;
	  default:
    }
    if(isHost){
        peer = new HostPeerManager(precedentPage, activatePlayer, deactivatePlayer, selectPlayer, methodDisplayGame);
    }else{
        peer = new ClientPeerManager(lobbyCode.toLowerCase(), precedentPage, activatePlayer, deactivatePlayer, selectPlayer, methodDisplayGame);
    }
    
    console.log("peer : ", peer);
}

function precedentPage(){
    peer.Disconnect();
    window.location.href = 'joinGames.html?jeux='+jeu;
}

function displayPresidentGamePlate(otherPlayersId, actualPlayerId){
  $('#PresidentLobby').remove();

  var PresidentHtml = "<div id='PresidentPlate'>"+ '\n';
  for(var i = 0; i < otherPlayersId.length; i++){
    PresidentHtml += "  <div id='playerhand_" + otherPlayersId[i] + "' class='other-player-hand'></div>" + '\n';
  }
    //PresidentHtml += "  <section id='deck' class='deck'></section>";
    PresidentHtml += "  <section id='tas' class='deck'></section>" + '\n';
    PresidentHtml += "  <div id='playerhand_" + actualPlayerId +"' 'class='player-hand'></div>" + '\n';
  PresidentHtml += "</div>" + '\n';

  $('body').append(PresidentHtml);
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