import { Component } from '@angular/core';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.scss']
})
export class AdministradorComponent {

  public showButtonMenu: boolean = true;

  public openNav() {
    const mySidenav = document.getElementById('mySidenav');
    const main = document.getElementById('main');
    
    if (mySidenav && main) {
      mySidenav.style.width = '350px';
      main.style.marginLeft = '350px';
      this.showButtonMenu = false;
    }
  }
  
  public closeNav() {
    const mySidenav = document.getElementById('mySidenav');
    const main = document.getElementById('main');
    
    if (mySidenav && main) {
      mySidenav.style.width = '0';
      main.style.marginLeft = '0';
      this.showButtonMenu = true;
    }
  }
}
