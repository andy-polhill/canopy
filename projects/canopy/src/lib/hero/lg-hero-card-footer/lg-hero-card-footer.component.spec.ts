import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LgHeroCardFooterComponent } from './lg-hero-card-footer.component';

describe('LgHeroCardFooterComponent', () => {
  let component: LgHeroCardFooterComponent;
  let fixture: ComponentFixture<LgHeroCardFooterComponent>;
  let debugElement: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LgHeroCardFooterComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LgHeroCardFooterComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    el = debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct class', () => {
    expect(el.getAttribute('class')).toContain('lg-hero-card-footer');
  });
});
