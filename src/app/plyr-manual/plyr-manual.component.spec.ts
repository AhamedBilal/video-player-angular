import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlyrManualComponent } from './plyr-manual.component';

describe('PlyrManualComponent', () => {
  let component: PlyrManualComponent;
  let fixture: ComponentFixture<PlyrManualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlyrManualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlyrManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
