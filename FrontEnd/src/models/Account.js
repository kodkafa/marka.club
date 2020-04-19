export class Account {

  constructor(data) {
    if (!data) return;
    this.id = data.id;
    this.email = data.email;
    this.first = data.first;
    this.last = data.last;
    this.born = data.born;
    this.bio = data.bio;
    this.company = data.company;
    this.freeRate = data.freeRate;
    this.role = data.role;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
  }

  // @computed
  // get id() {
  //   return this._id
  // }

  get name() {
    return this.first + ' ' + this.last
  }

  get isAdmin() {
    return 'admin' === this.role
  };

  get isEditor() {
    return 'editor' === this.role
  };

  get isManager() {
    return 'manager' === this.role
  };

  get isWorker() {
    return 'worker' === this.role
  };

  get isCompany() {
    return 'company' === this.role
  };

  get isCustomer() {
    return 'customer' === this.role
  };

}
