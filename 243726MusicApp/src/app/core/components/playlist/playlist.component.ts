import { Component } from '@angular/core';
import { Songs } from "../songsc/songsc";

@Component({
  selector: 'app-playlist',
  imports: [Songs],
  templateUrl: './playlist.html',
  styleUrl: './playlist.css',
})
export class PlaylistComponent {

}
