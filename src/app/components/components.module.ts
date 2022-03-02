import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { CommentsComponent } from "./comments/comments.component";
import { CommonModule } from "@angular/common";
import { CreateUpdatePostDialogComponent } from '../dialogs/create-update-post-dialog/create-update-post-dialog.component';
import { DeletePostDialogComponent } from '../dialogs/delete-post-dialog/delete-post-dialog.component';
import { HttpClientModule } from "@angular/common/http";
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from "@angular/material/toolbar";
import { PostsComponent } from "./posts/posts.component";
import { TextFieldModule } from '@angular/cdk/text-field';
import { ToolBarComponent } from "./tool-bar/tool-bar.component";

@NgModule({
  declarations: [
    CommentsComponent,
    DeletePostDialogComponent,
    PostsComponent,
    ToolBarComponent,
    CreateUpdatePostDialogComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSnackBarModule,
    MatSortModule,
    MatTabsModule,
    MatTableModule,
    MatToolbarModule,
    ReactiveFormsModule,
    TextFieldModule
  ],
  exports: [ToolBarComponent],
  entryComponents: [DeletePostDialogComponent, CreateUpdatePostDialogComponent],
})
export class ComponentsModule { }