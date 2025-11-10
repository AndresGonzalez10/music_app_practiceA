import { Component } from '@angular/core';
import { ProgresBarComponent } from '../../core/components/progres-bar/progres-bar.component';
import { PlaylistComponent } from '../../core/components/playlist/playlist.component';
import { ImageReproductorComponent } from '../../core/components/image-reproductor/image-reproductor.component';
import { SearchComponent } from '../../core/components/search/search.component';

@Component({
  selector: 'app-reproductor-view',
  imports: [ProgresBarComponent, PlaylistComponent, ImageReproductorComponent, SearchComponent],
  templateUrl: './reproductor-view.html',
  styleUrl: './reproductor-view.css',
})
export class ReproductorView {

}
