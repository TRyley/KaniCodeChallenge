import { PostComment } from "./post-comment";

export interface PetPost {
  id: number;
  dateAdded: string;
  postName: string;
  fileContent: any;
  comments: PostComment[];
  upVotes: number;
  downVotes: number;
}
