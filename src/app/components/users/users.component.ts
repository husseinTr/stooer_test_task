import { Component, OnInit, ViewChild } from '@angular/core';

import { DataService } from 'src/app/services/data.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { User } from '../utils';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  users: User[] = [];
  tableDataSource!: MatTableDataSource<User>;
  usersRequestSubscription: Subscription | undefined;
  columns = [
    {
      columnDef: 'name',
      header: 'Name',
      cell: (element: User) => `${element.name}`,
    },
    {
      columnDef: 'username',
      header: 'Username',
      cell: (element: User) => `${element.username}`,
    },
    {
      columnDef: 'email',
      header: 'Email',
      cell: (element: User) => `${element.email}`,
    },
    {
      columnDef: 'street',
      header: 'Street',
      cell: (element: User) => `${element.address.street}`,
    },
    {
      columnDef: 'city',
      header: 'City',
      cell: (element: User) => `${element.address.city}`,
    },
    {
      columnDef: 'zipcode',
      header: 'Zip',
      cell: (element: User) => `${element.address.zipcode}`,
    },
    {
      columnDef: 'company',
      header: 'Company',
      cell: (element: User) => `${element.company.name}`,
    },
  ];
  displayedColumns = this.columns.map((c) => c.columnDef);

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.requestUsersAndFillTable();
  }

  removeRequestSubscription(): void {
    if (this.usersRequestSubscription) {
      this.usersRequestSubscription.unsubscribe();
    }
  }

  sortDataAccessor(item: any, property: string): string {
    if (typeof item[`${property}`] === 'string') {
      return item[`${property}`]?.toLowerCase() || '';
    } else {
      return item[`${property}`];
    }
  }

  requestUsersAndFillTable(): void {
    this.usersRequestSubscription = this.dataService
      .getUsersList()
      .subscribe((data: any) => {
        this.removeRequestSubscription();
        if (Array.isArray(data)) {
          this.users = data;
          this.tableDataSource = new MatTableDataSource(this.users);
          this.tableDataSource.sort = this.sort;
          this.tableDataSource.sortingDataAccessor = this.sortDataAccessor;
        } else {
          console.log('No Users Found');
        }
      });
  }
}
