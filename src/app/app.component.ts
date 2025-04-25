import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template:`
    <div class="flex justify-center min-w-full min-h-screen p-0 m-0">
      <router-outlet></router-outlet>
    </div>
    `,
})
export class AppComponent {
  title = 'system-hospital-angular';
}
