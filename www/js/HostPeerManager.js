var DEFAULT_API_KEY = "lwjd5qra8257b9";

class HostPeerManager{
    constructor(jeu, activateLobbyMethod, previousPageMethod, activatePlayerMethod, deactivatePlayerMethod, selectPlayerMethod, displayGamePlateMethod){
        this.conn;
        this.actualPlayer;
        this.activateLobby = activateLobbyMethod;
        this.DisplayGamePlate = displayGamePlateMethod;
        this.peer = new Peer({key: DEFAULT_API_KEY});
        this.AliveConnections = [];
        this.nbConnection = 1;
        this.actualPlayer = new Player(1);
        this.PreviousPage = previousPageMethod;
        this.ActivatePlayer = activatePlayerMethod;
        this.DeactivatePlayer = deactivatePlayerMethod;
        this.SelectPlayer = selectPlayerMethod;
        this.ActivatePlayer(1);
        this.SelectPlayer(1);
        //console.log("#squarecontainer>div:nth-child(" + this.actualPlayer.GetId() + ")");
        //$("#squarecontainer>div:nth-child(" + this.actualPlayer.GetId() + ")").on("click", this.SelectPlayer(1));
        this.peer.on('open', (id) =>{
            console.log('My peer ID is: ' + id.substring(0, PRESIDENT_LOBBY_CODE_LENGTH));
            this.peer.on('connection', (newConnection) =>{
                console.log("Received connection : ",newConnection);
                this.handleNewConnection(newConnection);
            });

            var text = id.substring(0, PRESIDENT_LOBBY_CODE_LENGTH).toUpperCase();
            $("#codeLobby").text(text);
            $("#codeLobbyMark").text(text.substring(0, PRESIDENT_LOBBY_CODE_LENGTH));
            this.activateLobby(jeu);
        });
        this.peer.on('error', (err)=>{
            console.log("Error while creating peer :", err);
            this.PreviousPage();
        });
        window.addEventListener("beforeunload", function(e){
            this.Disconnect();
         }, false);

        this.StartGame = () =>{
            for(var i = 0; i < this.AliveConnections.length; i++){
                var playerId = this.AliveConnections[i].GetPlayerId();
                var StartGameMessage = {
                    type: "GAME_STARTING",
                    otherIdPlayers: this.returnPlayersListWithoutId(playerId)
                }
                this.AliveConnections[i].SendToPlayer(StartGameMessage);
            }
            var ownId = this.actualPlayer.GetId();
            this.DisplayGamePlate(this.returnPlayersListWithoutId(ownId), ownId);
            this.gameManager = new HostGameManager(this.returnPlayersListWithoutId(ownId), ownId, this);
        }

        $('#StartGameButton').on("click",this.StartGame);
    }
    
    handleNewConnection(newConnection){
        var newId = this.findSmallestIdPlayerAvailable();
        var newConnectionAndPlayer = new ConnectionAndPlayer(newConnection, newId);
        this.peer.connections[newId] = newConnection;
        this.peer.connections[newId].on('open', ()=>{
            //console.log("OPEN CONNECTION " + this.nbConnection + " (INIT)");
            //this.afterConnect();
            this.nbConnection++;
            var message = {
                type: "ASSIGNING_PLAYER_ON_CONNECT",
                idPlayer: newId,
                otherIdPlayers: this.returnPlayersListWithoutId(newId)
            }

            newConnection.send(message);
            newConnection.on('data', (data)=>{
                this.receiveNewMessageFromClient(data);
            });
            var messageToOthers = {
                type: "NEW_PLAYER_CONNECTED",
                idPlayer: newId
            }
            this.sendMessageToAll(messageToOthers);
            this.AliveConnections.push(newConnectionAndPlayer);
            this.ActivatePlayer(newId);
        });
        this.peer.connections[newId].on('error', (err)=>{
            console.log("ERROR WHILE CONNECTING to " + newId + " :" + err);
        });
    }

