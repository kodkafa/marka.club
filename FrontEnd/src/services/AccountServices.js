import {request} from '../helpers';

export class AccountServices {

  static create = async (data) => {
    return await request.post('/auth/register', data, false);
  };

  static read = async (params) => {
    return await request.get('/auth', params);
  };

  static update = async (data) => {
    return await request.put('/users/update', data);
  };

  static delete = async (url_id, id) => {
    try {
      return await request.delete('/users/' + id, {url_id}).then();
    } catch (e) {
      throw e
    }
  };


  static signIn = async (data) => {
    try {
      const res = await request.post('/auth/login', data, false).then();
      const {remember} = data;
      request.setCookies({
        token: res.token,
        remember
      });
      return true;
    } catch (e) {
      throw e
    }
  };

  static signOut = () => request.deleteCookies();

  static reset = async (data) => {
    return await request.post('/auth/forgot-password', data, false).then();
  };

  static newPassword = async (data) => {
    return await request.post('/auth/confirm-forgot-password', data, false);
  };

  static changePassword = async (data) => {
    return await request.post('/auth/change-password', data);
  };

  static activation = async (data) => {
    return await request.post('/account/activation', data, false);
  };

  static verify = async (data) => {
    return await request.post('/verify-email', data, false);
  };

  static newsletter = async (data) => {
    return await request.post('/newsletter', data, false);
  };

  static me = async () => {
    return await request.get('/users/me', null, true);
  };

  // static create = async (data) => {
  //     return await request.post('/users', data);
  // };

  //
  // static detail = async (id) => {
  //   if (id)
  //     return await request.get('/users/' + id);
  // };

}
