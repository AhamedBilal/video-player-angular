import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import videojs from 'video.js';
import {Subscription} from 'rxjs';
import {VideoPlayerService} from '../video-player.service';

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
  @Input() options: any;
  player: videojs.Player;
  isFirst = true;

  @Output() replayed = new EventEmitter();
  @Output() played = new EventEmitter();
  @Output() errorOccurred = new EventEmitter();
  private subscription: Subscription;
  interval: any;
  @Input() wait = 0;
  @Input() delay = 5;
  @Input() watermark;

  constructor(private elementRef: ElementRef, private service: VideoPlayerService) {
    this.subscription = service.vjsResetEvent().subscribe(() => {
      this.player.reset();
      this.player.src(this.options.sources[0].src);
      this.player.pause();
    });
  }

  ngOnInit(): void {
    // console.log(this.options);
    const src = this.options.sources[0].src;
    const Button = videojs.getComponent('Button');
    const replayButton = videojs.extend(Button, {
      constructor: function() {
        Button.apply(this, arguments);
        this.controlText('Replay');
        /* initialize your button */
      },
      handleClick: () => {
        const time = this.player.currentTime();
        console.log('replay');
        this.player.reset();
        this.player.src(src);
        this.player.play();
        this.isFirst = true;
        if (this.player.currentTime() > this.player.duration() * 0.8) {
          this.replayed.emit(time);
        }
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
    this.player.on('timeupdate', () => {
      if (this.player.currentTime() > this.player.duration() * 0.8 && this.isFirst) {
        this.isFirst = false;
        this.played.emit(this.player.currentTime());
      }
    });
    this.genrateWaterMark();
    this.player.on('error', (ev) => {
      this.errorOccurred.emit(ev);
    });
  }

  genrateWaterMark() {
    if (this.watermark) {
      const watermark = document.querySelector('.vjs-text-track-display');
      const html = document.createElement('div');
      html.setAttribute('class', 'unselectable');
      html.setAttribute('style', 'position: absolute;top: 0px;left: 5px;font-size:12px;color: #fff;z-index:10');
      html.innerHTML = this.watermark;
      watermark.after(html);
      const repeat = async (time) => {
        Object.assign(html.style, {top: `${Math.random() * 80}%`, left: `${Math.random() * 80}%`});
        if (this.wait > 0) {
          await this.resolveAfterSeconds(this.wait);
          html.style.visibility = 'hidden';
        }
        await this.resolveAfterSeconds(this.delay);
        html.style.visibility = 'visible';
        requestAnimationFrame(repeat);
      };
      requestAnimationFrame(repeat);
    }
  }

  resolveAfterSeconds(sec: number): Promise<any> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, sec * 1000);
    });
  }

  ngOnDestroy(): void {
    if (this.player) {
      this.player.dispose();
    }
    this.subscription.unsubscribe();
    clearInterval(this.interval);
  }

}
