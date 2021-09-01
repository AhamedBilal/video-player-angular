import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {VideoPlayerService} from '../video-player.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-jwplayer',
  templateUrl: './jwplayer.component.html',
  styleUrls: ['./jwplayer.component.css']
})
export class JwplayerComponent implements OnInit, OnDestroy {

  @ViewChild('target', {static: true}) target: ElementRef;

  @Input() link: string;
  @Output() played = new EventEmitter();
  isFirst = true;
  player;
  private subscription: Subscription;
  interval: any;
  @Input() wait = 0;
  @Input() delay = 5;
  @Input() watermark;


  constructor(private elementRef: ElementRef, private service: VideoPlayerService) {
    this.subscription = service.jwpResetEvent().subscribe(value => {
      this.player.stop();
    });
  }

  ngOnInit(): void {
    // @ts-ignore
    jwplayer.key = 'CTD8LPSq';
    // @ts-ignore
    this.player = jwplayer(this.target.nativeElement).setup({
      file: this.link
    });

    // Listen to an event
    this.player.on('time', (event) => {
      if (event.currentTime > event.duration * 0.8 && this.isFirst) {
        this.played.emit(event.currentTime);
        this.isFirst = false;
      }
    });
    this.player.on('ready', () => {
      this.genrateWaterMark();
    });
  }

  genrateWaterMark() {
    if (this.watermark) {
      const watermark = document.querySelector('.jw-wrapper');
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
    this.player.remove();
    this.subscription.unsubscribe();
    clearInterval(this.interval);
  }

}
