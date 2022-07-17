import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { LeaderboardComponent } from './leaderboard.component';
import { CannyPetsService } from '../../Services/canny-pets.service';
import { PetPost } from '../../Models/pet-post';
import { of } from 'rxjs';

describe('LeaderboardComponent', () => {
  let component: LeaderboardComponent;
  let fixture: ComponentFixture<LeaderboardComponent>;
  let service: CannyPetsService;

  let testPosts: PetPost[] = [
    {
      id: 0,
      dateAdded: "date_0",
      comments: [],
      postName: "post_0",
      upVotes: 0,
      downVotes: 0,
      fileContent: {},
    },
    {
      id: 1,
      dateAdded: "date_1",
      comments: [],
      postName: "post_1",
      upVotes: 4,
      downVotes: 12,
      fileContent: {},
    },
    {
      id: 2,
      dateAdded: "date_2",
      comments: [],
      postName: "post_2",
      upVotes: 20,
      downVotes: 9,
      fileContent: {},
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [LeaderboardComponent]
    })
      .compileComponents();

    let injector = getTestBed();
    service = injector.inject(CannyPetsService);
    let fixture = TestBed.createComponent(LeaderboardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all posts on init', () => {
    let serviceSpy = spyOn(service, 'getAllPosts').and.returnValue(of(testPosts));
    component.ngOnInit();
    expect(serviceSpy).toHaveBeenCalledTimes(1);
  });
  it('should order posts by votes', () => {
    let serviceSpy = spyOn(service, 'getAllPosts').and.returnValue(of(testPosts));

    component.getPosts();

    expect(component.posts[0].id).toBe(2);
    expect(component.posts[1].id).toBe(0);
    expect(component.posts[2].id).toBe(1);
  });
});
