import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PetPost } from '../Models/pet-post';
import { PostComment } from '../Models/post-comment';

@Injectable({
  providedIn: 'root'
})
export class CannyPetsService {
  private baseAddress = "https://localhost:5001/CannyPets/";

  constructor(private http: HttpClient) { }

  public getAllPosts(): Observable<PetPost[]> {
    return this.http.get<PetPost[]>(this.baseAddress + 'GetAll');
  }

  public getRecentPosts(): Observable<PetPost[]> {
    return this.http.get<PetPost[]>(this.baseAddress + 'GetRecent');
  }

  public getPost(id: number): Observable<PetPost> {
    return this.http.get<PetPost>(this.baseAddress + `GetById/${id}`);
  }

  public addPost(newPost: FormData): Observable<PetPost> {
    return this.http.post<PetPost>(this.baseAddress + `AddImage`, newPost);
  }

  public addComment(comment: PostComment): Observable<Object> {
    return this.http.put(this.baseAddress + `AddComment`, comment);
  }

  public UpvotePost(postId: number): Observable<Object> {
    return this.http.put(this.baseAddress + `VoteUp`, postId);
  }

  public DownvotePost(postId: number): Observable<Object> {
    return this.http.put(this.baseAddress + `VoteDown`, postId);
  }

}
