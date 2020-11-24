import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import videojs from 'video.js';

declare var require: any;
require('videojs-contrib-quality-levels');
require('videojs-hls-quality-selector');

@Component({
  selector: 'app-manual-vjs',
  templateUrl: './manual-vjs.component.html',
  styleUrls: ['./manual-vjs.component.css']
})
export class ManualVjsComponent implements OnInit, OnDestroy {

  @ViewChild('target', {static: true}) target: ElementRef;
  @Input() options: any;
  player: videojs.Player;
  isFirst = true;

  @Output() replayed = new EventEmitter();
  @Output() played = new EventEmitter();
  @Output() errorOccurred = new EventEmitter();

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    const videoPlayer = document.getElementById('my-player');
    this.player = videojs(videoPlayer, this.options, function onPlayerReady() {
      console.log('onPlayerReady', this);
      // this.play();
    });
  }

  ngOnDestroy(): void {
    if (this.player) {
      this.player.dispose();
    }
  }
}
