import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-nanv-bar',
  standalone: true,
  imports: [CommonModule, SearchComponent],
  
  templateUrl: './nanv-bar.html',
  styleUrl: './nanv-bar.css',
})
export class NanvBar {

}