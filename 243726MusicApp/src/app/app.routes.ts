import { Routes } from '@angular/router';
import { Mainview } from './pages/mainview/mainview';
import { ReproductorView } from './pages/reproductor-view/reproductor-view';

export const routes: Routes = [
    {
        path:"", component:Mainview
    },
    {
        path:"reproductor", component:ReproductorView
    }
];
