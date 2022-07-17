import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ImageDialogComponent } from './image-dialog.component';
import { CannyPetsService } from '../../Services/canny-pets.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PetPost } from '../../Models/pet-post';

describe('ImageDialogComponent', () => {
  let component: ImageDialogComponent;
  let fixture: ComponentFixture<ImageDialogComponent>;
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

  const dialogMock = {
    close: () => { }
  };

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ImageDialogComponent],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: {} },
      { provide: MatDialogRef, useValue: dialogMock }]
    })
      .compileComponents();

    let injector = getTestBed();
    service = injector.inject(CannyPetsService);
    let fixture = TestBed.createComponent(ImageDialogComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a comment', () => {
    let serviceSpy = spyOn(service, 'addComment').and.callFake(() => of({}));

    component.data = testPost;
    component.commentText = "test comment";
    component.addComment();

    expect(serviceSpy).toHaveBeenCalledTimes(1);
  });

  it('should close the dialog', () => {
      spyOn(component.dialogRef, 'close');
      component.closeDialog();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });
});
