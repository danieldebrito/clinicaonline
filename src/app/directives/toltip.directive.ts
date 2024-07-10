import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {
  @Input('appTooltip') tooltipText: string = '';

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter')
  showTooltip() {
    // Muestra el tooltip al pasar el mouse por encima
    this.el.nativeElement.title = this.tooltipText;
  }

  @HostListener('mouseleave')
  hideTooltip() {
    // Oculta el tooltip al quitar el mouse
    this.el.nativeElement.title = '';
  }
}
