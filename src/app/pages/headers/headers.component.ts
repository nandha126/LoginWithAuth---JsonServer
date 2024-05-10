import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-headers',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './headers.component.html',
  styleUrl: './headers.component.scss'
})
export class HeadersComponent {

  constructor(private router:Router) {}

  logout() {
    sessionStorage.clear();
    this.router.navigateByUrl('login');
  }
}
