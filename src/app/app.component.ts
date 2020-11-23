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
    sources: [{src: 'http://puremaths.lk:1935/vod/smil:b.smil/playlist.m3u8', type: 'application/x-mpegURL'}],
    html5: {
      vhs: {
        overrideNative: true
      }
    }
  };
  play = true;

  onReplay(ev) {
    console.log(ev);
  }

  onPlayed(ev) {
    console.log(ev);
  }
}
