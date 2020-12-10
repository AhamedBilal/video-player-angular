import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
// @ts-ignore
import Plyr from 'plyr';
import Hls from 'hls.js';
import {VideoPlayerService} from '../video-player.service';
import {Subscription} from 'rxjs';

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
  errors: string = null;
  private subscription: Subscription;
  interval: any;
  @Input() wait = 0;
  @Input() delay = 5;
  @Input() watermark;

  constructor(private elementRef: ElementRef, private service: VideoPlayerService) {
    this.subscription = service.plyrResetEvent().subscribe(value => {
      this.player.stop();
    });
  }

  ngOnInit(): void {
    const video = this.target.nativeElement;
    const defaultOptions: any = {};
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.attachMedia(video);
      hls.on(Hls.Events.MEDIA_ATTACHED, () => {
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
          this.genrateWaterMark();
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
        hls.on(Hls.Events.ERROR, (event, data) => {
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                // try to recover network error
                console.log('fatal network error encountered, try to recover');
                this.errors = 'fatal network error encountered, try to recover';
                hls.startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                console.log('fatal media error encountered, try to recover');
                this.errors = 'fatal media error encountered, try to recover';
                hls.recoverMediaError();
                break;
              default:
                // cannot recover
                this.errors = `can't be recovered`;
                hls.destroy();
                break;
            }
          }
        });
      });
      // @ts-ignore
      window.hls = hls;
    } else {
      const player = new Plyr(video, defaultOptions);
      this.errors = `no hls support please change your browser`;

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
    this.subscription.unsubscribe();
    clearInterval(this.interval);
  }

  genrateWaterMark() {
    if (this.watermark) {
      const watermark = document.querySelector('.plyr__controls');
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

  onResize() {
    if (this.target.nativeElement) {
      const h = this.target.nativeElement.offsetHeight;
      const menus = document.querySelectorAll('.plyr__menu__container [role=menu]');
      // @ts-ignore
      menus.forEach(item => item.style.maxHeight = h * 0.5 + 'px');
    }
  }
}
