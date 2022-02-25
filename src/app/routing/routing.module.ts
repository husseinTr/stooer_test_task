import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { UsersComponent } from "../components/users/users.component";

export const USERS_VIEW_ROUTE = 'users';
export const routes: Routes = [
  {
    path: USERS_VIEW_ROUTE,
    component: UsersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [RouterModule],
})

export class RoutingModule {}