import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GitRepoDetailsComponent } from './git-repo-details.component';

describe('GitRepoDetailsComponent', () => {
  let component: GitRepoDetailsComponent;
  let fixture: ComponentFixture<GitRepoDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GitRepoDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GitRepoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
