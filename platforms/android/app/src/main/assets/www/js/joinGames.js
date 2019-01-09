$(window).on('load', init);

function init(evt){
    var jeuxvalue = window.location.search.substring(1);
    var jeu = jeuxvalue.substring(jeuxvalue.indexOf('=')+1);
    console.log("jeuxvalue :", jeu);

    $("#titleJoinGames").text(jeu);
<<<<<<< HEAD
=======


    switch(jeu) {
	  case "Picolo":
	    $('#Picolo').addClass("show");
	    break;
	  case "President":
	    $('#President').addClass("show");
	    break;
	  default:
	    $('#Picolo').addClass("show");
	    $('#President').addClass("show");
	}
>>>>>>> c6c589f38bdb40ea1c999909077b4f76784bf727
}