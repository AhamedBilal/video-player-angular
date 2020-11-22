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
    muted: boolean,
    responsive: boolean,
    aspectRatio: string,
    autoplay: boolean,
    width: number|string,
    height: string|number,
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
    const src = this.options.sources[0].src;
    const Button = videojs.getComponent('Button');
    const replayButton = videojs.extend(Button, {
      constructor: function(player, options) {
        console.log(player);
        Button.apply(this, arguments);
        this.controlText('Replay');
        /* initialize your button */
      },
      handleClick: function() {
        console.log('replay');
        this.player_.reset();
        this.player_.src(src);
        this.player_.play();
      },
      buildCSSClass: function() {
        return 'vjs-icon-replay replay-button';
      }
    });
    videojs.registerComponent('ReplayButton', replayButton);

   // replayBotton.addClass("html-classname");
    this.player = videojs(this.target.nativeElement, this.options, function onPlayerReady() {
      console.log('onPlayerReady', this);
      // tslint:disable-next-line:one-variable-per-declaration prefer-const
      let myPlayer = this, id = myPlayer.id();
      myPlayer.hlsQualitySelector({
        displayCurrentQuality: true,
      });
    });
    this.player.getChild('controlBar').addChild('ReplayButton', {}, 1);
  }

  ngOnDestroy(): void {
    if (this.player) {
      this.player.dispose();
    }
  }

}
