import { Component, OnInit } from '@angular/core';
import { PetPost } from '../../Models/pet-post';
import { take } from 'rxjs';
import { CannyPetsService } from '../../Services/canny-pets.service';

@Component({
  selector: 'app-recent',
  templateUrl: './recent.component.html',
  styleUrls: ['./recent.component.css']
})
export class RecentComponent implements OnInit {
  public posts: PetPost[] = [];
  constructor(private service: CannyPetsService) { }

  ngOnInit(): void {
    this.getPosts();
  }

  onImageUpdate() {
    this.getPosts();
  }

  getPosts() {
    this.service.getRecentPosts().pipe(take(1)).subscribe((recentPosts) => {
      this.posts = recentPosts;
    });
  }
}
