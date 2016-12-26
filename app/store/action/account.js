// @flow
import type {ApiUserType, ApiCredentialsType} from 'app/api';

import * as Api from 'app/api';
import Const from 'app/const';
import store from 'app/store';
import * as Log from 'app/util/log';


function extAuthenticate(authUrl: string): Promise<string> {
  return new Promise((resolve: Function, reject: Function): void => {
    const win = new (window.require('electron').remote).BrowserWindow({
      width: 800, height: 600, show: false, frame: true
    });
    win.loadURL(authUrl);
    win.on('close', (): void => {
      reject(new Error('EXTAUTH_CLOSE'));
    });
    win.webContents.on('will-navigate', (event: Event, url: string): void => {
      event.preventDefault();
      try {
        const matches = url.match(/oauth_verifier=([^&]*)/);
        if (matches && matches.length === 2 && matches[1]) {
          resolve(matches[1]);
        } else {
          reject(new Error('EXTAUTH_NOT_AUTHORIZED'));
        }
      } catch (e) {
        reject(new Error('EXTAUTH_NOT_AUTHORIZED'));
      }

      win.destroy();
    });
    win.show();
  });
}

export async function signin(): Promise<ApiUserType> {
  store.alterState({
    pageConnectLoading: true
  }, 'SIGNIN_START');

  try {
    const rtoken: ApiCredentialsType = await Api.oauthRequestToken(Const.COCOWEET_OAUTH_CALLBACK);
    const verifier: string = await extAuthenticate(Api.oauthAuthenticateUrl(rtoken.key));
    const atoken: ApiCredentialsType = await Api.oauthAccessToken(verifier, rtoken);

    const user: ApiUserType = await Api.accountVerifyCredentials(atoken);

    store.alterState({
      user,
      credentials: atoken,
      page: 'main'
    }, 'SIGNIN_FINISH');

    return user;
  } catch (e) {
    Log.warn(e);
    store.alterState({
      pageConnectLoading: false
    }, 'SIGNIN_FAIL');
  }

  throw new Error('SIGNIN_ERROR');
}

export async function initCredentials(): Promise<void> {
  await Api.syncTime();
  const credentials: ?ApiCredentialsType = store.getState().credentials;

  if (credentials) {
    try {
      const user: ApiUserType = await Api.accountVerifyCredentials(credentials);
      store.alterState({
        user,
        page: 'main'
      }, 'INTERNAL_INIT_CREDENTIALS_FINISH');
    } catch (e) {
      Log.warn(e);
      store.alterState({
        pageConnectLoading: false,
        credentials: null
      }, 'INTERNAL_INIT_CREDENTIALS_FAIL');
    }
  } else {
    store.alterState({
      pageConnectLoading: false,
      initialized: true
    }, 'INIT_CREDENTIALS_SYNC');
  }
}
