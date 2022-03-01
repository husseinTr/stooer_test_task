import { Component, OnDestroy, OnInit } from '@angular/core';
import { isNonEmptyArray, openErrorMsgSnackBar, removeRequestSubscription } from '../utils';

import { ActivatedRoute } from '@angular/router';
import { Comment } from '../interfaces';
import { DataService } from 'src/app/services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit, OnDestroy {
  comments: Comment[] = [];
  postId!: number;
  toolbarTitle = '';

  /**
   * For the events from Angular-Router
   */
  routeSubscription!: Subscription;

  commentsRequestSubscription!: Subscription;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {}

  ngOnDestroy(): void {
    removeRequestSubscription(this.commentsRequestSubscription);
  }

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe((params: any) => {
      if (params.id) {
        this.postId = params.id;
        this.toolbarTitle = 'All comments for the post with ID: ' + this.postId;
        this.getCommentsByPostId(this.postId);
      }
    });
  }

  /**
   * Loads all comments for a post wiht the given Id
   * @param postId Post-ID which the loaded comments related to
   */
  getCommentsByPostId(postId: number): void {
    this.commentsRequestSubscription = this.dataService
      .getCommentsById(postId)
      .subscribe({
        next: (data: Comment[]) => {
          removeRequestSubscription(this.commentsRequestSubscription);
          if (isNonEmptyArray(data)) {
            this.comments = data;
          } else {
            openErrorMsgSnackBar('No comments found', this.snackBar);
          }
        },
        error: (error) => {
          const errorMessage = error.message;
          openErrorMsgSnackBar('There was an error on load comments: ' + errorMessage, this.snackBar);
        },
      });
  }
}
