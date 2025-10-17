import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink, MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatButton],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
