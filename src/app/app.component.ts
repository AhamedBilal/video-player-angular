import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {VideoPlayerService} from './video-player.service';
import {DomSanitizer} from '@angular/platform-browser';
import {HttpClient, HttpHeaders} from '@angular/common/http';

// @ts-ignore
import Plyr from 'plyr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'video-player';
  src;
  optionsSG = {
    autoplay: false,
    fluid: true,
    controls: true,
    response: true,
    muted: false,
    preload: 'auto',
    responsive: true,
    sources: [{src: 'http://54.151.226.134:1935/vod/smil:1606441724762video.smil/playlist.m3u8', type: 'application/vnd.apple.mpegurl\''}]
  };
  optionsUS = {
    autoplay: false,
    fluid: true,
    controls: true,
    response: true,
    muted: false,
    preload: 'auto',
    responsive: true,
    sources: [{src: 'http://puremaths.lk:1935/vod/smil:1606441724762video.smil/playlist.m3u8', type: 'application/vnd.apple.mpegurl\''}]
  };
  play = true;
  linkSG = 'https://multiplatform-f.akamaihd.net/i/multi/april11/sintel/sintel-hd_,512x288_450_b,640x360_700_b,768x432_1000_b,1024x576_1400_m,.mp4.csmil/master.m3u8';
  isSG = true;
  linkUS = 'https://multiplatform-f.akamaihd.net/i/multi/april11/sintel/sintel-hd_,512x288_450_b,640x360_700_b,768x432_1000_b,1024x576_1400_m,.mp4.csmil/master.m3u8';
  player = 1;
  playerr = 1;

  constructor(private service: VideoPlayerService, private dom: DomSanitizer, private http: HttpClient) {
    console.log('new update');
  }

  onReplay(ev) {
    console.log(ev);
  }

  onPlayed(ev) {
    console.log(ev);
  }

  reloadVjs() {
    this.service.resetVJS();
  }

  reloadPlyr() {
    this.service.resetPlyr();
  }

  reloadJWP() {
    this.service.resetJWP();
  }

  onChange(ev: any) {
    console.log(ev);
    // @ts-ignore
    document.getElementById('frame').src = ev.target.value;
  }

  ngOnInit(): void {
    const plyr = new Plyr(document.getElementById('player'));
  }
}
