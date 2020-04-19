import {computed, observable, action, toJS} from 'mobx';
import {UserServices} from '../services';
import {User} from '../models/User';
import moment from 'moment';

export default class UserStore {
  @observable _id = null;
  @observable _list = null;
  @observable _detail = null;
  @observable _profile = null;

  @observable data = null;
  @observable status = "initial";
  @observable searchQuery = "";

  constructor(Stores) {
    this.stores = Stores;
    this.model = User;
    this.service = UserServices;
  }

  @action
  read(id = null) {
    this.state = "fetching";
    if (id)
      this.service.detail(id).then((res) => this._profile = new this.model(res.data), this.handleError);
    else
      this.service.get().then(this.fetchSuccess, this.handleError)
  }

  @action
  getProfile = async () => {
    this.service.getProfile().then((res) => {
      this._profile = new this.model(res.data);
      localStorage.setItem('me', JSON.stringify(this._profile));
    }, this.handleError);
  };

  @computed
  get profile() {
    if (!this._profile) {
      const me = JSON.parse(localStorage.getItem('me') || null);
      if (me && me.client_name) return this._profile = new this.model(me);
      return (async () => {
        const data = await this.service.getProfile()
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

  create = async (data) => {
    if (!data) return false;
    return await this.service.create(data)
      .then(res => {
        return res;
      })
      .catch(error => this.stores.SystemMessageStore.handleError(error));
  };

  update = async (id, data) => {
    if (!data) return false;
    return await this.service.update(id, data)
      .then(res => {
        //this._profile = null;
        return res;
      })
      .catch(error => this.stores.SystemMessageStore.handleError(error));
  };

  delete = async (url_id, id) => {
    if (!id) return false;
    return await this.service.delete(url_id, id)
      .then()
      .catch(error => this.stores.SystemMessageStore.handleError(error));
  };

  get = (params = {}) => {
    if (!this._list || !this._list.length || params.force === true) {
      this.service.get(params)
        .then(res => {
          this._list = res.data && res.data.users.length ? res.data.users : [{}];
          //.map(i => new this.model(i || {}))
        })
        .catch(error => this.stores.SystemMessageStore.handleError(error));
    }
    return toJS(this._list)
  };

  @action
  detail = (id) => {
    if (id !== undefined && this._list) {
      const users = this._list.filter(i => String(i.user_id) === String(id));
      this._detail = users[0];
      // if (id && (!this._detail || (this._detail && this._id !== id))) {
      //     this._id = id;
      //     return (async () => {
      //         const data = await this.service.detail(id)
      //             .then(res => res ? res.data : {})
      //             .catch(error => this.stores.SystemMessageStore.handleError(error));
      //         const newItem = {id, ...data};
      //         return this._detail = toJS(newItem);
      //     })();
      // }
    }
    return this._detail
  };

  @computed
  get moment() {
    return this._profile ? moment(this._profile.moment) : moment();
  }

  @computed
  get today() {
    const m = this._profile ? moment(this._profile.moment) : moment();
    return m.add(0)
  }

  @computed
  get yesterday() {
    const m = this._profile ? moment(this._profile.moment) : moment();
    return m.add(-1, 'days')
  }

  date = (time) => {
    return this._profile ? moment(time).utcOffset(this._profile.utcOffset) : moment(time);
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
}
