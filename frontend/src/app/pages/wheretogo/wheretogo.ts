import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from "@angular/material/card";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatOption, MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-wheretogo',
  imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatFormField,  MatLabel],
  templateUrl: './wheretogo.html',
  styleUrl: './wheretogo.scss'
})
export class WhereToGo {
  selectedCity:number=1;

}
