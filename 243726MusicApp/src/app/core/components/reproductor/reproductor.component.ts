import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { PlayerService, Track } from '../../../services/player-service';
import { ImageReproductorComponent } from '../image-reproductor/image-reproductor.component';
import { ProgresBarComponent } from '../progres-bar/progres-bar.component';
import { PlaylistComponent } from '../playlist/playlist.component'; 

@Component({
  selector: 'app-reproductor',
  standalone: true,
  imports: [
    CommonModule, 
    ImageReproductorComponent, 
    ProgresBarComponent,
    PlaylistComponent 
  ],
  templateUrl: './reproductor.html',
  styleUrls: ['./reproductor.css']
})
export class ReproductorComponent implements OnInit, OnDestroy {

  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;
  
  public currentTrack: Track | null = null;
  public isPlaying: boolean = false;
  public currentTime: number = 0;
  public duration: number = 0;
  
  private playerSubscription: Subscription | undefined;

  public cardImageUrl: string = '';
  public cardTitle: string = 'Song Name';
  public cardArtist: string = 'Artist Name';
  
  public isPlayerVisible: boolean = true; 

  constructor(
    private playerService: PlayerService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.playerSubscription = this.playerService.currentTrack$.subscribe(track => {
      if (track) {
        this.currentTrack = track;
        this.cardTitle = track.name;
        this.cardArtist = track.artistName;
        this.cardImageUrl = track.albumImageUrl;
        
        setTimeout(() => this.loadTrack(track.preview_url), 0);
      }
    });
  }
  
  ngOnDestroy(): void {
    this.playerSubscription?.unsubscribe();
  }

  loadTrack(previewUrl: string | null): void {
    if (this.audioPlayer) {
      if (previewUrl) {
        this.audioPlayer.nativeElement.src = previewUrl;
        this.audioPlayer.nativeElement.load();
        this.play();
      } else {
        console.warn('Esta canción no tiene vista previa (preview_url).');
        this.pause();
      }
    }
  }

  play(): void {
    if (this.currentTrack && this.currentTrack.preview_url && this.audioPlayer) {
      this.audioPlayer.nativeElement.play().then(() => {
        this.isPlaying = true;
      }).catch(e => console.error("Error al reproducir audio:", e));
    }
  }

  pause(): void {
    if (this.audioPlayer) {
      this.audioPlayer.nativeElement.pause();
    }
    this.isPlaying = false;
  }

  togglePlayPause(): void {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  onTimeUpdate(): void {
    this.currentTime = this.audioPlayer.nativeElement.currentTime;
    this.cdr.detectChanges();
  }

  onLoadedMetadata(): void {
    this.duration = this.audioPlayer.nativeElement.duration;
    this.cdr.detectChanges();
  }

  onSeek(newTime: number): void {
    if (this.audioPlayer) {
      this.audioPlayer.nativeElement.currentTime = newTime;
    }
  }

  hidePlayer() { this.isPlayerVisible = false; }
  showPlayer() { this.isPlayerVisible = true; }
}