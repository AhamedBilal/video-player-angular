import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import {MediaLengthPipe} from './media-length.pipe';

@NgModule({
  declarations: [
    AppComponent,
    VideoPlayerComponent,
    MediaLengthPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
