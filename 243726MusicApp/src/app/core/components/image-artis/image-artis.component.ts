import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-artis',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="artist-card-circular">
      <div class="artist-image">
        <img *ngIf="imageUrl" [src]="imageUrl" [alt]="artistName">
        <div *ngIf="!imageUrl" class="placeholder-artist-image"></div>
      </div>
      <div class="artist-info">
        <span class="artist-name">{{ artistName }}</span>
      </div>
    </div>
  `,
  
  styleUrls: ['./image-artis.css'] 
})
export class ImageArtisComponent {
  
  @Input() imageUrl: string = '';
  @Input() artistName: string = 'Artista Desconocido';

}