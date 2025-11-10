import { Component, OnInit } from '@angular/core';
import { ImageAreaComponent } from '../../core/components/image-area/image-area.component';
import { ImageArtisComponent } from '../../core/components/image-artis/image-artis.component';
import { NanvBar } from "../../core/components/nanv-bar/nanv-bar";
import { ReproductorComponent } from "../../core/components/reproductor/reproductor.component";
import { Songs2Component } from "../../core/components/songs2/songs2.component";
import { SpotifyService } from '../../services/spotify';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

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
export class Mainview implements OnInit {
  
  public albums$: Observable<any> | undefined;
  public artists$: Observable<any> | undefined;
  public tracks$: Observable<any> | undefined;

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit() {
    this.albums$ = this.spotifyService.searchAlbums('');
    this.artists$ = this.spotifyService.searchArtists('');
    this.tracks$ = this.spotifyService.searchTracks('');
  }
}