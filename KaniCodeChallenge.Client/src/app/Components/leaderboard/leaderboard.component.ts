import { Component, OnInit } from '@angular/core';
import { CannyPetsService } from '../../Services/canny-pets.service';
import { take } from 'rxjs';
import { PetPost } from '../../Models/pet-post';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  posts: PetPost[] = [];

  constructor(private service: CannyPetsService) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.service.getAllPosts().pipe(take(1)).subscribe((allPosts) => {
      allPosts.sort((a, b) => (b.upVotes - b.downVotes) - (a.upVotes - a.downVotes));
      this.posts = allPosts;
    })
  }

}
