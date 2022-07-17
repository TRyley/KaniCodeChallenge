import { TestBed, getTestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CannyPetsService } from './canny-pets.service';
import { PostComment } from '../Models/post-comment';

describe('CannyPetsService', () => {
  let service: CannyPetsService;
  let injector: TestBed;
  let httpClient: HttpTestingController;

  const baseAddress = 'https://localhost:5001/CannyPets/';

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ]
    });
    injector = getTestBed();
    service = injector.inject(CannyPetsService);
    httpClient = injector.inject(HttpTestingController);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the correct endpoint for getting all posts', () => {
    const apiEndpoint = baseAddress + 'GetAll';

    service.getAllPosts().subscribe(response => {
      expect(response).toBeDefined();
    })

    const req = httpClient.expectOne(apiEndpoint);

    expect(req.request.method).toBe('GET');

  })

  it('should call the correct endpoint for getting a single post', () => {
    const apiEndpoint = baseAddress + 'GetById/1';

    service.getPost(1).subscribe(response => {
      expect(response).toBeDefined();
    })

    const req = httpClient.expectOne(apiEndpoint);

    expect(req.request.method).toBe('GET');

  })

  it('should call the correct endpoint for getting recent posts', () => {
    const apiEndpoint = baseAddress + 'GetRecent';

    service.getRecentPosts().subscribe(response => {
      expect(response).toBeDefined();
    })

    const req = httpClient.expectOne(apiEndpoint);

    expect(req.request.method).toBe('GET');

  })

  it('should call the correct endpoint for adding a post', () => {
    const apiEndpoint = baseAddress + 'AddImage';

    const testForm = new FormData();

    service.addPost(testForm).subscribe(response => {
      expect(response).toBeDefined();
    });

    const req = httpClient.expectOne(apiEndpoint);

    expect(req.request.method).toBe('POST');

  })

  it('should call the correct endpoint for adding a comment', () => {
    const apiEndpoint = baseAddress + 'AddComment';

    const testComment: PostComment = {
      imageId: 1,
      userId: 1,
      commentText: "test comment text",
      dateAdded: Date.now().toString()
    }

    service.addComment(testComment).subscribe(response => {
      expect(response).toBeDefined();
    });

    const req = httpClient.expectOne(apiEndpoint);

    expect(req.request.method).toBe('PUT');

  })

  it('should call the correct endpoint for upvoting', () => {
    const apiEndpoint = baseAddress + 'VoteUp';

    service.UpvotePost(1).subscribe(response => {
      expect(response).toBeDefined();
    });

    const req = httpClient.expectOne(apiEndpoint);

    expect(req.request.method).toBe('PUT');

  })

  it('should call the correct endpoint for adding a comment', () => {
    const apiEndpoint = baseAddress + 'VoteDown';

    service.DownvotePost(1).subscribe(response => {
      expect(response).toBeDefined();
    });

    const req = httpClient.expectOne(apiEndpoint);

    expect(req.request.method).toBe('PUT');

  })
});
