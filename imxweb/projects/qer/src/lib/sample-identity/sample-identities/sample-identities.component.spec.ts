import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SampleIdentitiesComponent } from './sample-identities.component';

describe('SampleIdentitiesComponent', () => {
  let component: SampleIdentitiesComponent;
  let fixture: ComponentFixture<SampleIdentitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SampleIdentitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleIdentitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
