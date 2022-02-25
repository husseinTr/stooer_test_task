import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";

import { CommentsComponent } from "./comments/comments.component";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from "@angular/material/toolbar";
import { PostsComponent } from "./posts/posts.component";
import { ToolBarComponent } from "./tool-bar/tool-bar.component";
import { UsersComponent } from "./users/users.component";

@NgModule({
  declarations: [
    CommentsComponent,
    PostsComponent,
    ToolBarComponent,
    UsersComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    MatSortModule,
    MatTabsModule,
    MatTableModule,
    MatToolbarModule
  ],
  exports: [ToolBarComponent]
})
export class ComponentsModule { }