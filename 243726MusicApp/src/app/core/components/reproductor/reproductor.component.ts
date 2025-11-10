import { Component } from '@angular/core';
import { ImageReproductor } from "../image-reproductor/image-reproductor";
import { ProgresBar } from "../progres-bar/progres-bar";
import { Playlist } from "../playlist/playlist";

@Component({
  selector: 'app-reproductor',
  imports: [ImageReproductor, ProgresBar, Playlist],
  templateUrl: './reproductor.html',
  styleUrl: './reproductor.css',
})
export class ReproductorComponent {

public isPlayerVisible: boolean = true;

  hidePlayer() {
    this.isPlayerVisible = false;
  }

  showPlayer() {
    this.isPlayerVisible = true;
  }
}
