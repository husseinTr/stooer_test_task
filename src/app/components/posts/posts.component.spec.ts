import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MockProvider } from "src/app/unittests/mockprovider";
import { PostsComponent } from "./posts.component";
import { TestBed } from "@angular/core/testing";
import { Unittest } from "src/app/unittests/unittests";

describe(PostsComponent.name, () => {
  const unittest = Unittest.forComponent(PostsComponent);

  function setup() {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        MatDialogModule,
        MatSnackBarModule,
      ],
      declarations: [PostsComponent],
      providers: [MockProvider.forRouter()],
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
      expect(component.toolbarTitle).toBe('All posts');
      expect(component.posts).toEqual([]);
      expect(component.commentsCount).toBeUndefined();
      expect(component.postsRequestSubscription).toBeUndefined();
    });
  });
});

