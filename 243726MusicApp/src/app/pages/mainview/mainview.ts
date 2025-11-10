import { Component } from '@angular/core';
import { ImageAreaComponent } from '../../core/components/image-area/image-area.component';
import { ImageArtisComponent } from '../../core/components/image-artis/image-artis.component';
import { NanvBar } from "../../core/components/nanv-bar/nanv-bar";
import { ReproductorComponent } from "../../core/components/reproductor/reproductor.component";

@Component({
  selector: 'app-mainview',
  imports: [ImageAreaComponent, ImageArtisComponent, NanvBar, ReproductorComponent],
  templateUrl: './mainview.html',
  styleUrl: './mainview.css',
})
export class Mainview {

}
