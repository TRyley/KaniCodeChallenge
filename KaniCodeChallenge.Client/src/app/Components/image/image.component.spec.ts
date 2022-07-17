import { async, ComponentFixture, fakeAsync, flush, getTestBed, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ImageComponent } from './image.component';
import { CannyPetsService } from '../../Services/canny-pets.service';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PetPost } from '../../Models/pet-post';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';

describe('ImageComponent', () => {
  let component: ImageComponent;
  let fixture: ComponentFixture<ImageComponent>;
  let service: CannyPetsService;

  let dialogSpy: jasmine.Spy;
  let dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of({}), close: null });
  dialogRefSpyObj.componentInstance = { body: '' }; // attach componentInstance to the spy object...


  let testPost: PetPost = {
    id: 0,
    postName: "test_name",
    comments: [{imageId: 0, userId: 0, commentText: "comment text", dateAdded: "date"}],
    dateAdded: "test_date",
    fileContent: {},
    downVotes: 2,
    upVotes: 3
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatDialogModule],
      declarations: [ImageComponent],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: {} },
                    { provide: MatDialogRef, useValue: {} }]
    })
    .compileComponents();

    let injector = getTestBed();
    service = injector.inject(CannyPetsService);
    fixture = TestBed.createComponent(ImageComponent);
    component = fixture.componentInstance;
  });

  it('should create', fakeAsync(() => {
    expect(component).toBeTruthy();
  }));

  it('should open dialog on image click', fakeAsync(() => {
    dialogSpy = spyOn(TestBed.get(MatDialog), 'open').and.returnValue(dialogRefSpyObj);

    component.post = testPost;
    component.clickable = true;

    component.openDialog();
    fixture.detectChanges();
    expect(dialogSpy).toHaveBeenCalled();
  }));

  it('should not open dialog on image click if image is not clickable', fakeAsync(() => {
    dialogSpy = spyOn(TestBed.get(MatDialog), 'open').and.returnValue(dialogRefSpyObj);

    component.post = testPost;
    component.clickable = false;

    component.openDialog();
    fixture.detectChanges();
    expect(dialogSpy).not.toHaveBeenCalled();
  }));

  it('should not open dialog on image click if image is not clickable', fakeAsync(() => {
    dialogSpy = spyOn(TestBed.get(MatDialog), 'open').and.returnValue(dialogRefSpyObj);

    component.post = testPost;
    component.clickable = false;

    component.openDialog();
    fixture.detectChanges();
    expect(dialogSpy).not.toHaveBeenCalled();
  }));

  it('should show vote buttons', fakeAsync(() => {
    dialogSpy = spyOn(TestBed.get(MatDialog), 'open').and.returnValue(dialogRefSpyObj);

    component.post = testPost;
    component.votable = true;

    fixture.detectChanges();

    let voteElements = document.getElementsByClassName('vote');
    expect(voteElements).toBeDefined();
    expect(voteElements.length).toBe(2);
  }));

  it('should not show vote buttons if image is not votable', fakeAsync(() => {
    dialogSpy = spyOn(TestBed.get(MatDialog), 'open').and.returnValue(dialogRefSpyObj);

    component.post = testPost;
    component.votable = false;

    fixture.detectChanges();

    let voteElements = document.getElementsByClassName('vote');
    expect(voteElements.length).toBe(0);
  }));
});
