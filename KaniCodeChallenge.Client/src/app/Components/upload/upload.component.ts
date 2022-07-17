import { Component, OnInit } from '@angular/core';
import { CannyPetsService } from '../../Services/canny-pets.service';
import { take } from 'rxjs';
import { PostComment } from '../../Models/post-comment';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  public imageURL: string | undefined;
  public disableButton = true;
  public comment: string | undefined;
  private image: Blob = new Blob();

  constructor(private service: CannyPetsService) { }
  ngOnInit(): void {
  }

  updateComment(e: any) {
    this.comment = e.target.value;
  }

  handleImageChange(e: any) {
    this.image = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result?.toString();
    }

    reader.readAsDataURL(this.image);
    this.disableButton = false;
  }

  handleSubmit() {
    let form = new FormData();
    form.append('image', this.image);
    this.service.addPost(form).pipe(take(1)).subscribe((post) => {
      if (this.comment !== undefined) {
        this.addComment(post.id);
      } else {
        this.resetFields();
      }
    });
  }

  addComment(id: number) {
    let newComment: PostComment = {
      userId: Math.round(Math.random() * 100),
      imageId: id,
      commentText: this.comment as string,
      dateAdded: Date.now().toLocaleString()
    }
    this.service.addComment(newComment).pipe(take(1)).subscribe(() => {
      this.resetFields();
    });
  }

  private resetFields() {
    this.image = new Blob();
    this.imageURL = undefined;
    this.comment = undefined;
    this.disableButton = true;
  }

}
