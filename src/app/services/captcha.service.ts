import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CaptchaService {
  generateCaptcha(): string {
    const captchaCode = Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase();
    return captchaCode;
  }
}
