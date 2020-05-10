import { Component, Inject } from '@angular/core';
import { AppContext } from 'src/app/infrastructure/app.context';
import { Column } from 'src/app/models/column';
import { MatDialogRef } from '@angular/material/dialog';
import { AppSession } from 'src/app/infrastructure/sessions/app.session';


@Component({
    selector: 'app-column',
    templateUrl: './column.component.html',
    styleUrls: ['./column.component.scss']
})
export class ColumnComponent {
    availableColumns: Column[] = [];
    linkList: Column[] = [];
    rightList: Column[] = [];

    constructor(
        private appContext: AppContext,
        public dialogRef: MatDialogRef<ColumnComponent>
    ) {
        this.availableColumns = appContext.Session.getAllColumns()

    }

    cancel(): void {
        this.dialogRef.close();
    }

    ok(): void {
        let visibleColumns = [];
        for (let index = 0; index < this.availableColumns.length; index++) {
            if (this.availableColumns[index].IsVisible) {
                visibleColumns.push(this.availableColumns[index].Id);
            }
        }

        let json = JSON.stringify(visibleColumns);
        localStorage.setItem(AppSession.VISIBLE_COLUMNS,json);
        this.appContext.Session.OnVisibleColumnChanged.emit();
        this.dialogRef.close();
    }
}