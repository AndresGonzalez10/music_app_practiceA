import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, combineLatest } from 'rxjs'; 
import { map, switchMap } from 'rxjs/operators';
import { SpotifyService } from '../../services/spotify';
import { SearchService } from '../../services/search';
import { PlayerService, Track } from '../../services/player-service';
import { LocalMusicService } from '../../services/local-music';
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
  
  public albums$: Observable<any>;
  public artists$: Observable<any>;
  public tracks$: Observable<Track[]>;

  constructor(
    private spotifyService: SpotifyService,
    private searchService: SearchService,
    private playerService: PlayerService,
    private localMusicService: LocalMusicService
  ) {
    
    const searchTerm$ = this.searchService.searchTerm$;

    const spotifyResults$ = searchTerm$.pipe(
      switchMap(term => this.spotifyService.searchAll(term))
    );

    const localResults$ = searchTerm$.pipe(
      switchMap(term => this.localMusicService.searchLocalTracks(term))
    );

    this.albums$ = spotifyResults$.pipe(map(results => results.albums));
    this.artists$ = spotifyResults$.pipe(map(results => results.artists));

    this.tracks$ = combineLatest([spotifyResults$, localResults$]).pipe(
      map(([spotifyResults, localTracks]) => {
        
        const spotifyTracks: Track[] = (spotifyResults.tracks?.items || []).map((track: any) => ({
          name: track.name,
          artistName: track.artists[0].name,
          albumImageUrl: track.album.images[0].url,
          preview_url: track.preview_url,
          duration_ms: track.duration_ms,
          spotifyData: track
        }));

        return [...localTracks, ...spotifyTracks];
      })
    );
  }

  onAlbumClick(album: any): void {
    this.spotifyService.getAlbumTracks(album.id).subscribe({
      next: (tracks) => {
        if (tracks && tracks.items && tracks.items.length > 0) {
          
          const fullTracks: Track[] = tracks.items.map((track: any) => {
            return {
              name: track.name,
              artistName: track.artists[0].name,
              albumImageUrl: album.images[0].url,
              preview_url: track.preview_url,
              duration_ms: track.duration_ms,
              spotifyData: track
            };
          });

          this.playerService.clearPlaylist();
          this.playerService.playTrack(fullTracks[0]);
          for (let i = 1; i < fullTracks.length; i++) {
            this.playerService.addToPlaylist(fullTracks[i]);
          }
        }
      },
      error: (error) => console.error('Error loading album tracks:', error)
    });
  }
}