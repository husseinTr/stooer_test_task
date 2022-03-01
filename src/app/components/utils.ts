import { MatSnackBar } from '@angular/material/snack-bar';
import { Post } from './interfaces';
import { Subscription } from 'rxjs';

/**
 * Removes subsciption event.
 * @param subscription
 */
export const removeRequestSubscription = (subscription: Subscription): void => {
  if (subscription) {
    subscription.unsubscribe();
  }
};

/**
 * Checks if the given array is not empty.
 *
 * @param array Array to be checked.
 *
 * @returns true, if the parameter is a non-empty array, false otherwise.
 */
export const isNonEmptyArray = (array: any): boolean => {
  return Array.isArray(array) && array.length > 0;
};

/**
 * Checks if the given object is non-empty object.
 *
 * @param object Object to be checked.
 *
 * @returns true, if the parameter is a non-empty object, false otherwise.
 */

export const isNonEmptyObject = (object: any): boolean => {
  return !!(isObjectValue(object) && Object.keys(object).length > 0);
};

/**
 * Checks whether the given parameter|value is really an object.
 *
 * @param object Value to be checked.
 *
 * @returns true if the parameter is an object, fasle otherwise.
 */
export const isObjectValue = (object: any): boolean => {
  return !!(object && typeof object === 'object' && !Array.isArray(object));
};

/**
 * Checks whether the passed value is a non-empty string
 *
 * @param stringValue Value to be checked.
 *
 * @returns true, if the value is a non-empty string, false otherwise.
 */
export const isNonEmptyStringValue = (stringValue: any): boolean => {
  return typeof stringValue === 'string' && stringValue.trim() !== '';
};

/**
 * Filters an array of post objects by the given value
 * @param vlaue Filter value
 * @param postsList Array to be filtered
 * @returns The filterd array of posts which contains the given title
 */
export const filterPostsByValue = (value: string, postsList: Post[]): Post[] => {
  if (typeof value != 'string') {
      return [];
    }
    if (value === '' || value === null) {
      return [];
    }
    return value
      ? postsList.filter(
          (post) => post.title.toLowerCase().indexOf(value.toLowerCase()) != -1
        )
      : postsList;
};

export const openErrorMsgSnackBar = (msg: string, snackBar: MatSnackBar) => {
  snackBar.open(msg, 'Ok', {
    duration: 2000,
  });
};
