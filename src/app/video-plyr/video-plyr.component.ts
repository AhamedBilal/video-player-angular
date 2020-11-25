import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
// @ts-ignore
import Plyr from 'plyr';
import Hls from 'hls.js';

@Component({
  selector: 'app-video-plyr',
  templateUrl: './video-plyr.component.html',
  styleUrls: ['./video-plyr.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class VideoPlyrComponent implements OnInit, OnDestroy {

  @ViewChild('target', {static: true}) target: ElementRef;

  @Input() link: string;
  @Output() played = new EventEmitter();
  isFirst = true;
  player;

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    const video = this.target.nativeElement;
    const defaultOptions: any = {};
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(this.link);
      // @ts-ignore
      hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
        const availableQualities = hls.levels.map((l) => l.height);
        defaultOptions.quality = {
          default: availableQualities[0],
          options: availableQualities,
          forced: true,
          onChange: (e) => updateQuality(e),
        };
        this.player = new Plyr(video, defaultOptions);
        this.onResize();
        this.player.on('timeupdate', () => {
          if (this.player.currentTime > 5 * 60 && this.isFirst && this.player.playing) {
            console.log(this.player.playing, this.player.currentTime);
            this.played.emit(this.player.currentTime);
            this.isFirst = false;
          }
        });
        this.player.on('enterfullscreen', () => this.onResize());
        this.player.on('exitfullscreen', () => this.onResize());
      });
      hls.attachMedia(video);
      // @ts-ignore
      window.hls = hls;
    } else {
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

  ngOnDestroy(): void {
    this.player.destroy();
  }

  onResize() {
    if (this.target.nativeElement){
      const h = this.target.nativeElement.offsetHeight;
      const menus = document.querySelectorAll('.plyr__menu__container [role=menu]');
      // @ts-ignore
      menus.forEach(item => item.style.maxHeight = h * 0.5 + 'px');
    }
  }
}
