import { upgradeAdapter } from '../upgrade_adapter';

import { AlertServiceConfig } from '../blocks/config/alert.config';

import { LoginController } from './login/login.controller';

import { Auth } from './auth/auth.service';
import { AuthServerProvider } from './auth/auth-session.service';
import { Account } from './auth/account.service';
import { LoginService } from './login/login.service';
import { Principal } from './auth/principal.service';
import { ProfileService } from './profiles/profile.service';
import { JhiLanguageService } from './language/language.service';
import { AlertService } from './alert/alert.service';

import { PageRibbonComponent } from './profiles/page-ribbon.component';

upgradeAdapter.addProvider(ProfileService);

upgradeAdapter.upgradeNg1Provider('$state');
upgradeAdapter.upgradeNg1Provider('Auth');
upgradeAdapter.upgradeNg1Provider('JhiLanguageService');
upgradeAdapter.upgradeNg1Provider('LoginService');
upgradeAdapter.upgradeNg1Provider('Principal');

angular
    .module('uaaSetupApp.common', [
        'ngStorage', 
        'tmh.dynamicLocale',
        'pascalprecht.translate',
        'ngResource',
        'ui.bootstrap',
        'ui.router'
    ])
    // bug 'showAsToast is not a function to fix'
    .config(AlertServiceConfig)
    .controller('LoginController', LoginController)
    .factory('Auth', Auth)
    .factory('AuthServerProvider', AuthServerProvider)
    .factory('Account', Account)
    .factory('LoginService', LoginService)
    .factory('Principal', Principal)
    .factory('ProfileService',upgradeAdapter.downgradeNg2Provider(ProfileService))
    .provider('AlertService', AlertService) 
    .factory('JhiLanguageService', JhiLanguageService)
    .directive('pageRibbon',  <angular.IDirectiveFactory> upgradeAdapter.downgradeNg2Component(PageRibbonComponent));