import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NanvBar } from './nanv-bar';

describe('NanvBar', () => {
  let component: NanvBar;
  let fixture: ComponentFixture<NanvBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NanvBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NanvBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
