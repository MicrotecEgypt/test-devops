import { IEnvironment } from 'shared-lib';

export const environment: IEnvironment = {
  production: true,
  baseUrl: 'https://intmicrotec.neat-url.com:2005',
  Version: 'V1',
  ClientId: 'Apps-Accounting',
  Platform: 'Web',
  photoBaseUrl: 'https://intmicrotec.neat-url.com:2002',
  AttachmentServiceConfig: {
    AttachmentServiceUrl: 'https://intmicrotec.neat-url.com:2030',
    ClientId: 'Accounting',
    SecretKey: 'secretkey',
  },
  ApiKey: '3bb564df-0f24-4ea6-82c1-d99f368cac8a',
  BusinessOwnerUrl: 'https://intmicrotec.neat-url.com:2003',
  state: window.location.origin + '/accounting/',
};
