import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { PlayerService, Track } from '../../../services/player-service';
import { Songs2Component } from '../songs2/songs2.component'; 

@Component({
  selector: 'app-playlist',
  standalone: true, 
  imports: [CommonModule, Songs2Component],  
  templateUrl: './playlist.html',
  styleUrl: './playlist.css',
})
export class PlaylistComponent {
  public playlist$: Observable<Track[]>;

  constructor(private playerService: PlayerService) {
    this.playlist$ = this.playerService.playlist$;
  }
}