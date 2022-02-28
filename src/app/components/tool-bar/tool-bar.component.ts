import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormControl } from '@angular/forms';
import { POSTS_URL } from '../constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss'],
})
export class ToolBarComponent implements OnInit {
  @Input() title: string = '';
  @Input() showBackIcon = false;
  @Output() searchEvent = new EventEmitter<string>();

  searchInputControl = new FormControl();

  constructor(private router: Router) {}

  ngOnInit(): void { }

  /**
   * Navigates to the posts view
   */
  navigateBack(): void {
    this.router.navigate([POSTS_URL]);
  }

  onSearchIconClick(): void {
    this.searchEvent.emit(this.searchInputControl.value)
  }
}
