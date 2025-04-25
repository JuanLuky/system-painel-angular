import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {

  constructor(private router: Router) { }

  onBack() {
    this.router.navigate(['/']);
  }
}
