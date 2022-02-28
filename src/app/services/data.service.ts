import { BASE_API_URL, COMMENTS_URL, POSTS_URL, POSTS_URL_PREFIX } from '../components/constants';
import { Comment, Post } from '../components/interfaces';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  /**
   * Sends a request to the server to get all posts list.
   * @return Array of posts-objects as observable
   */
  getPostsList(): Observable<Post[]> {
    return this.http.get<Post[]>(BASE_API_URL + POSTS_URL);
  }

  /**
   * Sends a request to the server to delete a post by ID.
   * @param postId ID of the post to be deleted
   */
  deletePostById(postId: number): Observable<any> {
    return this.http.delete<any>(BASE_API_URL + POSTS_URL_PREFIX + postId);
  }

  /**
   * Sends a request to the server to update a post.
   *
   * @param postId ID of the post to be updated
   * @return The updated post-object as observable
   */
  updatePostById(postId: any, post: Post): Observable<Post> {
    return this.http.put<Post>(BASE_API_URL + POSTS_URL_PREFIX + postId, post);
  }

  /**
   * Sends a request to the server create a new post.
   * @param post JSON object containing the parameters for post creation
   * @return The new post-object as observable
   */
  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(BASE_API_URL + POSTS_URL, post);
  }

  /**
   * Sends a request to the server to get comments list by ID.
   *
   * @param postId ID to which all comments belong
   * @return Array of comments-objects as observable
   */
  getCommentsById(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(
      BASE_API_URL + POSTS_URL_PREFIX + postId + COMMENTS_URL
    );
  }
}
