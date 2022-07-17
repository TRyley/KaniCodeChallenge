import { HttpClientTestingModule } from '@angular/common/http/testing';
import {getTestBed, TestBed, waitForAsync } from '@angular/core/testing';
import { PetPost } from '../../Models/pet-post';
import { of } from 'rxjs';
import { CannyPetsService } from '../../Services/canny-pets.service';

import { UploadComponent } from './upload.component';

describe('UploadComponent', () => {
  let component: UploadComponent;
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

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      declarations: [
        UploadComponent
      ],
    }).compileComponents();

    let injector = getTestBed();
    service = injector.inject(CannyPetsService);
    let fixture = TestBed.createComponent(UploadComponent);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the button as enabled on handleImageChange', () => {
    const blob = new Blob([''], { type: 'image/jpeg' });
    const file = blob as File;
    const files = {
      0: file as File,
      length: 1,
      item: (index: number) => file as File
    };
    let event = {
      target: { files: files }
    };
    component.handleImageChange(event);

    expect(component.disableButton).toBeFalsy();
  })

  it('should call the correct service method on submit', () => {
    let serviceSpy = spyOn(service, 'addPost').and.callFake(() => { return of(testPost) });

    component.handleSubmit();

    expect(serviceSpy).toHaveBeenCalledTimes(1);
  })

  it('should call the correct service method on add comment', () => {
    let serviceSpy = spyOn(service, 'addComment').and.callFake(() => { return of({}) });
    component.comment = "test comment";
    component.addComment(1);

    expect(serviceSpy).toHaveBeenCalledTimes(1);
  })

  it('should not call the service if comment is empty', () => {
    spyOn(service, 'addPost').and.callFake(() => { return of(testPost) });
    let serviceSpy = spyOn(service, 'addComment').and.callFake(() => { return of({}) });

    component.handleSubmit();

    expect(serviceSpy).not.toHaveBeenCalled();
  })

  it('should reset inputs on submit', () => {
    spyOn(service, 'addPost').and.callFake(() => { return of(testPost) });
    spyOn(service, 'addComment').and.callFake(() => { return of({}) });

    component.comment = "test image";
    component.imageURL = "test image url";
    component.disableButton = false;

    component.handleSubmit();

    expect(component.comment).toBeUndefined();
    expect(component.imageURL).toBeUndefined();
    expect(component.disableButton).toBeTruthy();
  })
});
