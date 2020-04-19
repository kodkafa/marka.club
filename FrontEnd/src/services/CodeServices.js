import {request} from '../helpers';

export class Services {

  static create = async (data) => {
    return await request.post('/codes/generate', data);
  }

  static read = async (params) => {
    return await request.get('/codes', params);
  };

  static use = async (code) => {
    //const data = await request.get('/codes/' + code, {});
   // const {company} = data;
   return  await request.post('/transactions', {code});
    //return await request.put('/codes/use/' + code, {});
  };

  static delete = async () => null;

}
