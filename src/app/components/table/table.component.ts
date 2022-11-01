import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Entry } from 'src/app/models/entry';
import { AppContext } from 'src/app/infrastructure/app.context';
// import data from '../../../assets/data/test.json';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FileSaverService } from 'ngx-filesaver';
import { MatDialog } from '@angular/material/dialog';
import { ColumnComponent } from '../column/column.component';
import { Column } from 'src/app/models/column';
import { DelimiterComponent } from '../delimiter/delimiter.component';


@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    dataSource: any;
    visibleColumns: Column[] = [];
    columnHeaders: string[] = [];
    pageUrl: string;


    constructor(
        private router: Router,
        private appContext: AppContext,
        private fileSaverService: FileSaverService,
        private dialog: MatDialog
    ) {
        this.appContext.Session.OnVisibleColumnChanged.subscribe((x) => this.setVisibleColumns());

        this.setVisibleColumns();
        let entries = [];

        let state = this.router.getCurrentNavigation().extras.state;
        if (state) {
            entries = state.data as Entry[];
            this.pageUrl = state.pageUrl;
        }
        else {
            this.router.navigate(["/"]);
            // entries = data.log.entries;
            // this.pageUrl = data.log.pages[0].title

        }

        let rows: Entry[] = [];
        for (var index = 0; index < entries.length; index++) {
            rows.push(new Entry(entries[index]));
        }

        this.dataSource = new MatTableDataSource(rows);


    }

    ngOnInit(): void {
        this.dataSource.sort = this.sort;
    }

    setVisibleColumns() {
        this.visibleColumns = this.appContext.Session.getVisibleColumns();
        this.columnHeaders = [];
        for (let index = 0; index < this.visibleColumns.length; index++) {
            this.columnHeaders.push(this.visibleColumns[index].Id);
        }
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    exportToCsv() {
        const dialogRef = this.dialog.open(DelimiterComponent, {
            width: '300px',
        });

        dialogRef.afterClosed().subscribe(result => {
            if (!this.dataSource || !result) {
                return;
            }

            let rows = this.dataSource.connect().value;
            let content = "";
            for (let index = 0; index < this.visibleColumns.length; index++) {
                content += this.visibleColumns[index].Name + result;
            }

            content += "\r\n";

            for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
                for (let colIndex = 0; colIndex < this.visibleColumns.length; colIndex++) {
                    let value = rows[rowIndex][this.visibleColumns[colIndex].Id];
                    if (value) {
                        content += value + result;
                    } else {
                        content += result;
                    }
                }
                content += "\r\n";
            }

            var a = document.createElement('a');
            a.href = this.pageUrl;

            this.fileSaverService.saveText(content, a.hostname + ".csv");
        });        
    }

    columns() {
        const dialogRef = this.dialog.open(ColumnComponent, {
            width: '500px',
        });

        dialogRef.afterClosed().subscribe(result => {

        });
    }
}