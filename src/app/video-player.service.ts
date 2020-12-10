import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoPlayerService {

  private vjsReset = new Subject<any>();
  private plyrReset = new Subject<any>();
  private jwpReset = new Subject<any>();

  resetVJS() {
    this.vjsReset.next();
  }

  resetPlyr() {
    this.plyrReset.next();
  }

  resetJWP() {
    this.jwpReset.next();
  }

  vjsResetEvent(): Observable<any> {
    return this.vjsReset.asObservable();
  }

  plyrResetEvent(): Observable<any> {
    return this.plyrReset.asObservable();
  }

  jwpResetEvent(): Observable<any> {
    return this.jwpReset.asObservable();
  }
}
