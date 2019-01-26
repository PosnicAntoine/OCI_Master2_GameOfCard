var DEFAULT_API_KEY = "lwjd5qra8257b9";

class ClientPeerManager{
    constructor(idHost, previousPageMethod, activatePlayerMethod, deactivatePlayerMethod, selectPlayerMethod){
        this.conn;
        this.actualPlayer;
        this.PreviousPage = previousPageMethod;
        this.ActivatePlayer = activatePlayerMethod;
        this.DeactivatePlayer = deactivatePlayerMethod;
        this.SelectPlayer = selectPlayerMethod;
        this.peer = new Peer({key: DEFAULT_API_KEY}); //default key : lwjd5qra8257b9
        this.peer.on('open', (id) =>{
            console.log('My peer ID is: ' + id.substring(0, PRESIDENT_LOBBY_CODE_LENGTH));
            this.conn = this.peer.connect(idHost + '0000');
            console.log("Trying to connect to : " + idHost, this.conn);
            this.conn.on('open', ()=>{
                console.log("OPEN CONNECTION (CONNECT)");
                // 
                this.conn.on('data', (data)=>{
                    this.receiveNewMessageFromHost(data);
                })
            });
            
        });
        this.peer.on('error', (err)=>{
            console.log("Error while creating peer :", err);
            //this.PreviousPage();
        })
    }
    

    receiveNewMessageFromHost(message){
        console.log("Received messge : ", message);
        switch(message.type){
            case 'ASSIGNING_PLAYER_ON_CONNECT':
                this.actualPlayer = new Player(message.idPlayer);
                this.ActivatePlayer(message.idPlayer);
                //$("#squarecontainer>div:nth-child(" + this.actualPlayer.GetId() + ")").on("click", this.SelectPlayer(this.actualPlayer.GetId()));
                
                for(var i=0; i < message.otherIdPlayers.length;i++){
                    this.ActivatePlayer(message.otherIdPlayers[i]);
                }
                break;
            case 'NEW_PLAYER_CONNECTED':
                this.ActivatePlayer(message.idPlayer);
                break;
            case 'HOST_DECONNECTION':
                this.PreviousPage();
                // TODO !
                break;
            case 'OTHER_CLIENT_DISCONNECTED':
                this.DeactivatePlayer(message.idPlayer);
            default:
                console.log("don't know this message type : " + message.type);
                break;
        }
        //console.log("After received message :", this);
    }
    
    Disconnect(){
        if(this.actualPlayer != undefined){
            var DeconnectionMessage = {
                type: "CLIENT_DECONNECTION",
                idPlayer: this.actualPlayer.GetId()
            }
            this.conn.send(DeconnectionMessage);
        }
    }
}