import {action, observable} from 'mobx';
import {User} from "../models";
import {UserServices} from "../services";
import {request} from "../helpers";

export default class {
  @observable authenticated = null;
  @observable uid = null;
  @observable _me = null;
  remember = false;

  constructor(stores) {
    this.stores = stores;
    this.model = User;
    this.service = UserServices;
  }

  @action
  createUser = async (data) => {
    if (!data) return false;
    if(!data.username)
      data.username = data.email;
    if(!data.born)
      data.born = '2002-02-02';

    return await this.service.createUser(data)
      .then()
      .catch(error => this.stores.SystemMessageStore.handleError(error));

  };

  @action
  signIn = async ({email, password, remember}) => {
    if (!email || !password) return false;

    const res = await this.service.signIn({email, password, remember})
      .then()
      .catch(error => this.stores.SystemMessageStore.handleError(error));

    if (!res) return false;

    this.authenticated = true;
    return true;
  };

  handleAuth = async () => {
    const token = await request.token;
    this.authenticated = !!token;
  };

  @action
  reset = async ({email}) => {
    if (!email) return false;
    this.email = email;
    return await this.service.reset({email})
      .then()
      .catch(error => this.stores.SystemMessageStore.handleError(error));
  };

  @action
  newPassword = async ({confirmation_code, password}) => {
    //console.log(confirmation_code, password);
    if (!confirmation_code) return false;
    return await this.service.newPassword({confirmation_code, password})
      .then()
      .catch(error => this.stores.SystemMessageStore.handleError(error));
  };

  @action
  changePassword = async ({password, new_password}) => {
    const access_token = await request.access_token;
    return await this.service.changePassword({password, new_password, access_token})
      .then(res => true)
      .catch(error => this.stores.SystemMessageStore.handleError(error));
  };

  @action
  signOut = async () => {
    this.authenticated = false;
    localStorage.clear();
    this.service.signOut();
    window.location.href = process.env.REACT_APP_LOGIN_URL;
  };

  @action
  activation = async (data) => {
    if (!data) return false;
    return await this.service.activation(data)
      .then()
      .catch(error => this.stores.SystemMessageStore.handleError(error));
  };

  @action
  verify = async (data) => {
    if (!data) return false;
    return await this.service.verify(data)
      .then()
      .catch(error => this.stores.SystemMessageStore.handleError(error));
  };

  @action
  newsletter = async (data) => {
    if (!data) return false;
    return await this.service.newsletter(data)
      .then()
      .catch(error => this.stores.SystemMessageStore.handleError(error));
  };

}
