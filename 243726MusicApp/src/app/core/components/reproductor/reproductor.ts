import { Component } from '@angular/core';
import { ImageReproductorComponent } from '../image-reproductor/image-reproductor.component';
import { ProgresBarComponent } from '../progres-bar/progres-bar.component';
import { PlaylistComponent } from '../playlist/playlist.component';

@Component({
  selector: 'app-reproductor',
  imports: [ImageReproductorComponent, ProgresBarComponent, PlaylistComponent],
  templateUrl: './reproductor.html',
  styleUrl: './reproductor.css',
})
export class Reproductor {
public isPlayerVisible: boolean = true;

  hidePlayer() {
    this.isPlayerVisible = false;
  }

  showPlayer() {
    this.isPlayerVisible = true;
  }
}
