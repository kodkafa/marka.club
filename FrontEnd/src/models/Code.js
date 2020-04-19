export class Meta {
  constructor(data) {
    this.total = data.total || 0;
    this.available = data.available || 0;
    this.gift = data.gift || 0;
    this.gifted = data.gifted || 0;
    this.freebies = data.freebies || 0;
    this.used = data.used || 0;
  }
}

export class Code {

  constructor(data) {
    if (!data) return;
    this._id = data._id;
    this.owner = data.owner;
    this.company = data.company;
    this.code = data.code;
    this.isUsed = data.isUsed;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
  }

  get id() {
    return this._id;
  }
}
