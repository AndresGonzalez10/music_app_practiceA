import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, switchMap, of, filter, take } from 'rxjs';

interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  
  private clientId = '43ee895f2568414488c00bd8fd722ca8';
  private clientSecret = '53d60a801e0142579d19b8f75dd730d9';
  private tokenUrl = '/api/token'; 
  private searchUrl = '/api/v1/search'; 
  private albumTracksUrlBase = '/api/v1/albums'; 
 

  private accessToken = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {
    this.getAccessToken(); 
  }

  private getAccessToken() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(this.clientId + ':' + this.clientSecret)
    });
    const body = new HttpParams().set('grant_type', 'client_credentials');

    this.http.post<SpotifyTokenResponse>(this.tokenUrl, body.toString(), { headers })
      .subscribe({
        next: (response) => {
          this.accessToken.next(response.access_token);
        },
        error: (err) => {
          console.error("Error al obtener el token de Spotify:", err);
        }
      });
  }

  private getValidToken(): Observable<string> {
    return this.accessToken.pipe(
      filter(token => token !== null),
      take(1)
    ) as Observable<string>;
  }

  public searchAll(query: string): Observable<any> {
    if (!query) {
      return of({ albums: null, artists: null, tracks: null });
    }
    return this.getValidToken().pipe(
      switchMap(token => {
        const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
        const params = new HttpParams()
          .set('q', query)
          .set('type', 'album,artist,track')
          .set('limit', '8');
        return this.http.get(this.searchUrl, { headers, params });
      })
    );
  }

  public getAlbumTracks(albumId: string): Observable<any> {
    return this.getValidToken().pipe(
      switchMap(token => {
        const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
        return this.http.get(`${this.albumTracksUrlBase}/${albumId}/tracks`, { headers });
      })
    );
  }
}