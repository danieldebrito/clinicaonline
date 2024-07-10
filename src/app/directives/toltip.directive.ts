import { Directive, ElementRef, Input, Renderer2, HostListener, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appTooltip]',
})
export class TooltipDirective implements OnInit, OnDestroy {
  @Input('appTooltip') tooltipTitle: string = '';
  tooltip: HTMLElement | any = null;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
  }

  @HostListener('mouseenter') onMouseEnter() {
    if (!this.tooltip) {
      this.showTooltip();
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.tooltip) {
      this.hideTooltip();
    }
  }

  private showTooltip() {
    this.tooltip = this.renderer.createElement('span');
    this.renderer.appendChild(this.tooltip, this.renderer.createText(this.tooltipTitle));
    this.renderer.appendChild(this.el.nativeElement, this.tooltip);
    this.renderer.addClass(this.tooltip, 'tooltip');

    const hostPos = this.el.nativeElement.getBoundingClientRect();
    const tooltipPos = this.tooltip.getBoundingClientRect();

    const top = hostPos.top - tooltipPos.height -
      (this.el.nativeElement.style.paddingTop || 0) +
      (this.el.nativeElement.style.borderTopWidth || 0);
    const left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;

    this.renderer.setStyle(this.tooltip, 'top', `${top}px`);
    this.renderer.setStyle(this.tooltip, 'left', `${left}px`);
  }

  private hideTooltip() {
    if (this.tooltip) {
      this.renderer.removeChild(this.el.nativeElement, this.tooltip);
      this.tooltip = null;
    }
  }

  ngOnDestroy() {
    if (this.tooltip) {
      this.renderer.removeChild(this.el.nativeElement, this.tooltip);
      this.tooltip = null;
    }
  }
}
