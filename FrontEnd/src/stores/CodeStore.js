import {observable, action, computed} from 'mobx';
import {CodeServices as Service} from '../services';
import {CodeMeta as Meta, Code as Model} from '../models';

export class Store {

  @observable state = "initial";
  @observable meta = {};

  @observable _id = null;
  @observable _list = new observable.map();
  @observable _item = {}

  @observable info = {};

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
  use = async (data) => {
    if (!data) return false;
    return await Service.use(data)
      .then(res=>{
        this.info = res.data
      })
      .catch(error => this.stores.SystemMessageStore.handleError(error));
  };

  @action
  delete = async () => null;

  @action.bound
  fetchSuccess(res) {
    if (res.meta) {
      this.meta = new Meta(res.meta);
    }
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
    return [...this._list.values()].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  get item() {
    return this._item;
  }

}
