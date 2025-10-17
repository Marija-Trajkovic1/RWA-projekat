import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, MatToolbar, MatButton],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {}
