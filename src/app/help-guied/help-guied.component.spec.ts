import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpGuiedComponent } from './help-guied.component';

describe('HelpGuiedComponent', () => {
  let component: HelpGuiedComponent;
  let fixture: ComponentFixture<HelpGuiedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpGuiedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpGuiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
