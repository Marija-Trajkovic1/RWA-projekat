import { Component } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';

@Component({
  selector: 'app-home',
  imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
