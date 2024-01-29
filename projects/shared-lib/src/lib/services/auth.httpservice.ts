import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from 'angular-auth-oidc-client';
import { LoginModel } from '../models/loginmodel';
import { AuthenticationResponse } from '../models/authenticationResponse';
import { StorageService } from './localstorage.service';
import { BaseService } from './base.httpservice';
import { APIResponse } from '../models/apiResponse';
import { TokenModel } from '../models/tokenModel';
import { StorageKeys } from '../constants/storagekeys';
import { CookieService } from 'ngx-cookie';
import { SessionStorageService } from './sessionstorage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginAPI = 'Auth/Account';

  constructor(
    protected storageService: StorageService,
    private baseService: BaseService,
    private cookieService: CookieService,
    private sessionService: SessionStorageService
  ) {}
  login(model: LoginModel): Observable<APIResponse<AuthenticationResponse>> {
    return this.baseService.post<APIResponse<AuthenticationResponse>>(
      `${this.loginAPI}/Login`,
      model
    );
  }

  refreshToken(
    model: TokenModel
  ): Observable<APIResponse<AuthenticationResponse>> {
    return this.baseService.post<APIResponse<AuthenticationResponse>>(
      `${this.loginAPI}/refresh-token`,
      model
    );
  }

  saveUserData(model: LoginResponse) {
    //  console.log(model);
    this.sessionService.setItem(StorageKeys.USER_TOKEN, model.accessToken);
    this.storageService.setItem(StorageKeys.LOGIN_RESPONSE, model);
    //this.cookieService.put(StorageKeys.LOGIN_RESPONSE, JSON.stringify(model));
    // this.cookieService.put(StorageKeys.USER_TOKEN, model.accessToken);
  }

  getUserName() {
    let item = this.storageService.getItem(StorageKeys.LOGIN_RESPONSE);
    let loggedUser = item! as LoginResponse;
    return loggedUser.userData.name;
  }
  getUserTokenModel(): TokenModel {
    let tokenModel: TokenModel = {
      AccessToken: this.storageService.getItem(StorageKeys.USER_TOKEN)!,
      RefreshToken: this.storageService.getItem(
        StorageKeys.USER_REFRESH_TOKEN
      )!,
    };
    return tokenModel;
  }
}
