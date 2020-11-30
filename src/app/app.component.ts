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
    preload: 'auto',
    responsive: true,
    sources: [{src: 'http://puremaths.lk:1935/vod/smil:1605866690245video.smil/playlist.m3u8', type: 'application/vnd.apple.mpegurl\''}],
    html5: {
      hls: {
        overrideNative: true
      },
      nativeAudioTracks: false,
      nativeVideoTracks: false
    }
  };
  play = true;

  link = 'http://puremaths.lk:1935/vod/smil:1605866690245video.smil/playlist.m3u8';
  // link = 'http://puremaths.lk:1935/vod/smil:1605879914668video.smil/playlist.m3u8';
  // link2 = 'http://puremaths.lk:1935/vod/mp4:1605866690245video.mp4/playlist.m3u8';

  constructor() {
    console.log('new update');
  }
  onReplay(ev) {
    console.log(ev);
  }

  onPlayed(ev) {
    console.log(ev);
  }
}
