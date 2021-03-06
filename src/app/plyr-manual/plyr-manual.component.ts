import {Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
// @ts-ignore
import Plyr from 'plyr';
import Hls from 'hls.js';

@Component({
  selector: 'app-plyr-manual',
  templateUrl: './plyr-manual.component.html',
  styleUrls: ['./plyr-manual.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PlyrManualComponent implements OnInit {

  @ViewChild('target', {static: true}) target: ElementRef;

  @Input() link: string;

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    console.log('new');
    const video = this.target.nativeElement;
    const defaultOptions: any = {};
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(this.link);

      // From the m3u8 playlist, hls parses the manifest and returns
      // all available video qualities. This is important, in this approach,
      // we will have one source on the Plyr player.
      hls.on(Hls.Events.MANIFEST_PARSED,  (event, data) => {

        // Transform available levels into an array of integers (height values).
        const availableQualities = hls.levels.map((l) => l.height);

        // Add new qualities to option
        defaultOptions.quality = {
          default: availableQualities[0],
          options: availableQualities,
          // this ensures Plyr to use Hls to update quality level
          forced: true,
          onChange: (e) => updateQuality(e),
        };

        // Initialize here
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
