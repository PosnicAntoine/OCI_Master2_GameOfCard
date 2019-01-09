$(window).on('load', init);

function init(evt){
    var jeuxvalue = window.location.search.substring(1);
    var jeu = jeuxvalue.substring(jeuxvalue.indexOf('=')+1);
    console.log("jeuxvalue :", jeu);

    $("#titleJoinGames").text(jeu);
}