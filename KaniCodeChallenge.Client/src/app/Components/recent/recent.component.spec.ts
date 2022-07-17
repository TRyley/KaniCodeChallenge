import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PetPost } from "../../Models/pet-post";
import { RecentComponent } from './recent.component';
import { CannyPetsService } from '../../Services/canny-pets.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';

describe('RecentComponent', () => {
  let component: RecentComponent;
  let fixture: ComponentFixture<RecentComponent>;
  let service: CannyPetsService;

  let testPost: PetPost = {
      id: 0,
      dateAdded: '',
      postName: '',
      fileContent: undefined,
      comments: [],
      upVotes: 0,
      downVotes: 0
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [RecentComponent],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: {} },
      { provide: MatDialogRef, useValue: {} }]
    })
      .compileComponents();

    let injector = getTestBed();
    service = injector.inject(CannyPetsService);
    let fixture = TestBed.createComponent(RecentComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get recent posts on init', () => {
    let serviceSpy = spyOn(service, 'getRecentPosts').and.callFake(() => { return of([testPost]) })

    component.ngOnInit();

    expect(serviceSpy).toHaveBeenCalledTimes(1);
  })

  it('should get recent posts on image update', () => {
    let serviceSpy = spyOn(service, 'getRecentPosts').and.callFake(() => { return of([testPost]) })

    component.onImageUpdate();

    expect(serviceSpy).toHaveBeenCalledTimes(1);
  })
  it('should set posts correctly', () => {
    let serviceSpy = spyOn(service, 'getRecentPosts').and.callFake(() => { return of([testPost]) })

    component.onImageUpdate();

    expect(component.posts.length).toBe(1);
  })
});
