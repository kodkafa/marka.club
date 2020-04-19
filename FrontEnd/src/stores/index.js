import UIStore from './UIStore';
import SystemMessageStore from './SystemMessageStore';
// import NotificationStore from './NotificationStore';
// import AuthStore from './AuthStore';
import AccountStore from './AccountStore';
import UserStore from './UserStore';
import {Store as CodeStore} from './CodeStore';

class RootStore {
  constructor() {
    this.UIStore = new UIStore(this);
    this.SystemMessageStore = new SystemMessageStore(this);
    // this.NotificationStore = new NotificationStore(this);
    // this.AuthStore = new AuthStore(this);
    this.AccountStore = new AccountStore(this);
    this.UserStore = new UserStore(this);
    this.CodeStore = new CodeStore(this);
  }
}

export const stores = new RootStore();
