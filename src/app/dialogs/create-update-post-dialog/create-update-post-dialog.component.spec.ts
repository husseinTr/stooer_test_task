import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CreateUpdatePostDialogComponent } from "./create-update-post-dialog.component";
import { DialogComponentSetupConfig } from "../../components/interfaces";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { TestBed } from "@angular/core/testing";
import { Unittest } from "../../unittests/unittests";

export const dialogDataSetup = {
  dialogData: {},
};

describe(CreateUpdatePostDialogComponent.name, () => {
  const unittest = Unittest.forComponent(CreateUpdatePostDialogComponent);

  const setup = (
    config: DialogComponentSetupConfig = { detectChanges: true },
  ) => {
    const close = (): void => {};
    let dialogMock = { close };
    const dialogData = config.dialogData;
    if (config.hasOwnProperty('dialogRef')) {
      dialogMock = config.dialogRef;
    }

    TestBed.configureTestingModule({
      declarations: [CreateUpdatePostDialogComponent],
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        MatDialogModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSnackBarModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: dialogMock,
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: dialogData,
        },
      ],
    }).compileComponents();

    const base = unittest.setup();
    const realDialogRef = unittest.get(MatDialogRef);
    const realDialogData = TestBed.inject(MAT_DIALOG_DATA);

    return {
      ...base,
      dialogRef: realDialogRef,
      dialogData: realDialogData,
    };
  };

  describe(unittest.SUITE_INITIAL_TEXT, () => {

    it(unittest.COMPONENT_CREATED_TEXT, () => {
      const { component } = setup(dialogDataSetup);
      expect(component).toBeTruthy();
    });

    it(unittest.COMPONENT_INITIAL_STATUS_TEXT, () => {
      const { component } = setup();
      expect(component.dialogTitle).toBe('');
      expect(component.buttonTitle).toBe('');
      expect(component.status).toBe('failed');
      expect(component.updatePostSubscription).toBeUndefined();
      expect(component.createNewPostSubscription).toBeUndefined();
      expect(component.postTitleControl.value).toBe('');
      expect(component.postBodyControl.value).toBe('');
    });
  });
});

