import { Component, Inject, OnDestroy, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import {
  CREATE_BUTTON_TITLE,
  CREATE_DIALOG_TITLE, SERVER_STATUS_FAIL,
  SERVER_STATUS_SUCCESS, UPDATE_BUTTON_TITLE,
  UPDATE_DIALOG_TITLE
} from '../../components/constants';
import {
  DialogData,
  Post,
  PostCreateUpdateDialogOperationValue
} from '../../components/interfaces';
import {
  openErrorMsgSnackBar,
  isNonEmptyObject,
  isNonEmptyStringValue,
  removeRequestSubscription
} from '../../components/utils';
import { DataService } from '../../services/data.service';
import { DeletePostDialogComponent } from '../delete-post-dialog/delete-post-dialog.component';

@Component({
  selector: 'app-create-update-post-dialog',
  templateUrl: './create-update-post-dialog.component.html',
  styleUrls: ['./create-update-post-dialog.component.scss'],
})
export class CreateUpdatePostDialogComponent implements OnInit, OnDestroy {
  dialogTitle = '';
  buttonTitle = '';
  status = SERVER_STATUS_FAIL;
  updatePostSubscription!: Subscription;
  createNewPostSubscription!: Subscription;

  form: FormGroup = this.formBuilder.group({
    postTitleControl: ['', [Validators.required]],
    postBodyControl: ['', [Validators.required]],
  });

  constructor(
    @Optional() public dialogRef: MatDialogRef<DeletePostDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnDestroy(): void {
    removeRequestSubscription(this.updatePostSubscription);
    removeRequestSubscription(this.createNewPostSubscription);
  }

  get postTitleControl(): any {
    return this.form.get('postTitleControl');
  }

  get postBodyControl(): any {
    return this.form.get('postBodyControl');
  }

  get isSaveClickable(): boolean {
    if (
      isNonEmptyStringValue(this.postTitleControl.value) &&
      isNonEmptyStringValue(this.postBodyControl.value)
    ) {
      return true;
    }
    return false;
  }

  ngOnInit(): void {
    this.setDialogData(this.data);
  }

  setDialogData(data: DialogData): void {
    if (
      isNonEmptyObject(data.post) &&
      this.data.operation === PostCreateUpdateDialogOperationValue.UPDATE_POST
    ) {
      const post = data.post;
      this.buttonTitle = UPDATE_BUTTON_TITLE;
      this.dialogTitle = UPDATE_DIALOG_TITLE;
      this.postTitleControl.setValue(post?.title);
      this.postBodyControl.setValue(post?.body);
      return;
    }
    this.buttonTitle = CREATE_BUTTON_TITLE;
    this.dialogTitle = CREATE_DIALOG_TITLE;
  }

  /**
   * Updates an existing post
   */
  updateExistingPost(): void {
    const transferObject: any = {
      userId: this.data.post?.userId,
      id: this.data.post?.id,
      title: this.postTitleControl.value.trim(),
      body: this.postBodyControl.value.trim(),
    };
    this.updatePostSubscription = this.dataService
      .updatePostById(this.data.post?.id, transferObject)
      .subscribe({
        next: (updatedPost: Post) => {
          removeRequestSubscription(this.updatePostSubscription);
          if (isNonEmptyObject(updatedPost)) {
            this.status = SERVER_STATUS_SUCCESS;
            this.dialogRef.close({ status: this.status, post: updatedPost });
          }
        },
        error: (error) => {
          const errorMessage = error.message;
          openErrorMsgSnackBar(
            'There was an error on update post: ' + errorMessage,
            this.snackBar
          );
        },
      });
  }

  /**
   * Creates a new post
   */
  createNewPost(): void {
    const transferObject: any = {
      userId: 1,
      title: this.postTitleControl.value.trim(),
      body: this.postBodyControl.value.trim(),
    };
    this.createNewPostSubscription = this.dataService
      .createPost(transferObject)
      .subscribe({
        next: (newPost: Post) => {
          removeRequestSubscription(this.createNewPostSubscription);
          if (isNonEmptyObject(newPost)) {
            this.status = SERVER_STATUS_SUCCESS;
            this.dialogRef.close({ status: this.status, post: newPost });
          }
        },
        error: (error) => {
          const errorMessage = error.message;
          openErrorMsgSnackBar(
            'There was an error on create posts: ' + errorMessage,
            this.snackBar
          );
        },
      });
  }

  /**
   * Checks which function has to be called based on the purpose of use dialog
   */
  requestHandler(): void {
    if (
      this.data.operation === PostCreateUpdateDialogOperationValue.CREATE_POST
    ) {
      this.createNewPost();
      return;
    }

    if (
      this.data.operation === PostCreateUpdateDialogOperationValue.UPDATE_POST
    ) {
      this.updateExistingPost();
      return;
    }
  }

  onSaveClick(): void {
    this.requestHandler();
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
