import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginmodel';
import { AuthenticationResponse } from '../models/authenticationResponse';
import { HttpService, APIResponse } from 'shared-lib';
import { TokenModel } from '../models/tokenmodel';

@Injectable({
  providedIn: 'root',
})
export class AuthHttpService {
  private loginAPI = 'Auth/Account';
  private updateLoginDateAPI = 'User/UpdateLastLoggingTime';

  constructor(private baseService: HttpService) {}
  login(model: LoginModel): Observable<AuthenticationResponse> {
    return this.baseService.post<AuthenticationResponse>(
      `${this.loginAPI}/Login`,
      model
    );
  }
  UpdateLastLoggingTime(): Observable<string> {
    return this.baseService.post<string>(`${this.updateLoginDateAPI}`, null);
  }

  refreshToken(model: TokenModel): Observable<AuthenticationResponse> {
    return this.baseService.post<AuthenticationResponse>(
      `${this.loginAPI}/refresh-token`,
      model
    );
  }
}
