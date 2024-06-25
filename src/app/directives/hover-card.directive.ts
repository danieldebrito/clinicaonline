import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appHoverCard]'
})
export class HoverCardDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.applyStyles();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.removeStyles();
  }

  private applyStyles() {
    const boxShadow = '5px 6px 6px 2px #e9ecef';
    const transform = 'scale(1.1)';

    this.renderer.setStyle(this.el.nativeElement, 'transition', 'all 0.2s ease');
    this.renderer.setStyle(this.el.nativeElement, 'cursor', 'pointer');
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', boxShadow);
    this.renderer.setStyle(this.el.nativeElement, 'transform', transform);
  }

  private removeStyles() {
    this.renderer.removeStyle(this.el.nativeElement, 'transition');
    this.renderer.removeStyle(this.el.nativeElement, 'cursor');
    this.renderer.removeStyle(this.el.nativeElement, 'box-shadow');
    this.renderer.removeStyle(this.el.nativeElement, 'transform');
  }
}

