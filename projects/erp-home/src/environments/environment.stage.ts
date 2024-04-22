import { IEnvironment } from 'shared-lib';

export const environment: IEnvironment = {
  production: false,
  baseUrl: 'https://localhost:44328',
  Version: 'V1',
  ClientId: 'Erp',
  Platform: 'Web',
  photoBaseUrl: 'https://intmicrotec.neat-url.com:2002',
  openIdConfig: {
    authority: 'https://dev-q00lf3jdcvq53wkj.us.auth0.com',
    redirectUrl: window.location.origin + '/login-redirect',
    postLogoutRedirectUri: window.location.origin + '/logout-redirect',
    clientId: 'ayVhfTYMw6PzuY1ukj2CoiIi8VgbIcYk',
    scope: 'openid profile email offline_access',
    responseType: 'code',
    silentRenew: true,
    useRefreshToken: true,
  },
  AttachmentServiceConfig: {
    AttachmentServiceUrl: 'http://localhost:2030',
    ClientId: 'Erp',
    SecretKey: 'secretkey',
  },
  ApiKey: '3bb564df-0f24-4ea6-82c1-d99f368cac8a',
};
