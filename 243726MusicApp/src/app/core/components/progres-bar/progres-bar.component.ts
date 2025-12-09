import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progres-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progres-bar.html',
  styleUrls: ['./progres-bar.css'],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class ProgresBarComponent {

  @Input() currentTime: number = 0;
  @Input() duration: number = 0;
  @Output() seek = new EventEmitter<number>();

  formatTime(timeInSeconds: number): string {
    if (!timeInSeconds || !isFinite(timeInSeconds)) {
        return '0:00';
    }
    
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  onSeek(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.seek.emit(parseFloat(input.value));
  }
}