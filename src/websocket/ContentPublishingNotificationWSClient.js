import { io } from 'socket.io-client';
import { GENERAL_CONFIG } from 'easii-io-web-service-library';
import { WEBSOCKET_EVENT_SIGNATURES } from '../constants/WebSocketClient';
import history from '../routes/history';
import { notify } from '../components/Toast';

class ContentPublishingNotificationWSClient {
  constructor(userID = null, userName = null) {
    console.log('ContentPublishingNotificationWSClient is INITIALIZED !!!');
    this.userID = userID ? userID : null;
    this.userName = userName ? userName : null;
    this.contentID = null;
    this.notifiedMessage = null;
    this.contentChannelID = null;
    this.roomID = null;
    this.messageObject = null;
    this.socket = io(GENERAL_CONFIG.WEBSOCKET_ENDPOINT, {
      autoConnect: false,
    });
    this.socket.on('connect_error', (err) => {
      this.errorHandler(err);
      this.closeWebSocketClientInstance();
    });

    this.up.bind(this);
    this.onReceivingAForwardedMessageFromServer.bind(this);
    this.closeWebSocketClientInstance.bind(this);
  }

  errorHandler(message) {
    console.log('Something went wrong!');
    console.log(message);
  }

  onReceivingAForwardedMessageFromServer(roomID, messageObject) {
    console.log('ContentPublishingNotificationWSClient.onReceivingAForwardedMessageFromServer');
    console.log('RoomID: ', roomID);
    console.log('MessageObject: ', messageObject);
    notify('Your content item AAA has been posted to the Channel successfully!. Please click the following link to see its more detail'.concat(JSON.stringify(messageObject)),'success');
    // if (this.roomID === roomID) {
    //     notify('Your content item AAA has been posted to the Channel successfully!. Please click the following link to see its more detail'.concat(JSON.stringify(messageObject)),'success');
    // }
  }

  closeWebSocketClientInstance() {
    if (this.socket.connected) {
      this.socket.disconnect();
    }
    this.socket.close();
  }

  up() {
    try {
      this.roomID = ''
        .concat('AsyncPost_Notify_')
        .concat('UserID=')
        .concat(this.userID)
        .concat('UserName=')
        .concat(this.userName)
        .trim();

      this.messageObject = {
        userID: this.userID,
        userName: this.userName,
        contentID: this.contentID,
        contentChannelID: this.contentChannelID,
      };
      console.log('RoomID = ', this.roomID, '\n');
      console.log('Message = ', this.messageObject, '\n');
      // WS Client gets started a CONNECTION
      this.socket.connect();

      // Send server a signal to join room by a predefined {roomID}
      this.socket.emit(WEBSOCKET_EVENT_SIGNATURES.CPN_JOINING_ROOM, this.roomID);

      // WS Client EMIT an Event of PUSH_NOTIFICATION to REACT-APP
      this.socket.on(
        WEBSOCKET_EVENT_SIGNATURES.CPN_FORWARD_NOTIFICATION,
        this.onReceivingAForwardedMessageFromServer
      );
    } catch (ex) {
      this.errorHandler(ex);
      this.closeWebSocketClientInstance();
    }
    return this;
  }

  static __init(userID, userName) {
    return new ContentPublishingNotificationWSClient(userID, userName).up();
  }
}

export default ContentPublishingNotificationWSClient;
