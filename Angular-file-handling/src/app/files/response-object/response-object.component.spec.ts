import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseObjectComponent } from './response-object.component';

describe('ResponseObjectComponent', () => {
  let component: ResponseObjectComponent;
  let fixture: ComponentFixture<ResponseObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponseObjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
