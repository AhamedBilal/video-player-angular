import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HlsHtml5Component } from './hls-html5.component';

describe('HlsHtml5Component', () => {
  let component: HlsHtml5Component;
  let fixture: ComponentFixture<HlsHtml5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HlsHtml5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HlsHtml5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
