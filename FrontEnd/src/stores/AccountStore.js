import {computed, observable, action} from 'mobx';
import {AccountServices} from '../services';
import {Account} from '../models';
import {request} from "../helpers";

export default class AccountStore {


  @observable authenticated = false;
  @observable _me = null;

  @observable _id = null;
  @observable _list = null;
  @observable _detail = null;
  @observable _profile = null;

  @observable data = null;
  @observable status = "initial";
  @observable searchQuery = "";

  constructor(Stores) {
    this.stores = Stores;
    this.model = Account;
    this.service = AccountServices;
  }

  create = async (data) => {
    if (!data) return false;
    return await this.service.create(data)
      .then(res => {
        return res;
      })
      .catch(error => this.stores.SystemMessageStore.handleError(error));
  };

  @action
  read(id = null) {
    this.state = "fetching";
    if (id)
      this.service.detail(id).then((res) => this._profile = new this.model(res.data), this.handleError);
    else
      this.service.get().then(this.fetchSuccess, this.handleError)
  }

  @action
  update = async (data) => {
    if (!data) return false;
    return await this.service.update(data)
      .then(async res => {
        this._me = new this.model(await this.service.me().then(res => res.data) || {});
        localStorage.setItem('me', JSON.stringify(this._me));
        return res;
      })
      .catch(error => this.stores.SystemMessageStore.handleError(error));
  };

  @action
  delete = async (url_id, id) => {
    if (!id) return false;
    return await this.service.delete(url_id, id)
      .then()
      .catch(error => this.stores.SystemMessageStore.handleError(error));
  };

  @action.bound
  fetchSuccess(res) {
    if (res.data.length)
      res.data.forEach(i => this._list.set(i.url_id, new this.model(i || {})));
    this.state = "done"
  }

  @action.bound
  handleError(error) {
    this.state = "error";
    return this.stores.SystemMessageStore.handleError(error)
  }

  handleAuth = async () => {
    const token = await request.token;
    this.authenticated = !!token;
  };


  @action
  signIn = async ({email, password, remember}) => {
    try {


      if (!email || !password) return false;

      const res = await this.service.signIn({email, password, remember}).then()

      console.log({res});
      if (!res) return false;

      this._me = new this.model(await this.service.me().then(res => res.data) || {});
      localStorage.setItem('me', JSON.stringify(this._me));
      this.authenticated = true;
      return true;
    } catch (e) {
      this.stores.SystemMessageStore.handleError(e)
    }
  };

  @action
  signOut = async () => {
    this.authenticated = false;
    localStorage.clear();
    this.service.signOut();
  };


  @action
  getProfile = async () => {
    this.service.me().then((res) => {
      this._profile = new this.model(res.data);
      localStorage.setItem('me', JSON.stringify(this._profile));
    }, this.handleError);
  };


  @computed
  get me() {
    return this._me || new this.model(JSON.parse(localStorage.getItem('me') || null));
  }

  @computed
  get profile() {
    if (!this._profile) {
      const me = JSON.parse(localStorage.getItem('me') || null);
      if (me && me.client_name) return this._profile = new this.model(me);
      return (async () => {
        const data = await this.service.me()
          .then(res => res.data)
          .catch(error => this.stores.SystemMessageStore.handleError(error));
        this._profile = new this.model(data || {});
        localStorage.setItem('me', JSON.stringify(this._profile));
        return this._profile;
      })();
    }
    return this._profile;
  }

  updateProfile = async (data) => {
    if (!data) return false;
    return await this.service.updateProfile(data)
      .then(res => {
        localStorage.removeItem('me');
        this._profile = null;
        return this.profile;
      })
      .catch(error => this.stores.SystemMessageStore.handleError(error));
  };

}
