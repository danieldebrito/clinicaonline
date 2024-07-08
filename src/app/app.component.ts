import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fadeAnimation, slideInAnimation } from './animations/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation, slideInAnimation]
})
export class AppComponent {
  title = 'clinicaonline';

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
