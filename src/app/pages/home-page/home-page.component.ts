import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [CommonModule, RouterModule],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  today = new Date();
}
