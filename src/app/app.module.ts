import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import {MediaLengthPipe} from './media-length.pipe';
import { PlyrManualComponent } from './plyr-manual/plyr-manual.component';
import { VjsPlayerComponent } from './vjs-player/vjs-player.component';

@NgModule({
  declarations: [
    AppComponent,
    VideoPlayerComponent,
    MediaLengthPipe,
    PlyrManualComponent,
    VjsPlayerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
