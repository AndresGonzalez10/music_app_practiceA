import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-area',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-area.html',
  styleUrls: ['./image-area.css']
})
export class ImageAreaComponent {
  
  @Input() imageUrl: string = '';
  @Input() title: string = '';
  @Input() artist: string = '';
  @Input() albumData: any; 
  @Output() albumClick = new EventEmitter<any>();

  onCardClick(): void {
    this.albumClick.emit(this.albumData);
  }
}