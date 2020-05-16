import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-delimiter',
    templateUrl: './delimiter.component.html',
    styleUrls: ['./delimiter.component.scss']
})
export class DelimiterComponent {

    selectedDelimiter: string;
    otherValue: string;

    constructor(
        public dialogRef: MatDialogRef<DelimiterComponent>

    ) {
        this.selectedDelimiter = ";";
    }

    cancel(): void {
        this.dialogRef.close();
    }

    ok() {
        let result = this.selectedDelimiter;
        if (this.selectedDelimiter === "tab") {
            result = "	";
        }
        else if (this.selectedDelimiter === "other") {
            result = this.otherValue;
        }
        this.dialogRef.close(result);
    }
}