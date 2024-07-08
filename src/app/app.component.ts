import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fadeAnimation, slideInAnimation, loginHomeAnimation } from './animations/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation, slideInAnimation, loginHomeAnimation]
})
export class AppComponent {
  title = 'clinicaonline';

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
