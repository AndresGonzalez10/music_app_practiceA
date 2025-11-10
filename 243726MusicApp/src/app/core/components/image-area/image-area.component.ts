import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-area',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="music-card" (click)="onClick()">
      <div class="card-image">
        <img *ngIf="imageUrl" [src]="imageUrl" [alt]="title">
        <div *ngIf="!imageUrl" class="placeholder-image"></div>
      </div>
      <div class="card-info">
        <span class="card-title">{{ title }}</span>
        <span class="card-subtitle">{{ artist }}</span>
      </div>
    </div>
  `,
  styleUrls: ['./image-area.css']
})
export class ImageAreaComponent {
  
  @Input() imageUrl: string = '';
  @Input() title: string = 'Sin Título';
  @Input() artist: string = 'Artista Desconocido';
  @Input() albumData: any;
  
  @Output() albumClick = new EventEmitter<any>();

  onClick(): void {
    this.albumClick.emit(this.albumData);
  }

}