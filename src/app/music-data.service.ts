import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SpotifyTokenService } from './spotify-token.service';

import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MusicDataService {
  favouriteList:any[]=[];

  constructor(private spotifyToken: SpotifyTokenService, private http: HttpClient) { }  

  getNewReleases(): Observable<any> {
      return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
        return this.http.get<any>("https://api.spotify.com/v1/browse/new-releases", { headers: { "Authorization": `Bearer ${token}` } });
      }));
  }
  getArtistsById(id:string): Observable<any> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<any>(`https://api.spotify.com/v1/artists/${id}`, { headers: { "Authorization": `Bearer ${token}` } });
    }));
}

getAlbumsByArtistId(id:string): Observable<any> {
  return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
    return this.http.get<any>(`https://api.spotify.com/v1/artists/${id}/albums?include_groups=album,single&limit=50`, { headers: { "Authorization": `Bearer ${token}` } });
  }));
}

getAlbumById(id:string): Observable<any> {
  return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
    return this.http.get<any>(`https://api.spotify.com/v1/albums/${id}`, { headers: { "Authorization": `Bearer ${token}` } });
  }));
}

searchArtists(searchString:string):Observable<any>{
  return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
    return this.http.get<any>(`https://api.spotify.com/v1/search?q=${searchString}&type=artist&limit=50`, { headers: { "Authorization": `Bearer ${token}` } });
  }));

}

addToFavourites(id:string):boolean{
  if((this.favouriteList.length<=50) && (id) )
  {
    this.favouriteList.push(id);
    return true;
  }

  return false;
}
removeFromFavourites(id:string):Observable<any>
{
const index = this.favouriteList.indexOf(id);
  if (index !== -1) {
    this.favouriteList.splice(index, 1);
  }
  return this.getFavourites();
}

getFavourites():Observable<any>
{
  if(this.favouriteList.length>0)
  {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<any>(`https://api.spotify.com/v1/tracks?id=${this.favouriteList.join(",")}`, { headers: { "Authorization": `Bearer ${token}` } });
    }))
  }

  return new Observable(o=>{o.next([])});

}

}