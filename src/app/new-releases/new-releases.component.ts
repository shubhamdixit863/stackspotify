import { Component, OnInit } from '@angular/core';
import * as data from '../data/NewReleasesAlbums.json';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css']
})
export class NewReleasesComponent implements OnInit {

  releases:any=null;
  constructor(
    private musicdataservice:MusicDataService

  ) { }

  ngOnInit(): void {
   // this.releases=data.albums.items
  this.musicdataservice.getNewReleases().subscribe(data=>{
    console.log(data)
    this.releases=data.albums.items
  })
  }

}
