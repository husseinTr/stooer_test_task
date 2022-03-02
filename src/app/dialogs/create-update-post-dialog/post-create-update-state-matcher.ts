import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';

import { ErrorStateMatcher } from '@angular/material/core';
import { Injectable } from '@angular/core';
import { Post, PostCreateUpdateDialogOperationValue } from '../../components/interfaces';

/**
 * Matcher für die Text-Eingaben im Dialog für die User.
 *
 * In erster Linie dient es momentan um die Farben des Eingabefelds zu konfigurieren.
 */
@Injectable()
export class PostCreateUpdateStateMatcher extends ErrorStateMatcher {
  private entries: Post[] = [];

  isTitleInUse = false;

  /**
   * Dialogs operation
   */
  private dialogOperation!: string;

  setPostEntries(entries: any, operation: string): void {
    this.entries = Array.isArray(entries) ? entries : [];
    this.dialogOperation = operation;
  }

  /**
   * Checks whether the control is in the error state.
   *
   * @param control Form-controlelement
   * @param _form the form to be validated
   *
   * @returns true if the element is in error state, otherwise false
   */
  override isErrorState(
    control: FormControl | any,
    _form: FormGroupDirective | NgForm | null
  ): boolean {
    this.isTitleInUse = false;

    if (
      Array.isArray(this.entries) &&
      this.entries.length > 0 &&
      this.dialogOperation === PostCreateUpdateDialogOperationValue.CREATE_POST
    ) {
      const controlValue = control.value.toUpperCase().trim();

      for (const entry of this.entries) {
        if (entry && entry.title.toUpperCase().trim() === controlValue) {
          this.isTitleInUse = true;
          return true;
        }
      }
    }
    return control && control.invalid && (control.dirty || control.touched);
  }
}
