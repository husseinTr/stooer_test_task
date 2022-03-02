import { Component, OnDestroy, OnInit } from '@angular/core';
import { POST_COMMENTS_URL, SERVER_STATUS_SUCCESS } from '../constants';
import { Post, PostCreateUpdateDialogOperationValue } from '../interfaces';
import {
  isNonEmptyArray,
  isNonEmptyObject,
  openErrorMsgSnackBar,
  removeRequestSubscription,
} from '../utils';

import { CreateUpdatePostDialogComponent } from '../../dialogs/create-update-post-dialog/create-update-post-dialog.component';
import { DataService } from 'src/app/services/data.service';
import { DeletePostDialogComponent } from '../../dialogs/delete-post-dialog/delete-post-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  postsRequestSubscription!: Subscription;
  toolbarTitle = 'All posts';
  commentsCount!: number;

  constructor(
    private dataService: DataService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    removeRequestSubscription(this.postsRequestSubscription);
  }

  ngOnInit(): void {
    this.getPosts();
  }

  /**
   * Loads all Posts
   */
  getPosts(): void {
    this.postsRequestSubscription = this.dataService.getPostsList().subscribe({
      next: (data: Post[]) => {
        removeRequestSubscription(this.postsRequestSubscription);
        if (isNonEmptyArray(data)) {
          this.posts = data;
          for (const post of this.posts) {
            this.getComments(post.id);
          }
        } else {
          openErrorMsgSnackBar('No posts found', this.snackBar);
        }
      },
      error: (error) => {
        const errorMessage = error.message;
        openErrorMsgSnackBar(
          'There was an error on load posts: ' + errorMessage,
          this.snackBar
        );
      },
    });
  }

  getComments(postId: number): void {
    this.dataService.getCommentsById(postId).subscribe((data: any) => {
      if (isNonEmptyArray(data)) {
        this.commentsCount = data.length;
        console.log(this.commentsCount);
      }
    });
  }

  /**
   * Opens dialog to delete a post
   * @param postId post-id to be deleted
   */
  openDeletePostDialog(postId: number): void {
    const dialogRef = this.dialog.open(DeletePostDialogComponent, {
      disableClose: true,
      data: {
        id: postId,
      },
    });
    dialogRef.afterClosed().subscribe((data: { status: string }) => {
      if (isNonEmptyObject(data) && data.status === SERVER_STATUS_SUCCESS) {
        this.posts = this.posts.filter((post: Post) => {
          return post.id !== postId;
        });
      }
    });
  }

  /**
   * Opens dialog to update a post
   * @param post post to be updated
   */
  openUpdatePostDialog(post: Post): void {
    const dialogRef = this.dialog.open(CreateUpdatePostDialogComponent, {
      disableClose: true,
      data: {
        post: post,
        operation: PostCreateUpdateDialogOperationValue.UPDATE_POST,
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((data: { status: string; post: Post }) => {
        if (
          data &&
          isNonEmptyObject(data.post) &&
          data.status === SERVER_STATUS_SUCCESS
        ) {
          let postsTemp = this.posts;
          for (let tmp of postsTemp) {
            if (tmp.id === data.post.id) {
              tmp.title = data.post.title;
              tmp.body = data.post.body;
            }
          }
          this.posts = postsTemp;
        }
      });
  }

  /**
   * Opens dialog to create a new Post
   */
  openCreatePostDialog(): void {
    const dialogRef = this.dialog.open(CreateUpdatePostDialogComponent, {
      disableClose: true,
      data: {
        operation: PostCreateUpdateDialogOperationValue.CREATE_POST,
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((data: { status: string; post: Post }) => {
        if (
          data &&
          isNonEmptyObject(data.post) &&
          data.status === SERVER_STATUS_SUCCESS
        ) {
          this.posts.push(data.post);
        }
      });
  }

  /**
   * Navigates to comments page|view of a post wiht the given Id
   * @param postId Post-ID which the comments related to
   */
  navigateToPostCommentsView(postId: number): void {
    if (postId) {
      this.router.navigate([POST_COMMENTS_URL, postId]);
    }
  }

  onSelectedOption($event: any) {
    this.posts = $event;
  }
}
