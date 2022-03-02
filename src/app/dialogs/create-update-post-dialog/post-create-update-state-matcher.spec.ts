import { Post, PostCreateUpdateDialogOperationValue } from "../../components/interfaces";

import { FormControl } from "@angular/forms";
import { PostCreateUpdateStateMatcher } from "./post-create-update-state-matcher";
import { Unittest } from "../../unittests/unittests";

const testTitleInUseErrorStateMatcher = (inputValue: any,
  expectedValue: boolean,
  postsList: any[],
  setup: any
  ) => {
  const { stateMatcher } = setup;
  stateMatcher.setPostEntries(postsList, PostCreateUpdateDialogOperationValue.CREATE_POST);
  stateMatcher.isErrorState({
    value: inputValue
  } as FormControl, null);
  expect(stateMatcher.isTitleInUse).toBe(expectedValue);
}

const title_post_1 = 'sunt aut facere repellat';
const title_post_2 = 'At vero eos et accusamus';

const mockEmptyPostsList: Post[] = [];
const mockPostsList: Post[] = [
  {
    body: 'Sed ut perspiciatis unde omnis iste natus error sit',
    id: 1,
    title: title_post_1,
    userId: 1
  },
  {
    body: 'omnis voluptas assumenda est, omnis dolor repellendus',
    id: 2,
    title: title_post_2,
    userId: 1
  },
];

describe(PostCreateUpdateStateMatcher.name, () => {
  let unittest = new Unittest();
  function setup() {
    const stateMatcher = new PostCreateUpdateStateMatcher();
    return { stateMatcher };
  }

  describe(unittest.SUITE_INITIAL_TEXT, () => {
    it('The variables have a valid initial state', () => {
      const { stateMatcher } = setup();
      expect(stateMatcher.isTitleInUse).toBe(false);
    });
  });
  
  describe(unittest.SUITE_METHODS_TEXT, () => {
    const msgUsedTitle = 'The variable isNameInUse is true when entering ' +
      'of an existing username';
    const msgUnusedTitle = 'The variable isNameInUse is false when entering ' +
      'of a non-existing partner names';
    const msgUnusedTitleCaseEmptyList = 'The variable isNumberInUse is false if ' +
    'The list of entries is empty'
      
    it(msgUsedTitle, () => {
      testTitleInUseErrorStateMatcher(
        title_post_2, true, mockPostsList, setup()
      );
    });

    it(msgUnusedTitle, () => {
      testTitleInUseErrorStateMatcher(
        'HusseinT writes the unittests', false, mockPostsList, setup()
      );
    });

    it(msgUnusedTitleCaseEmptyList, () => {
      testTitleInUseErrorStateMatcher(
        title_post_1, false, mockEmptyPostsList, setup()
        );
    });
  });
});