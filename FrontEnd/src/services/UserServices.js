import {request} from '../helpers';

export class UserServices {

  static create = async (data) => {
    return await request.post('/auth/register', data, false);
  };

  static read = async (params) => {
    return await request.get('/auth', params);
  };

  static update = async (id, data) => {
    return await request.put('/users/' + id, data).then();
  };

  static delete = async (url_id, id) => {
    return await request.delete('/users/' + id, {url_id}).then();
  };


  static detail = async (id) => {
    if (id)
      return await request.get('/users/' + id);
  };

}
