import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Track {
  name: string;
  artistName: string;
  albumImageUrl: string;
  preview_url: string | null; 
  duration_ms: number;
}

@Injectable({
  providedIn: 'root'
})
export class LocalMusicService {

  private localTracks: Track[] = [
    {
      name: "Beso",
      artistName: "Jósean Log",
      albumImageUrl: "/Assets/images/beso.jpg", 
      preview_url: "/Assets/audio/beso.mp3", 
      duration_ms: 211000 
    },

  ];

  // Convertimos el array en un Observable
  private localTracks$ = new BehaviorSubject<Track[]>(this.localTracks);

  public searchLocalTracks(term: string): Observable<Track[]> {
    if (!term) {
      return this.localTracks$.asObservable();
    }

    const lowerCaseTerm = term.toLowerCase();
    const filteredTracks = this.localTracks.filter(track => 
      track.name.toLowerCase().includes(lowerCaseTerm) || 
      track.artistName.toLowerCase().includes(lowerCaseTerm)
    );
    return of(filteredTracks);
  }
}