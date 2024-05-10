import { Component } from '@angular/core';
import { HeadersComponent } from '../headers/headers.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeadersComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
