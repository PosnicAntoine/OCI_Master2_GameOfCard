var DEFAULT_API_KEY = "lwjd5qra8257b9";

class PeerManager{
    constructor(isHost, idHost, previousPageMethod){
        this.isHost = isHost;
        this.conn;
        this.actualPlayer;
        if(this.isHost){
            this.peer = new Peer({id: idHost, key: DEFAULT_API_KEY});
            this.AliveConnections = {};
            this.nbConnection = 0;
            this.actualPlayer = new Player(1);
        }else{
            this.peer = new Peer({key: DEFAULT_API_KEY}); //default key : lwjd5qra8257b9
        }
        this.peer.on('open', (id) =>{
            console.log('My peer ID is: ' + id.substring(0, PRESIDENT_LOBBY_CODE_LENGTH));
            if(this.isHost){
                this.peer.on('connection', (newConnection) =>{
                    console.log("Received connection : ",newConnection);
                    this.handleNewConnection(newConnection);
                }); 
            }
            else{
                this.conn = this.peer.connect(idHost + '0000');
                console.log("Trying to connect to : " + idHost, this.conn);
                this.conn.on('open', ()=>{
                    console.log("OPEN CONNECTION (CONNECT)");
                    // 
                    this.conn.on('data', (data)=>{
                        this.receiveNewMessageFromHost(data);
                    })
                });
                
            }
            
        });
        this.peer.on('error', (err)=>{
            console.log("Error while creating peer :", err);
            //previousPageMethod();
        })
    }
    
    handleNewConnection(newConnection){
        var newId = this.findSmallestIdPlayerAvailable();
        var newConnectionAndPlayer = new ConnectionAndPlayer(newConnection, newId);
        this.AliveConnections.push(newConnectionAndPlayer);
        this.peer.connections[newId] = newConnection;
        this.peer.connections[newId].on('open', ()=>{
            //console.log("OPEN CONNECTION " + this.nbConnection + " (INIT)");
            //this.afterConnect();
            var message = {
                type: "ASSIGNING_PLAYER_ON_CONNECT",
                idPlayer: newId,
                otherPlayers: this.returnPlayersList()
            }
            this.peer.connections[newId].send(message);
        });
        this.peer.connections[newId].on('error', (err)=>{
            console.log("ERROR WHILE CONNECTING to " + newId + " :" + err);
        });
    }

    returnPlayersList(){
        var ret = [this.actualPlayer];
        this.AliveConnections.forEach(element, ()=>{
            ret.push(element.player);
        })
        return ret;
    }

    receiveNewMessageFromHost(message){
        console.log("Received messge : ", message);
        switch(message.type){
            case 'ASSIGNING_PLAYER_ON_CONNECT':
                this.actualPlayer = new Player(message.idPlayer);
                break;
            default:
                console.log("don't know this message type : " + message.type);
                break;
        }
        console.log("After received message :", this);
    }
    
    findSmallestIdPlayerAvailable(){
        var ret = 2; // can't be 1, it's the host
        var boolFindOneWithThatId = true;
        while (boolFindOneWithThatId){
            boolFindOneWithThatId = false;
            JQuery.each(this.AliveConnections, function(){
                if(this.GetPlayerId() == ret)
                    boolFindOneWithThatId = true;
            })
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

}

class ConnectionAndPlayer{
    constructor(connection, id){
        this.connection = connection;
        this.player = new Player(id);
    }

    GetPlayerId(){
        return this.player.GetId();
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