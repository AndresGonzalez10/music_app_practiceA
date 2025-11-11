import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

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
export class PlayerService {

  private currentTrack = new BehaviorSubject<Track | null>(null);
  public currentTrack$: Observable<Track | null> = this.currentTrack.asObservable();
  
  private playlist = new BehaviorSubject<Track[]>([]);
  public playlist$: Observable<Track[]> = this.playlist.asObservable();

  public playTrack(track: Track): void {
    this.currentTrack.next(track);
  }

  public addToPlaylist(track: Track): void {
    const currentPlaylist = this.playlist.value;
    currentPlaylist.push(track);
    this.playlist.next(currentPlaylist);
  }

  public clearPlaylist(): void {
    this.playlist.next([]);
  }
}