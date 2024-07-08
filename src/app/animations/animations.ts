import {
  trigger,
  transition,
  style,
  query,
  animate,
  group
} from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
  transition('* <=> *', [
    style({ opacity: 0 }),
    animate('0.5s', style({ opacity: 1 }))
  ])
]);

export const slideInAnimation = trigger('routeAnimations', [
  transition('selector <=> registro', [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        width: '100%',
      })
    ], { optional: true }),
    group([
      query(':enter', [
        style({ transform: 'translateX(100%)' }), // Start from right
        animate('500ms ease', style({ transform: 'translateX(0%)' })) // Animate to in view
      ], { optional: true }),
      query(':leave', [
        style({ transform: 'translateX(0%)' }),
        animate('500ms ease', style({ transform: 'translateX(-100%)' })) // Animate out of view to the left
      ], { optional: true })
    ])
  ])
]);

export const loginHomeAnimation = trigger('routeAnimations', [
  transition('sign-in <=> home', [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        width: '100%',
      })
    ], { optional: true }),
    group([
      query(':enter', [
        style({ transform: 'translateY(-100%)' }), // Start from above
        animate('500ms ease', style({ transform: 'translateY(0%)' })) // Animate to in view
      ], { optional: true }),
      query(':leave', [
        style({ transform: 'translateY(0%)' }),
        animate('500ms ease', style({ transform: 'translateY(100%)' })) // Animate to below
      ], { optional: true })
    ])
  ])
]);
