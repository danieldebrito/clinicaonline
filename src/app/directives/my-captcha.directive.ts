import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import Swal from 'sweetalert2';
import { CaptchaService } from '../services/captcha.service';

@Directive({
  selector: '[appMyCaptcha]',
})
export class MyCatchaDirective {
  @Input() appMyCaptcha: boolean = true;
  @Output() captchaVerified = new EventEmitter<boolean>();

  private captchaCode: string = '';

  constructor(private captchaSv: CaptchaService) {
    this.generateCaptcha();
    //this.renderCaptcha();
  }

  private generateCaptcha() {
    this.captchaCode = this.captchaSv.generateCaptcha();
  }

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    if (this.appMyCaptcha) {
      Swal.fire({
        title: 'Ingrese el captcha mostrado: ' + this.captchaCode,
        input: 'text',
        showCancelButton: true,
        confirmButtonText: 'Verificar',
        cancelButtonText: 'Cancelar',
        preConfirm: (userInput: string) => {
          const isVerified = userInput === this.captchaCode;
          this.captchaVerified.emit(isVerified);
        },
      });
    } 
  }
}
