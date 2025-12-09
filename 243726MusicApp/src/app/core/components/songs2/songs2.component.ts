import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerService, Track } from '../../../services/player.service';

@Component({
  selector: 'app-songs2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './songs2.html',
  styleUrls: ['./songs2.css']
})
export class Songs2Component {
  
  @Input() trackData!: Track; 
  @Input() imageUrl: string = '';
  @Input() songName: string = 'Canción Desconocida';
  @Input() artistName: string = 'Artista Desconocido';
  @Input() durationMs: number = 0;

  constructor(private playerService: PlayerService) {}

  get duration(): string {
    if (!this.durationMs) return '0:00';
    const totalSeconds = Math.floor(this.durationMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  onPlay(): void {
    if (this.trackData) {
      this.playerService.playTrack(this.trackData);
    }
  }
}