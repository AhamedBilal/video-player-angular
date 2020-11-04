import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'video-player';
  options = {
    autoplay: false,
    fluid: true,
    controls: true,
    response: true,
    muted: false,
    responsive: true,
    sources: [{src: 'http://puremaths.lk:1935/vod/smil:b.smil/playlist.m3u8', type: 'application/x-mpegURL'}]
  };
}
