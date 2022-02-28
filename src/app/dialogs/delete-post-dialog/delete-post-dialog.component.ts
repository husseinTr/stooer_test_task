import { Component, Inject, OnDestroy, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import {
  SERVER_STATUS_FAIL,
  SERVER_STATUS_SUCCESS,
} from 'src/app/components/constants';
import { DialogData } from '../../components/interfaces';
import { DataService } from '../../services/data.service';
import {
  openErrorMsgSnackBar,
  isNonEmptyObject,
  removeRequestSubscription,
} from '../../components/utils';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-post-dialog',
  templateUrl: './delete-post-dialog.component.html',
  styleUrls: ['./delete-post-dialog.component.scss'],
})
export class DeletePostDialogComponent implements OnInit, OnDestroy {
  status = SERVER_STATUS_FAIL;
  postId!: number;
  deletePostSubscription!: Subscription;
  constructor(
    @Optional() public dialogRef: MatDialogRef<DeletePostDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dataService: DataService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnDestroy(): void {
    removeRequestSubscription(this.deletePostSubscription);
  }

  ngOnInit(): void {
    if (isNonEmptyObject(this.data) && this.data.id) {
      this.postId = this.data.id;
    }
  }

  onOkClick(): void {
    this.deletePostSubscription = this.dataService
      .deletePostById(this.postId)
      .subscribe({
        next: () => {
          removeRequestSubscription(this.deletePostSubscription);
          this.status = SERVER_STATUS_SUCCESS;
          this.dialogRef.close({ status: this.status });
        },
        error: (error) => {
          const errorMessage = error.message;
          openErrorMsgSnackBar(
            'There was an error on delete post: ' + errorMessage,
            this.snackBar
          );
        },
      });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
