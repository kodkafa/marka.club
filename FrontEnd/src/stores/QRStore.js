import {observable, action} from 'mobx';
import {QRServices as Service} from '../services';

export class Store {

  @observable state = "initial";
  @observable QR = null;

  constructor(Stores) {
    this.stores = Stores;
  }

  @action
  create = async (data) => {
    if (!data) return false;
    this.state = "initial";
    const res = await Service.create(data)
      .then(res => res)
      .catch(error => this.stores.SystemMessageStore.handleError(error));
    this.state = "done";
    this.QR = res.data;
  };

}