    handleDeconnection(idPlayerDisconnected){
        var connectionAndPlayer = this.getConnectionAndPlayersFromPlayerId(idPlayerDisconnected);
        if(connectionAndPlayer != null){
            this.nbConnection--;
            var idPlayer = connectionAndPlayer.GetPlayerId();
            this.DeactivatePlayer(idPlayer);
            var DisconnectionMessage = {
                type: "OTHER_CLIENT_DISCONNECTED",
                idPlayer: idPlayer
            }
            this.AliveConnections.splice($.inArray(connectionAndPlayer, this.AliveConnections),1);
            this.sendMessageToAll(DisconnectionMessage);
        }
    }

    PlayerHasPlayed(actualPlayer, playedCards, nextPlayer){
        var playedMessage = {
            type: "PLAYER_PLAYED",
            actualPlayer: actualPlayer.ToJson(),
            playedCards: this.CardArrayToJSON(playedCards),
            nextPlayer: nextPlayer.ToJson()
        }
        this.sendMessageToAll(playedMessage);
    }

    OtherPlayerHasPlayed(actualPlayerJson, playedCardsJson, nextPlayerJson){
        var playedMessage = {
            type: "PLAYER_PLAYED",
            actualPlayer: actualPlayerJson,
            playedCards: playedCardsJson,
            nextPlayer: nextPlayerJson
        }
        this.sendMessageToAllExcept(playedMessage, actualPlayer);
        this.gameManager.otherPlayerPlayedCards(actualPlayerJson, playedCardsJson, nextPlayerJson);
    }

    getConnectionAndPlayersFromPlayerId(idPlayer){
        if(idPlayer <= 0 || idPlayer > 8)
        {
            console.error("cannot do anything with this player id " + idPlayer);
            return null;
        }
        else if(idPlayer == 1){
            return this.actualPlayer;
        }
        else{
            for(var i = 0; i < this.AliveConnections.length; i++){
                if(this.AliveConnections[i].GetPlayerId() == idPlayer){
                    return this.AliveConnections[i];
                }
            }
        }
        console.log("Could not find anyone with this id : " + idPlayer);
        return null;
    }

    returnPlayersList(){
        var ret = [this.actualPlayer.id];
        for(var i = 0; i < this.AliveConnections.length; i++){
            ret.push(this.AliveConnections[i].player.id);
        }
        return ret;
    }

    returnPlayersListWithoutId(id){
        if(this.actualPlayer.id == id)
            var ret = [];
        else
            var ret = [this.actualPlayer.id];

        for(var i = 0; i < this.AliveConnections.length; i++){
            var idPlayer = this.AliveConnections[i].GetPlayerId();
            if(idPlayer != id)
                ret.push(idPlayer);
        }
        //console.log("player list wihtout " + id, ret);
        return ret;
    }

    receiveNewMessageFromClient(message){
        console.log("Received messge from Client : ", message);
        switch(message.type){
            case 'ASSIGNING_PLAYER_ON_CONNECT':
                this.actualPlayer = new Player(message.idPlayer);
                break;
            case 'CLIENT_DECONNECTION':
                this.handleDeconnection(message.idPlayer);
                break;
            case 'PLAYER_PLAYED':
                this.OtherPlayerHasPlayed(message.actualPlayer, message.playedCards, message.nextPlayer);
                break;
            default:
                console.log("don't know this message type : " + message.type);
                break;
        }
    }
    
    sendMessageToAllExcept(message, player){
        for(var i = 0; i < this.AliveConnections.length; i++){
            if(this.AliveConnections[i].GetPlayerId() != player.GetId())
                this.AliveConnections[i].SendToPlayer(message);
        }
    }

    sendMessageToAll(message){
        for(var i = 0; i < this.AliveConnections.length; i++){
            this.AliveConnections[i].SendToPlayer(message);
        }
    }
    
