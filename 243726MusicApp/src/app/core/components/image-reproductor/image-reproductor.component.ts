import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-reproductor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-reproductor.html',
  styleUrls: ['./image-reproductor.css'] 
})
export class ImageReproductorComponent {
  
  @Input() imageUrl: string = '';
  @Input() title: string = '';
  @Input() artist: string = '';

}