import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as albumData from '../data/SearchResultsAlbums.json';
import * as artistData from '../data/SearchResultsArtist.json';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css']
})
export class ArtistDiscographyComponent implements OnInit {
  album:any;
  artist:any;

  constructor(private route: ActivatedRoute,private musicdataservice:MusicDataService) { }

  ngOnInit(): void {
     // this.album=albumData.albums.items;
   // this.artist=(artistData as any).default;
    const id = this.route.snapshot.params['id'];
   
    this.musicdataservice.getArtistsById(id).subscribe(artistData=>{
      //console.log(artistData)
      this.artist=artistData;
      this.musicdataservice.getAlbumsByArtistId(id).subscribe(albumData=>{
        console.log(albumData);
        this.album=albumData.items.filter(function( item:any, index:number, inputArray:any[] ) {
          return inputArray.indexOf(item) == index;
   })
      })
    })
  
  }

}
