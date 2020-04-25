import cookie from "react-cookies";

// console.log(window.location)
const API_URL = window.location.origin.replace(window.location.port, 4000) + '/api';//process.env.REACT_APP_API_URL;
const LOGIN_URL = process.env.REACT_APP_LOGIN_URL;

export class request {

  static get token() {
    const token = cookie.load('token');
    return token;// || this.refreshToken().then()
  }

  static get access_token() {
    return cookie.load('access_token');
  }

  static refreshToken = async () => {
    const {access_token, refresh_token, remember} = cookie.loadAll();
    if (access_token && refresh_token) {
      const res = await this.post('/auth/refresh-token', {access_token, refresh_token}, false)
        .then()
        .catch(error => error);

      if (!res.data) {
//console.log('error', res);
        this.deleteCookies()
        if (window.location.href !== LOGIN_URL)
          window.location.href = LOGIN_URL;
        throw new Error(res['error_message']);
      }

      this.setCookies({access_token: res.data.AccessToken, id_token: res.data.IdToken, remember});
      return res.data.IdToken;
    }
    return false
  };

  static deleteCookies = () => {
    const domain = process.env.REACT_APP_COOKIE_DOMAIN || null;//".evet.com";

    cookie.save('token', '', {path: '/', domain});

    cookie.remove('token');
    cookie.remove('remember');

  };

  static setCookies = ({token, remember}) => {
    const domain = process.env.REACT_APP_COOKIE_DOMAIN || null;//".evet.com";
    const expires = new Date();
    if (remember) {
      expires.setTime(Date.now() + 1000 * 60 * 60 * 24 * 14); //2 weeks
    } else {
      expires.setTime(Date.now() + 1000 * 60 * 10); //10 mins
    }
    if (token)
      cookie.save('token', token, {
        path: '/',
        expires,
        domain
      });
    if (remember)
      cookie.save('remember', remember, {
        path: '/',
        expires,
        domain
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
