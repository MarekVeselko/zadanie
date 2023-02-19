import { Component } from '@angular/core';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc-fix'
import { authCodeFlowConfig } from './sso.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private oAuthService: OAuthService) {
      this.configureSingleSignOn();
     }

    configureSingleSignOn() {
      this.oAuthService.configure(authCodeFlowConfig);
      this.oAuthService.tokenValidationHandler = new JwksValidationHandler();
      this.oAuthService.loadDiscoveryDocumentAndTryLogin();
    }

    login() {
      this.oAuthService.initImplicitFlow();
    }

    logout() {
      this.oAuthService.logOut();
    }

    get token() {
      let claims = this.oAuthService.getIdentityClaims();
      return claims ? claims : null;
    }
}
