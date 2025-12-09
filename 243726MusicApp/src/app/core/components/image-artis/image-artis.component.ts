import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-artis',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-artis.html',
  styleUrls: ['./image-artis.css'] 
})
export class ImageArtisComponent {
  
  @Input() imageUrl: string = '';
  @Input() artistName: string = 'Artista Desconocido';

}