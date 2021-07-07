import { io } from 'socket.io-client';
import { GENERAL_CONFIG, AUTHORIZATION_KEY } from 'easii-io-web-service-library';
import { WEBSOCKET_EVENT_SIGNATURES } from '../constants/WebSocketClient';
import history from '../routes/history';
import { notify, notifyHTML } from '../components/Toast';

class ContentPublishingNotificationWSClient {
  constructor() {
    console.log('ContentPublishingNotificationWSClient.INITIALIZED !!!');
    this.isAuthenticated = localStorage.getItem('auth', false);
    this.userID = localStorage.getItem(AUTHORIZATION_KEY.MEMBER_ID, null);
    this.userName = localStorage.getItem(AUTHORIZATION_KEY.MEMBER_EMAIL, null);
    this.contentID = null;
    this.notifiedMessage = null;
    this.contentChannelID = null;
    this.roomID = null;
    this.messageObject = null;
    this.socket = null;
    this.classBindingHandler();
    this.isValidWSClient = this.isAuthenticated && this.userID && this.userName;
    if (this.isValidWSClient) {
      this.socketInitializationHandler();
    }
  }

  socketInitializationHandler() {
    console.log('ContentPublishingNotificationWSClient.socketInitializationHandler !!!');
    this.socket = io(GENERAL_CONFIG.WEBSOCKET_ENDPOINT, {
      autoConnect: false,
    });
    this.socket.on(WEBSOCKET_EVENT_SIGNATURES.CPN_ON_WEBSOCKET_ERROR, this.onSocketErrorHandler);
    if (!window.ContentPublishingNotificationWSClient) {
      window.ContentPublishingNotificationWSClient = this;
    }
  }

  classBindingHandler() {
    this.up.bind(this);
    this.onReceivingAForwardedMessageFromServer.bind(this);
    this.closeWebSocketClientInstance.bind(this);
    this.onSocketErrorHandler.bind(this);
  }

  onSocketErrorHandler(error) {
    this.errorHandler(error);
    this.closeWebSocketClientInstance();
  }

  errorHandler(message) {
    console.log('Something went wrong!');
    console.log(message);
  }

  onReceivingAForwardedMessageFromServer(roomID, messageObject) {
    console.log('ContentPublishingNotificationWSClient.onReceivingAForwardedMessageFromServer');
    console.log('RoomID: ', roomID);
    console.log('MessageObject: ', messageObject);
    let dataPost = messageObject.dataPost ? messageObject.dataPost : null;
    dataPost = dataPost && typeof dataPost === 'string' ? JSON.parse(dataPost) : dataPost;
    const contentID = messageObject.contentID ? messageObject.contentID : 'undefinedContentID';
    const contentChannelID = messageObject.contentChannelID
      ? messageObject.contentChannelID
      : 'undefinedcontentChannelID';
    const contentHeadline =
      dataPost && typeof dataPost === 'object' && dataPost.general && dataPost.general.headline
        ? dataPost.general.headline
        : 'Undefined Headline';
    const currentBaseURL = window.location ? window.location.origin : '/';
    const link = ''
      .concat(currentBaseURL)
      .concat('/content/')
      .concat(contentID)
      .concat('/')
      .concat(contentChannelID);

    notifyHTML(
      'Your content item '
        .concat('"' + contentHeadline + '"')
        .concat(' has been posted successfully!. Please click the following')
        .concat(' <a href="' + link + '/">LINK</a> ')
        .concat('to check the detail.')
    );
  }

  closeWebSocketClientInstance() {
    if (this.socket.connected) {
      this.socket.disconnect();
    }
    this.socket.close();
  }

  up() {
    try {
      console.log('ContentPublishingNotificationWSClient.UP');
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

  static __init() {
    return new ContentPublishingNotificationWSClient().up();
  }
}

export default ContentPublishingNotificationWSClient;
