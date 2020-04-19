import {action, computed, observable, toJS} from "mobx";

export class User {

  client_id = 100352;
  @observable client_name = "Scout Bags";
  @observable client_type_cd = "STANDARD";
  @observable client_url = null;
  @observable address = "str1";
  @observable city = "str";
  @observable state = "str";
  @observable zip_code = "str";
  @observable country = "str";
  urls = null;
  url = false
  @observable utcOffset = 0;
  @observable status_cd;
  @observable timezone_id;

  constructor(data) {

    this.client_id = data.client_id;
    this.client_name = data.client_name;
    this.client_type_cd = data.client_type_cd;
    this.client_url = data.client_url;
    this.address = data.address;
    this.city = data.city;
    this.state = data.state;
    this.zip_code = data.zip_code;
    this.country = data.country;
    this.urls = data.urls;
    this.status_cd = data.status_cd;
    this.timezone_id = data.timezone_id;

    this.url = data.url ? data.url : data.urls ? data.urls[0] : {};
    this.timezone = this.url ? this.url.timezone_text || 'UTC+03:00' : 'UTC+03:00';
    const regex = /UTC[-+][0-9][0-9]:[0-9][0-9]/i;
    this.utcOffset = this.timezone.match(regex) ? this.timezone.match(regex)[0].replace('UTC', '') : '+0';
  }

  @computed
  get id() {
    return this.client_id
  }

  @computed
  get name() {
    return this.client_name
  }

  @action
  changeUrl = (id) => {
    const urls = toJS(this.urls.filter(i => i.url_id === Number(id)));
    if (urls[0]) {
      this.url = toJS(urls[0]);
      this.timezone = urls[0].timezone_text || 'UTC+03:00';
      const regex = /UTC[-+][0-9][0-9]:[0-9][0-9]/i;
      this.utcOffset = this.timezone.match(regex)[0].replace('UTC', '');
      localStorage.setItem('me', JSON.stringify(this));
      console.log('change URL ME', this)
    }
  };

  @action
  setURL = (url) => {
    this.url = url;
    this.timezone = url.timezone_text || 'UTC+03:00';
    const regex = /UTC[-+][0-9][0-9]:[0-9][0-9]/i;
    this.utcOffset = this.timezone.match(regex)[0].replace('UTC', '');
    localStorage.setItem('me', JSON.stringify(this));
  };

  isAdmin = () => {
    return 'admin' in this.customClaims && this.customClaims.admin
  };

  isEditor = () => {
    return 'editor' in this.customClaims && this.customClaims.editor
  };

  isManager = () => {
    return 'manager' in this.customClaims && this.customClaims.manager
  };

  isWorker = () => {
    return 'worker' in this.customClaims && this.customClaims.worker
  };

  // get id() {
  //   return this.uid
  // }
  //
  // get name() {
  //   return this.first + ' ' + this.last
  // }

  @computed
  get born() {
    return this._born;// instanceof firebase.firestore.Timestamp ? this._born.toDate() : this._born
  }

  set born(date) {
    this._born = date;
  }

  save = async () => {
    try {
      // const {uid, first, last, born, bio, avatar, cover} = this;
      // await firebase.firestore()
      //   .collection('users')
      //   .doc(uid)
      //   .update({first, last, born, bio, avatar, cover})
      //   .then()
      //   .catch(error => stores.SystemMessageStore.handleError(error));
      // //await this.service.put(uid, {first, last, born, bio});
      // if (uid === stores.AuthStore.me.uid)
      //   await stores.AuthStore.getUserData({uid});
    } catch (error) {
      // stores.SystemMessageStore.handleError(error)
    }
  };

}
