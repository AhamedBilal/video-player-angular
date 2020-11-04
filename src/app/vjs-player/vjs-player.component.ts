import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import videojs from 'video.js';

declare var require: any;
require('videojs-contrib-quality-levels');
require('videojs-hls-quality-selector');

@Component({
  selector: 'app-vjs-player',
  templateUrl: './vjs-player.component.html',
  styleUrls: ['./vjs-player.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class VjsPlayerComponent implements OnInit, OnDestroy {

  @ViewChild('target', {static: true}) target: ElementRef;

  @Input() options: {
    fluid: boolean,
    aspectRatio: string,
    autoplay: boolean,
    sources: {
      src: string,
      type: string,
      poster: string,
    }[],
  };
  player: videojs.Player;

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    // instantiate Video.js
    this.player = videojs(this.target.nativeElement, this.options, function onPlayerReady() {
      console.log('onPlayerReady', this);
      // tslint:disable-next-line:one-variable-per-declaration prefer-const
      let myPlayer = this, id = myPlayer.id();
      myPlayer.hlsQualitySelector();
    });
  }

  ngOnDestroy(): void {
    // destroy player
    if (this.player) {
      this.player.dispose();
    }
  }

}
