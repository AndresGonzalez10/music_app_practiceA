import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// 1. Importa el SearchComponent (el buscador)
import { SearchComponent } from '../search/search.component';
// (Ajusta la ruta si es necesario, la tuya era: "../search/search")

@Component({
  selector: 'app-nanv-bar',
  
  // 2. Declara que es un componente 'standalone'
  standalone: true,
  
  // 3. Importa CommonModule y el SearchComponent
  imports: [CommonModule, SearchComponent],
  
  templateUrl: './nanv-bar.html',
  styleUrl: './nanv-bar.css',
})
// 4. Usa el nombre de clase 'NanvBar' (que es el que usas en Mainview)
export class NanvBar {

}