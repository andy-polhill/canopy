import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';
import { mock } from 'ts-mockito';
import { LgIconRegistry } from '../../icon';
import { LgIconComponent } from '../../icon/icon.component';
import { LgBreadcrumbItemComponent } from './breadcrumb-item.component';
import { BreadcrumbVariant } from './breadcrumb-item.interface';

describe('LgBreadcrumbItemComponent', () => {
  let component: LgBreadcrumbItemComponent;
  let fixture: ComponentFixture<LgBreadcrumbItemComponent>;
  let iconRegistryMock: LgIconRegistry;
  let breadcrumbItemDebugElement: DebugElement;
  let breadcrumbItemEl: HTMLElement;

  beforeEach(async(() => {
    iconRegistryMock = mock(LgIconRegistry);
    TestBed.configureTestingModule({
      declarations: [LgBreadcrumbItemComponent, MockComponent(LgIconComponent)]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LgBreadcrumbItemComponent);
    component = fixture.componentInstance;
    breadcrumbItemDebugElement = fixture.debugElement;
    breadcrumbItemEl = breadcrumbItemDebugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`the class should contain 'lg-breadcrumb-item'`, () => {
    expect(breadcrumbItemEl.getAttribute('class')).toContain(
      'lg-breadcrumb-item'
    );
  });

  describe('when the variant is set to light', () => {
    beforeEach(() => {
      component.variant = BreadcrumbVariant.light;
    });

    it(`the class should contain 'lg-breadcrumb-item--light'`, () => {
      expect(breadcrumbItemEl.getAttribute('class')).toContain(
        'lg-breadcrumb-item--light'
      );
    });

    it(`the class should not contain 'lg-breadcrumb-item--dark'`, () => {
      expect(breadcrumbItemEl.getAttribute('class')).not.toContain(
        'lg-breadcrumb-item--dark'
      );
    });
  });

  describe('when the variant is set to dark', () => {
    beforeEach(() => {
      component.variant = BreadcrumbVariant.dark;
    });

    it(`the class should contain 'lg-breadcrumb-item--dark'`, () => {
      expect(breadcrumbItemEl.getAttribute('class')).toContain(
        'lg-breadcrumb-item--dark'
      );
    });

    it(`the class should not contain 'lg-breadcrumb-item--light'`, () => {
      expect(breadcrumbItemEl.getAttribute('class')).not.toContain(
        'lg-breadcrumb-item--light'
      );
    });
  });

  describe('when isSmScreenFeaturedItem is true', () => {
    beforeEach(() => {
      component.isSmScreenFeaturedItem = true;
      fixture.detectChanges();
    });

    it(`the class should contain 'lg-breadcrumb-item--sm-screen-visible-item'`, () => {
      expect(breadcrumbItemEl.getAttribute('class')).toContain(
        'lg-breadcrumb-item--sm-screen-visible-item'
      );
    });
  });

  describe('when hideCustomIcons is true', () => {
    beforeEach(() => {
      component.hideCustomIcons = true;
      fixture.detectChanges();
    });

    it(`the class should contain 'lg-breadcrumb-item--hide-content-icon'`, () => {
      expect(breadcrumbItemEl.getAttribute('class')).toContain(
        'lg-breadcrumb-item--hide-content-icon'
      );
    });
  });
});
