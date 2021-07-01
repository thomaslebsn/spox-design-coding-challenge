import FIELD_TYPE from '../../../constants/FieldType';

import {
  CONTENT_FIELD_KEY,
  ESI_CONTENT_API_RESPONSE_FIELD_KEY,
} from '../../../constants/ContentModule';

import getStatus from '../../../utils/status';
import ChannelUtils from '../../ChannelsPage/ChannelUtils/ChannelUtils';

class ContentChannelsModel {
  constructor(data) {
    console.log('data data content post subrow');
    console.log(data);
    

    const dataParse = JSON.parse(data.data);

    console.log('dataParse123456');
    console.log(dataParse);
    
    this.id = dataParse.general[ESI_CONTENT_API_RESPONSE_FIELD_KEY.ID] ?? 0;
    this.name = dataParse.general[ESI_CONTENT_API_RESPONSE_FIELD_KEY.HEADLINE] ?? '';
    this.status = 'published' ?? '';
    // this.channel = 
  }

  getId = () => {
    return {
      value: this.id,
      type: FIELD_TYPE.READONLY,
      columnName: CONTENT_FIELD_KEY.ID,
      columnText: 'ID',
    };
  };

  getName = () => {
    return {
      value: this.name,
      type: FIELD_TYPE.TEXT,
      columnName: CONTENT_FIELD_KEY.NAME,
      columnText: 'Name',
    };
  };

  getStatus = () => {
    return {
      value: getStatus(this.status),
      type: FIELD_TYPE.TEXT,
      columnName: CONTENT_FIELD_KEY.STATUS,
      columnText: 'Status',
    };
  };

  // getChannels = () => {
  //   return {
  //     value: this.channelsModel,
  //     type: FIELD_TYPE.TEXT,
  //     columnName: CONTENT_FIELD_KEY.CHANNELS,
  //     columnText: 'Channels',
  //   };
  // };

  toTableRowData = () => {
    const id = this.getId();
    const name = this.getName();
    const status = this.getStatus();

    return {
      [id.columnName]: id.value,
      [name.columnName]: name.value,
      [status.columnName]: status.value,
    };
  };
}

export default ContentChannelsModel;