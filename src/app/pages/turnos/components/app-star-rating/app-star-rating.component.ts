import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-app-star-rating',
  templateUrl: './app-star-rating.component.html',
  styleUrls: ['./app-star-rating.component.scss']
})
export class AppStarRatingComponent {

  @Input() maxRating = 5;
  @Output() ratingClicked = new EventEmitter<number>();

  stars: number[] = [];
  selectedRating = 0;

  ngOnInit() {
    this.stars = Array(this.maxRating).fill(0).map((_, i) => i + 1);
  }

  rate(rating: number): void {
    this.selectedRating = rating;
    this.ratingClicked.emit(rating);
  }
}