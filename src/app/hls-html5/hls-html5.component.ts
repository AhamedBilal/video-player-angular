import { Component, OnInit } from '@angular/core';
import Hls from 'hls.js';

@Component({
  selector: 'app-hls-html5',
  templateUrl: './hls-html5.component.html',
  styleUrls: ['./hls-html5.component.css']
})
export class HlsHtml5Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const video = document.getElementById('video') as HTMLVideoElement;
    const videoSrc = 'http://puremaths.lk:1935/vod/smil:1605879914668video.smil/playlist.m3u8';
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        // video.play();
      });
    }
      // hls.js is not supported on platforms that do not have Media Source
      // Extensions (MSE) enabled.
      //
      // When the browser has built-in HLS support (check using `canPlayType`),
      // we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video
      // element through the `src` property. This is using the built-in support
      // of the plain video element, without using hls.js.
      //
      // Note: it would be more normal to wait on the 'canplay' event below however
      // on Safari (where you are most likely to find built-in HLS support) the
      // video.src URL must be on the user-driven white-list before a 'canplay'
      // event will be emitted; the last video event that can be reliably
    // listened-for when the URL is not on the white-list is 'loadedmetadata'.
    else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = videoSrc;
      video.addEventListener('loadedmetadata', function() {
        video.play();
      });
    }
  }

}
