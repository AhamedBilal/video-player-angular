import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualVjsComponent } from './manual-vjs.component';

describe('ManualVjsComponent', () => {
  let component: ManualVjsComponent;
  let fixture: ComponentFixture<ManualVjsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualVjsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualVjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
