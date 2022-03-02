import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {
  filterPostsByValue,
  isNonEmptyObject
} from '../utils';

import { DataService } from 'src/app/services/data.service';
import { FormControl } from '@angular/forms';
import { POSTS_URL } from '../constants';
import { Post } from '../interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss'],
})
export class ToolBarComponent implements OnInit {
  @Input() title: string = '';
  @Input() showBackIcon = false;
  showSearchForm = false;
  @Output() selectEvent = new EventEmitter<Post[]>();
  @Output() sortEvent = new EventEmitter<boolean>();
  @ViewChild('autocompleteInput') autocompleteInput!: ElementRef;
  postsList: Post[] = [];
  autoCompletePostsList: Post[] = [];

  searchInputControl = new FormControl();

  constructor(private router: Router, private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getPostsList().subscribe((posts) => {
      this.postsList = posts;
    });

    this.searchInputControl.valueChanges.subscribe((userInput) => {
      this.autoCompletePostsList = filterPostsByValue(
        userInput,
        this.postsList
      );
    });
  }

  /**
   * Navigates to the posts view
   */
  navigateBack(): void {
    this.router.navigate([POSTS_URL]);
  }

  /**
   * Function is called by clicking on the close icon
   */
  onCloseClick(): void {
    this.autocompleteInput.nativeElement.focus();
    this.autocompleteInput.nativeElement.value = '';
    this.selectEvent.emit(this.postsList);
  }

  /**
   * Function is called by selecting of a post
   * @param $event 
   */
  onPostSelect($event: any): void {
    const post: Post = $event.source.value;
    let posts = this.postsList;
    if (isNonEmptyObject(post)) {
      posts = filterPostsByValue(post.title, posts);
    }
    this.selectEvent.emit(posts);
  }

  /**
   * Displays string in the input field for the post
   *
   * @param post Object with post's description
   * @returns Post title or empty string
   */
  displayPost(post: Post): string {
    return isNonEmptyObject(post) ? post.title : '';
  }
}
