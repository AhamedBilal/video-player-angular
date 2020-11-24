import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
// @ts-ignore
import Plyr from 'plyr';
import Hls from 'hls.js';

@Component({
  selector: 'app-video-plyr',
  templateUrl: './video-plyr.component.html',
  styleUrls: ['./video-plyr.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class VideoPlyrComponent implements OnInit {

  @ViewChild('target', {static: true}) target: ElementRef;

  @Input() link: string;
  @Output() played = new EventEmitter();

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    const video = this.target.nativeElement;
    const defaultOptions: any = {};
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(this.link);
      // @ts-ignore
      hls.on(Hls.Events.MANIFEST_PARSED,  (event, data) => {
        const availableQualities = hls.levels.map((l) => l.height);
        defaultOptions.quality = {
          default: availableQualities[0],
          options: availableQualities,
          forced: true,
          onChange: (e) => updateQuality(e),
        };
        const player = new Plyr(video, defaultOptions);
      });
      hls.attachMedia(video);
      // @ts-ignore
      window.hls = hls;
    } else {
      // default options with no quality update in case Hls is not supported
      const player = new Plyr(video, defaultOptions);
    }

    function updateQuality(newQuality) {
      // @ts-ignore
      window.hls.levels.forEach((level, levelIndex) => {
        if (level.height === newQuality) {
          console.log('Found quality match with ' + newQuality);
          // @ts-ignore
          window.hls.currentLevel = levelIndex;
        }
      });
    }
  }

}
