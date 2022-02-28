import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommentsComponent } from '../components/comments/comments.component';
import { PostsComponent } from '../components/posts/posts.component';

const POSTS_VIEW_ROUTE = 'posts';
const POST_COMMENTS_ROUTE ='post/comments/:id';

export const routes: Routes = [
  {
    path: POSTS_VIEW_ROUTE,
    component: PostsComponent,
  },
  {
    path: POST_COMMENTS_ROUTE,
    component: CommentsComponent,
  },
  
  { path: '', redirectTo: POSTS_VIEW_ROUTE, pathMatch: 'full' },
  { path: '**', redirectTo: POSTS_VIEW_ROUTE },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [RouterModule],
})
export class RoutingModule {}
