$(window).on('load', init);

var PRESIDENT_LOBBY_CODE_LENGTH = 4;

var jeu;

function init(evt){
    var values = window.location.search.substring(1);
    jeu = values.substring(values.indexOf('=')+1,values.indexOf('&'));
    var lobbyCode = values.substring(values.indexOf('=', values.indexOf('&'))+1).toUpperCase();
   
    console.log("jeu :", jeu);
    console.log("lobbyCode :", lobbyCode);

    $("#titleLobbyGames").text(jeu);
    $("#codeLobby").text(lobbyCode);
    $("#codeLobbyMark").text(lobbyCode);

    switch(jeu) {
	  case "President":
	    $('#President').addClass("show");
	    break;
	  default:
	}

    selectPlayer(1);

    activatePlayer(1);
    activatePlayer(2);
    activatePlayer(3);
    activatePlayer(4);

    activatePlayer(5);
    activatePlayer(6);
    //activatePlayer(7);
    //activatePlayer(8);
}

function precedentPage(){
    window.location.href = 'joinGames.html?jeux='+jeu;
}


function selectPlayer(player){
    switch(player){
        case 1:
            $('#playerOne').addClass("grey");
            break;
        default:
    }
}

function activatePlayer(player){
    switch(player) {
      case 1:
        $('#playerOne').addClass("text-blue");
        $('#playerOne').removeClass("text-dark-grey");
        $('#playerOne>*').first().addClass("fa-check-square");
        $('#playerOne>*').first().removeClass("fa-square-o");
        break;
      case 2:
        $('#playerTwo').addClass("text-red");
        $('#playerTwo').removeClass("text-dark-grey");
        $('#playerTwo>*').first().addClass("fa-check-square");
        $('#playerTwo>*').first().removeClass("fa-square-o");
        break;
      case 3:
        $('#playerThree').addClass("text-green");
        $('#playerThree').removeClass("text-dark-grey");
        $('#playerThree>*').first().addClass("fa-check-square");
        $('#playerThree>*').first().removeClass("fa-square-o");
        break;
      case 4:
        $('#playerFour').addClass("text-yellow");
        $('#playerFour').removeClass("text-dark-grey");
        $('#playerFour>*').first().addClass("fa-check-square");
        $('#playerFour>*').first().removeClass("fa-square-o");
        break;

      case 5:
        $('#playerFive').addClass("text-purple");
        $('#playerFive').removeClass("text-dark-grey");
        $('#playerFive>*').first().addClass("fa-check-square");
        $('#playerFive>*').first().removeClass("fa-square-o");
        break;
      case 6:
        $('#playerSix').addClass("text-orange");
        $('#playerSix').removeClass("text-dark-grey");
        $('#playerSix>*').first().addClass("fa-check-square");
        $('#playerSix>*').first().removeClass("fa-square-o");
        break;
      case 7:
        $('#playerSeven').addClass("text-pink");
        $('#playerSeven').removeClass("text-dark-grey");
        $('#playerSeven>*').first().addClass("fa-check-square");
        $('#playerSeven>*').first().removeClass("fa-square-o");
        break;
      case 8:
        $('#playerEight').addClass("text-brown");
        $('#playerEight').removeClass("text-dark-grey");
        $('#playerEight>*').first().addClass("fa-check-square");
        $('#playerEight>*').first().removeClass("fa-square-o");
        break;
      default:
    }

}