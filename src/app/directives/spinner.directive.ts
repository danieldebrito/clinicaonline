// spinner.directive.ts
import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appSpinner]'
})
export class SpinnerDirective implements OnChanges {
  @Input() appSpinner: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['appSpinner']) {
      this.updateSpinner();
    }
  }

  private updateSpinner() {
    if (this.appSpinner) {
      this.renderer.addClass(this.el.nativeElement, 'spinner');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'spinner');
    }
  }
}
