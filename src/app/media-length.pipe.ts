import {Pipe, PipeTransform} from '@angular/core';
import {formatNumber} from '@angular/common';

@Pipe({
  name: 'mediaLength'
})
export class MediaLengthPipe implements PipeTransform {

  transform(time: number, ...args: unknown[]): unknown {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time - (hours * 3600)) / 60);
    const seconds = Math.floor(time - (hours * 3600) - (minutes * 60));
    if (hours >= 1) {
      return formatNumber(hours, 'en-US', '2.0-0') + ':' + formatNumber(minutes, 'en-US', '2.0-0') + ':' + formatNumber(seconds, 'en-US', '2.0-0');
    } else {
      return formatNumber(minutes, 'en-US', '2.0-0') + ':' + formatNumber(seconds, 'en-US', '2.0-0');
    }
  }

}
