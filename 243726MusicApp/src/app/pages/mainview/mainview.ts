import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { SpotifyService } from '../../services/spotify';
import { SearchService } from '../../services/search';
import { PlayerService } from '../../services/player-service';
import { ImageAreaComponent } from '../../core/components/image-area/image-area.component';
import { ImageArtisComponent } from '../../core/components/image-artis/image-artis.component';
import { NanvBar } from "../../core/components/nanv-bar/nanv-bar";
import { ReproductorComponent } from "../../core/components/reproductor/reproductor.component";
import { Songs2Component } from "../../core/components/songs2/songs2.component";

@Component({
  selector: 'app-mainview',
  standalone: true,
  imports: [
    CommonModule,
    ImageAreaComponent,
    ImageArtisComponent,
    NanvBar,
    ReproductorComponent,
    Songs2Component
  ],
  templateUrl: './mainview.html',
  styleUrl: './mainview.css',
})
export class Mainview {
  
  private results$: Observable<any>;
  public albums$: Observable<any>;
  public artists$: Observable<any>;
  public tracks$: Observable<any>;

  constructor(
    private spotifyService: SpotifyService,
    private searchService: SearchService,
    private playerService: PlayerService
  ) {
    
    this.results$ = this.searchService.searchTerm$.pipe(
      switchMap(term => this.spotifyService.searchAll(term))
    );

    this.albums$ = this.results$.pipe(
      map(results => results.albums)
    );

    this.artists$ = this.results$.pipe(
      map(results => results.artists)
    );
    
    this.tracks$ = this.results$.pipe(
      map(results => results.tracks)
    );
  }

 onAlbumClick(album: any): void {
    this.spotifyService.getAlbumTracks(album.id).subscribe({
      next: (tracks) => {
        if (tracks && tracks.items && tracks.items.length > 0) {
          const fullTracks = tracks.items.map((track: any) => {
            track.album = { images: album.images }; 
            return track;
          });

          this.playerService.clearPlaylist();
          this.playerService.playTrack(fullTracks[0]);
          for (let i = 1; i < fullTracks.length; i++) {
            this.playerService.addToPlaylist(fullTracks[i]);
          }
        }
      },
      error: (error) => {
        console.error('Error loading album tracks:', error);
      }
    });
  }
}