$(window).on('load', init);


var PRESIDENT_LOBBY_CODE_LENGTH = 4;


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

function joinLobby(gameName){
	var code = $('#lobbyCodeInput').val();
	if(code.length == PRESIDENT_LOBBY_CODE_LENGTH)
		window.location.href = 'lobbyGames.html?jeux='+gameName+'&lobbyCode='+code;
}