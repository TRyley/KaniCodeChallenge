import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PetPost } from '../../Models/pet-post';
import { PostComment } from '../../Models/post-comment';
import { CannyPetsService } from '../../Services/canny-pets.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.css']
})
export class ImageDialogComponent implements OnInit {
  public commentText: string | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: PetPost,
    public dialogRef: MatDialogRef<ImageDialogComponent>,
    private service: CannyPetsService) { }

  closeDialog() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

  addComment() {
    let newComment: PostComment = {
        userId: Math.round(Math.random() * 100),
        imageId: this.data.id,
        commentText: this.commentText as string,
        dateAdded: Date.now().toString()
    }

    this.service.addComment(newComment).pipe(take(1)).subscribe(() => {
      this.commentText = "";
      this.data.comments.push(newComment);
    });
  }

}
