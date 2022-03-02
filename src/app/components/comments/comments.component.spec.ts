import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommentsComponent } from './comments.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MockProvider } from '../../unittests/mockprovider';
import { TestBed } from '@angular/core/testing';
import { Unittest } from '../../unittests/unittests';

describe(CommentsComponent.name, () => {
  const unittest = Unittest.forComponent(CommentsComponent);

  function setup() {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        MatSnackBarModule,
      ],
      declarations: [CommentsComponent],
      providers: [MockProvider.forRouter(), MockProvider.forActivatedRoute()],
    });
    const base = unittest.setup();
    return { ...base };
  }

  describe(unittest.SUITE_INITIAL_TEXT, () => {
    
    it(unittest.COMPONENT_CREATED_TEXT, () => {
      const { component } = setup();
      expect(component).toBeTruthy();
    });

    it(unittest.COMPONENT_INITIAL_STATUS_TEXT, () => {
      const { component } = setup();
      expect(component.toolbarTitle).toBe('');
      expect(component.comments).toEqual([]);
      expect(component.postId).toBeUndefined();
      expect(component.routeSubscription).toBeUndefined();
      expect(component.commentsRequestSubscription).toBeUndefined();
    });
  });
});
