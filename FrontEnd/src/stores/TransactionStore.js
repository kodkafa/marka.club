import {observable, action, computed} from 'mobx';
import {CodeServices as Service} from '../services';
import {Code as Model} from '../models';

export class Store {

  @observable authenticated = false;
  @observable _me = null;

  @observable _id = null;
  @observable _list = new observable.map();
  @observable _detail = null;
  @observable _profile = null;

  @observable data = null;
  @observable state = "initial";
  @observable searchQuery = "";

  constructor(Stores) {
    this.stores = Stores;
  }

  create = async (data) => {
    if (!data) return false;
    return await Service.create(data)
      .then()
      .catch(error => this.stores.SystemMessageStore.handleError(error));
  };

  @action
  read(id = null) {
    this.state = "fetching";
    if (id)
      Service.detail(id).then((res) => this._profile = new Model(res.data), this.handleError);
    else
      Service.read().then(this.fetchSuccess, this.handleError)
  }

  @action
  update = async (data) => {
    if (!data) return false;
    return await Service.update(data)
      .then(async res => {
        this._me = new Model(await Service.me().then(res => res.data) || {});
        localStorage.setItem('me', JSON.stringify(this._me));
        return res;
      })
      .catch(error => this.stores.SystemMessageStore.handleError(error));
  };

  @action
  delete = async (url_id, id) => {
    if (!id) return false;
    return await Service.delete(url_id, id)
      .then()
      .catch(error => this.stores.SystemMessageStore.handleError(error));
  };

  @action.bound
  fetchSuccess(res) {
    if (res.data.length) {
      this._list = new observable.map();
      res.data.forEach(i => {
        const item = new Model(i || {});
        this._list.set(item.id, item);
      });
    }
    this.state = "done"
  }

  @action.bound
  handleError(error) {
    this.state = "error";
    return this.stores.SystemMessageStore.handleError(error)
  }

  @computed
  get list() {
    return [...this._list.values()];
  }

  get item() {
    return this._item;
  }

}
