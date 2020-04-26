import cookie from "react-cookies";

const url = window.location.origin.replace(window.location.port, '')
const API_URL = url + (url.substr(-1) === ':' ? '4000/api' : ':4000/api')
console.log({API_URL})
export class request {

  static get token() {
    const token = cookie.load('token');
    return token;// || this.refreshToken().then()
  }

  static get access_token() {
    return cookie.load('access_token');
  }

  static deleteCookies = () => {
    cookie.remove('token');
    cookie.remove('remember');
  };

  static setCookies = ({token, remember}) => {
    const expires = new Date();
    if (remember) {
      expires.setTime(Date.now() + 1000 * 60 * 60 * 24 * 14); //2 weeks
    } else {
      expires.setTime(Date.now() + 1000 * 60 * 10); //10 mins
    }
    if (token)
      cookie.save('token', token, {
        path: '/',
        expires
      });
    if (remember)
      cookie.save('remember', remember, {
        path: '/',
        expires
      });
  };

  static get = async (endpoint, params = {}, secured = true) => {
    const token = secured ? await this.token : null;
    params = params ? Object.keys(params)
      .map(k => encodeURI(k) + '=' + encodeURI(params[k]))
      .join('&') : '';
    const url = API_URL + endpoint + (params ? '?' + params : '');
    const response = await fetch(url, {
      method: "GET",
      headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token},
      mode: 'cors',
    });
    const result = await response.json();
    if (response.status < 300)
      return result || true;

    throw new Error(result.message);
  };

  static post = async (endpoint, data, secured = true) => {
    const token = secured ? await this.token : null;
    const url = API_URL + endpoint;
    const response = await fetch(url, {
      method: "POST",
      headers: token
        ? {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        } : {'Content-Type': 'application/json'},
      mode: 'cors',
      body: JSON.stringify(data)
    });
    const result = await response.json();
    if (response.status <= 201)
      return result || true;

    throw new Error(result.message);

  };


  static put = async (endpoint, data, secured = true) => {
    const token = secured ? await this.token : null;
    const url = API_URL + endpoint;
    const response = await fetch(url, {
      method: "PUT",
      headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token},
      mode: 'cors',
      body: JSON.stringify(data)
    });
    const result = await response.json();
    if (response.status <= 201)
      return result || true;

    throw new Error(result.message);
  };

  static delete = async (endpoint, data, secured = true) => {
    const token = secured ? await this.token : null;
    const url = API_URL + endpoint;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token},
      mode: 'cors',
      body: JSON.stringify(data)
    });
    const result = await response.json();
    //console.log({result});
    if (response.status === 200)
      return result || true;

    throw new Error(result['error_message']);
  }
}