    findSmallestIdPlayerAvailable(){
        var ret = 2; // can't be 1, it's the host
        var boolFindOneWithThatId = true;
        while (boolFindOneWithThatId){
            boolFindOneWithThatId = false;
            //console.log(this, this.AliveConnections.length);
            for(var i = 0; i < this.AliveConnections.length; i++){
                console.log("Alive Connection : ", this.AliveConnections[i]);
                if(this.AliveConnections[i].GetPlayerId() == ret)
                    boolFindOneWithThatId = true;
            }
            if(boolFindOneWithThatId)
            {
                ret += 1;
                if(ret >= 9){
                    console.error("TOO MANY PLAYERS CAN't JOIN");
                    return null;
                }
            }
        }      
        return ret;
    }

    Disconnect(){
        var DeconnectionMessage = {
            type: "HOST_DECONNECTION"
        }
        this.sendMessageToAll(DeconnectionMessage);
    }

    PlayersToJson(players){
        var playersToJson = [];
        for(var i = 0; i < players.length; i++){
            playersToJson.push(players[i].ToJson());
        }
        return playersToJson;
    }

    CardArrayToJSON(cardArray){
        var ret = [];
        for(var i = 0; i < cardArray.length; i++){
            ret.push(cardArray[i].ToJson());
        }
        return ret;
    }

    SendCardsToAllPlayers(players){
        var playersToJson = this.PlayersToJson(players);
        console.log("playersToJson :", playersToJson);
        var messageAfterDistribution = {
            type: "DISTRIBUTION_OVER",
            players: playersToJson
        };

        this.sendMessageToAll(messageAfterDistribution);
    }

    SendTurnToPlayer(player){
        var playerJson = player.ToJson();
        var messageNewPlayerTurn = {
            type: "NEW_PLAYER_TURN",
            player: playerJson
        }
        this.sendMessageToAll(messageNewPlayerTurn);
    }
}

class ConnectionAndPlayer{

    constructor(connection, id){
        this.connection = connection;
        this.playerId = id;
    }

    SendToPlayer(message){
        this.connection.send(message);
    }

    GetPlayerId(){
        return this.playerId;
    }
}

/*
         // Receive
        this.peer.on('connection', (newConnection) =>{
            console.log("Received connection : ",newConnection);
            this.conn = newConnection;
            this.conn.on('open', ()=>{
                console.log("OPEN CONNECTION (INIT)");
                this.afterConnect();
            });
            this.conn.on('error', function(err){
                console.log("ERROR WHILE CONNECTING :", err);
            })
            //this.afterConnect();
        });
        this.peer.on('error', function(err) { 
            console.log("PEER_ERROR : ", error);
         });
    }

    connect(){
        var id = $("#inputIDfield").val();
        this.conn = this.peer.connect(id);
        console.log("Trying to connect to : " + id, this.conn);
        // on open will be launch when you successfully connect to PeerServer
        this.conn.on('open', ()=>{
            console.log("OPEN CONNECTION (CONNECT)");
            this.afterConnect();
        });

        //this.afterConnect();
    }

    afterConnect(){
        this.conn.on('data', function(data){
            // ADD new Message in #textfield
            console.log("Received message : " + data);
            $('#textfield').append(data);
        });
        this.conn.on("error" , function(err) {
            console.error("ERROR for Connection : ", err);
        });
        // here you have conn.id
        this.methodToCallAfterConnect();
        var ID_CONNECTION = this.conn.id;
        console.log("Opened new connection : " + ID_CONNECTION);
    }
    
    sendMessage(){
        var message = $("#inputMessagefield").val();
    
        console.log("sending message : " + message);
        $('#textfield').append(this.messageToHtml(message));
        this.conn.send(this.messageToHtml(message));
        $("#inputMessagefield").val('');
    }
    
    messageToHtml(message){
        return "<p>" + message + "</p></br>"
    }*/