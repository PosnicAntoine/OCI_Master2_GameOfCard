$(window).on('load', init);


var PRESIDENT_LOBBY_CODE_LENGTH = 4;
var LOBBY_CODE_CHARS = "abcdefghijklmnopqrstuvwxyz0123456789";


/**
function lobbyCodeInputChange(){
	console.log("coucpouuu");
	if($('#lobbyCodeInput').val().length >= PRESIDENT_LOBBY_CODE_LENGTH){
		$('lobbyCodeButton').addClass("show");
	}
}
*/

function init(evt){
    var jeuxvalue = window.location.search.substring(1);
    var jeu = jeuxvalue.substring(jeuxvalue.indexOf('=')+1);
    console.log("jeuxvalue :", jeu);

    $("#titleJoinGames").text(jeu);


    switch(jeu) {
	  case "Picolo":
	    $('#Picolo').addClass("show");
	    break;
	  case "President":
	    $('#President').addClass("show");
	    break;
	  default:
	}

	$('#lobbyCodeInput').attr('maxlength',PRESIDENT_LOBBY_CODE_LENGTH);
	//$('#lobbyCodeInput').change(lobbyCodeInputChange());
}

function makeid() {
  var text = "";

  for (var i = 0; i < 4; i++)
    text += LOBBY_CODE_CHARS.charAt(Math.floor(Math.random() * LOBBY_CODE_CHARS.length));

  return text;
}

function createLobby(gameName){
	var code = makeid();
	console.log(code)
	if(code.length == PRESIDENT_LOBBY_CODE_LENGTH)
		window.location.href = 'lobbyGames.html?jeux='+gameName+'&lobbyCode='+code;
}

function joinLobby(gameName){
	var code = $('#lobbyCodeInput').val();
	if(code.length == PRESIDENT_LOBBY_CODE_LENGTH)
		window.location.href = 'lobbyGames.html?jeux='+gameName+'&lobbyCode='+code;
}