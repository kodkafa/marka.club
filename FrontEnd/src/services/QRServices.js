import {request} from '../helpers';

export class Services {

  static create = async (data) => {
    return await request.put('/qr', {data}, false);
  }

  static read = async () => null;

  static update = async () => null;

  static delete = async () => null;

}
