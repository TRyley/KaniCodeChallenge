import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PetPost } from '../../Models/pet-post';
import { CannyPetsService } from '../../Services/canny-pets.service';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  @Output() onChange = new EventEmitter();
  @Input() post: PetPost = {
      id: 0,
      dateAdded: '',
      postName: '',
      fileContent: undefined,
      comments: [],
      upVotes: 0,
      downVotes: 0
  };
  @Input() clickable: boolean = false;
  @Input() votable: boolean = true;

  public sourceURL: string | undefined;
  public postRating: number | undefined;

  constructor(private service: CannyPetsService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.sourceURL = "https://localhost:5001/CannyPets/Image/" + this.post.id;
    this.getRating();
  }

  getRating() {
    this.postRating =  this.post.upVotes - this.post.downVotes;
  }

  upvote() {
    this.service.UpvotePost(this.post.id).pipe(take(1)).subscribe(() => {
      this.post.upVotes++;
      this.getRating();
    });
  }

  downvote() {
    this.service.DownvotePost(this.post.id).pipe(take(1)).subscribe(() => {
      this.post.downVotes++;
      this.getRating();
    });
  }

  openDialog() {
    if (this.clickable) {
      this.dialog.open(ImageDialogComponent, {
        height: '60%',
        width: '75%',
        data: this.post,
      }).afterClosed().subscribe(() => {
        this.onChange.emit();
      });
    }
  }

}
