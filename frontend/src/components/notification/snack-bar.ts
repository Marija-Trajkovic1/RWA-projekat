import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBar {

  constructor(private snackBar :MatSnackBar){
  }

  showSnackBar(message: string, duration:number, style:string){
    this.snackBar.open(message, 'Close',{
      duration,
      panelClass:[style]
    })
  }

  
}
