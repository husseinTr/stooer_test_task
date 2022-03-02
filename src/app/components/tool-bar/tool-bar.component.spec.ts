import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MatMenuModule } from "@angular/material/menu";
import { MockProvider } from "src/app/unittests/mockprovider";
import { TestBed } from "@angular/core/testing";
import { ToolBarComponent } from "./tool-bar.component";
import { Unittest } from "../../unittests/unittests";

describe(ToolBarComponent.name, () => {
  const unittest = Unittest.forComponent(ToolBarComponent);

  function setup() {

    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        MatMenuModule,
      ],
      declarations: [ToolBarComponent],
      providers: [
        MockProvider.forRouter(),
      ],
    });
    const base = unittest.setup();
    return { ...base };
  }

  describe(unittest.SUITE_INITIAL_TEXT, () => {
    
    it(unittest.COMPONENT_CREATED_TEXT, () => {
        const { component } = setup();
        expect(component).toBeTruthy();
      },
    );

    it(unittest.COMPONENT_INITIAL_STATUS_TEXT, () => {
      const { component } = setup();
      expect(component.title).toBe('');
      expect(component.showBackIcon).toBe(false);
      expect(component.showSearchForm).toBe(false);
      expect(component.selectEvent).toBeDefined();
      expect(component.sortEvent).toBeDefined();
      expect(component.autocompleteInput).toBeUndefined();
      expect(component.searchInputControl).toBeDefined();
      expect(component.autoCompletePostsList).toEqual([]);;
      expect(component.postsList).toEqual([]);
    });
  });
});
