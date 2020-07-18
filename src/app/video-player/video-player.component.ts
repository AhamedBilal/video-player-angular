import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {

  @ViewChild('video', {static: true}) videoRef: ElementRef;
  @ViewChild('player', {static: true}) playerRef: ElementRef;
  video: HTMLVideoElement;
  player: HTMLDivElement;
  currentTime = '0%';
  buffered = '0%';
  isPlaying = false;
  hoveredTime = 0;

  constructor() {
  }

  ngOnInit(): void {
    this.player = this.playerRef.nativeElement;
    this.video = this.videoRef.nativeElement;
    const supportsVideo = !!document.createElement('video').canPlayType;

    if (supportsVideo) {
      this.player = this.playerRef.nativeElement;
      this.video = this.videoRef.nativeElement;

      // Check the volume
      // const checkVolume = function(dir) {
      //   if (dir) {
      //     const currentVolume = Math.floor(video.volume * 10) / 10;
      //     if (dir === '+') {
      //       if (currentVolume < 1) { video.volume += 0.1; }
      //     }
      //     else if (dir === '-') {
      //       if (currentVolume > 0) { video.volume -= 0.1; }
      //     }
      //     // If the volume has been turned off, also set it as muted
      //     // Note: can only do this with the custom control set as when the 'volumechange' event is raised, there is no way to know if it was via a volume or a mute change
      //     if (currentVolume <= 0) { video.muted = true; }
      //     else { video.muted = false; }
      //   }
      //   changeButtonState('mute');
      // };
    }
  }

  onTimeUpdate($event: Event) {
    this.currentTime = `${this.video.currentTime / this.video.duration * 100}%`;
  }

  onProgress($event: ProgressEvent) {
    if (this.video.buffered && this.video.buffered.length !== 0) {
      console.log(this.video.buffered.length);
      const val = this.video.currentTime / this.video.duration;
      const currentTime = this.video.currentTime;
      if (val < 0.5) {
        for (let i = 0; i < this.video.buffered.length; i++) {
          if (this.video.buffered.start(i) < currentTime && this.video.buffered.end(i) > currentTime) {
            this.buffered = `${this.video.buffered.end(i) / this.video.duration * 100}%`;
            break;
          }
        }
      } else {
        for (let i = this.video.buffered.length - 1; i >= 0; i--) {
          if (this.video.buffered.start(i) < currentTime && this.video.buffered.end(i) > currentTime) {
            this.buffered = `${this.video.buffered.end(i) / this.video.duration * 100}%`;
            break;
          }
        }
      }
    }
  }

  togglePlay() {
    if (this.video.paused || this.video.ended) {
      this.video.play();
    } else {
      this.video.pause();
    }
    this.isPlaying = !this.isPlaying;
  }

  isFullScreen() {
    return this.player.offsetWidth === screen.width && this.player.offsetHeight === screen.height;
  }

  toggleFullScreen() {
    if (this.isFullScreen()) {
      document.exitFullscreen();
    } else {
      this.player.requestFullscreen({navigationUI: 'show'});
    }
  }

  changeProgress(e: MouseEvent) {
    // @ts-ignore
    const val = e.offsetX / e.target.offsetWidth;
    // @ts-ignore
    this.video.currentTime = val * this.video.duration;
    this.currentTime = `${val * 100}%`;
    console.log(this.video.buffered);
  }

  onSeeked($event: Event) {
    // console.log($event);
  }

  onSeeking($event: Event) {
    // console.log($event);
  }

  onMouseMove(event: MouseEvent, tooltip: HTMLSpanElement) {
    const offsetWidth = tooltip.offsetWidth / 2;
    console.log(tooltip.offsetWidth / 2);
    // @ts-ignore
    if (offsetWidth < event.offsetX && (event.offsetX + offsetWidth) < event.target.offsetWidth) {
      tooltip.style.left = event.offsetX - offsetWidth + 'px';
    }
    // @ts-ignore
    this.hoveredTime = event.offsetX / event.target.offsetWidth * this.video.duration;
  }
}
