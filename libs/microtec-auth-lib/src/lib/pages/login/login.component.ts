import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'microtec-auth-lib';
import { LanguageService, RouteParams, RouterService } from 'shared-lib';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.routerService.navigateTo('');
    }
    this.titleService.setTitle('Login');
    let culture = this.routerService.getRouteParams(RouteParams.CULTUREQUERY);
    this.languageService.setDefaultLang(culture);
    this.authService.authorize();
  }

  constructor(
    private languageService: LanguageService,
    private authService: AuthService,
    private routerService: RouterService,
    private titleService: Title
  ) {}
}
