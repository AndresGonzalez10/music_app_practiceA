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

  private history = new BehaviorSubject<Track[]>([]);
  public history$: Observable<Track[]> = this.history.asObservable();

  public playTrack(track: Track): void {
    const oldTrack = this.currentTrack.value;
    if (oldTrack) {
      this.history.next([oldTrack, ...this.history.value]);
    }
    this.currentTrack.next(track);
  }

  public addToPlaylist(track: Track): void {
    const currentPlaylist = this.playlist.value;
    currentPlaylist.push(track);
    this.playlist.next(currentPlaylist);
  }

  public clearPlaylist(): void {
    this.playlist.next([]);
    this.history.next([]);
  }

  public playNext(): void {
    const playlist = this.playlist.value;
    if (playlist.length === 0) {
      console.log('Playlist terminada.');
      return;
    }

    const nextTrack = playlist.shift();
    this.playlist.next(playlist);

    if (nextTrack) {
      this.playTrack(nextTrack);
    }
  }

  public playPrevious(): void {
    const history = this.history.value;
    if (history.length === 0) {
      console.log('No hay historial anterior.');
      return;
    }

    const prevTrack = history.shift();
    this.history.next(history);

    const currentTrack = this.currentTrack.value;
    if (currentTrack) {
      this.playlist.next([currentTrack, ...this.playlist.value]);
    }
    
    if (prevTrack) {
      this.currentTrack.next(prevTrack);
    }
  }
}