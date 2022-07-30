import { Component } from '@angular/core';
import { JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from './sso.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private OAuthService: OAuthService) {
    this.configurationSingleSignOn();
  }
  configurationSingleSignOn() {
    this.OAuthService.configure(authCodeFlowConfig);
    this.OAuthService.tokenValidationHandler = new JwksValidationHandler();
    this.OAuthService.loadDiscoveryDocumentAndTryLogin();
  }
  login() {
    this.OAuthService.initImplicitFlow();
  }
  logout() {
    this.OAuthService.logOut();
  }
  get token() {
    let claims: any = this.OAuthService.getIdentityClaims();
    return claims ? claims : null;
  }
}
