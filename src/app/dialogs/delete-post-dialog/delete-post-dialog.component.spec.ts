import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DeletePostDialogComponent } from "./delete-post-dialog.component";
import { DialogComponentSetupConfig } from "../../components/interfaces";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MatDividerModule } from "@angular/material/divider";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { TestBed } from "@angular/core/testing";
import { Unittest } from "../../unittests/unittests";
import { dialogDataSetup } from "../create-update-post-dialog/create-update-post-dialog.component.spec";

describe(DeletePostDialogComponent.name, () => {
  const unittest = Unittest.forComponent(DeletePostDialogComponent);

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
      declarations: [DeletePostDialogComponent],
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        MatDialogModule,
        MatDividerModule,
        MatSnackBarModule,
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
      expect(component.status).toBe('failed');
      expect(component.postId).toBeUndefined();
      expect(component.deletePostSubscription).toBeUndefined();
    });
  });
});


