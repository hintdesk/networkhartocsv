import { Injectable, EventEmitter } from '@angular/core';
import { Columns } from 'src/app/models/columns';
import { Column } from 'src/app/models/column';

@Injectable()
export class AppSession {
    static VISIBLE_COLUMNS: string = "VisibleColumns"
    public OnVisibleColumnChanged: EventEmitter<string> = new EventEmitter()

    getVisibleColumns(): Column[] {
        let visibleColumns: Column[] = [];
        let allColumns = this.getAllColumns();

        for (let index = 0; index < allColumns.length; index++) {
            if (allColumns[index].IsVisible) {
                visibleColumns.push(allColumns[index]);
            }
        }
        return visibleColumns;
    }

    private readVisibleColumns(): string[] {
        let json = localStorage.getItem(AppSession.VISIBLE_COLUMNS);
        if (!json) {
            return this.getDefaultVisibleColumns();
        }
        else {
            return JSON.parse(json) as string[];
        }

    }

    getDefaultVisibleColumns(): string[] {
        return [
            Columns.NAME,
            Columns.TYPE,
            Columns.SIZE
        ];
    }

    getAllColumns(): Column[] {
        let result = [
            new Column(Columns.CACHECONTROL, "Cache-Control"),
            // new Column(Columns.CONNECTION, "Connection"),
            // new Column(Columns.CONNECTIONID, "Connection ID"),
            new Column(Columns.CONTENTENCODING, "Content-Encoding"),
            new Column(Columns.CONTENTLENGTH, "Content-Length"),
            new Column(Columns.COOKIES, "Cookies"),
            new Column(Columns.DOMAIN, "Domain"),
            // new Column(Columns.ENDTIME, "End Time"),
            // new Column(Columns.ETAG, "ETag"),
            new Column(Columns.INITIATOR, "Initiator"),
            // new Column(Columns.KEEPALIVE, "Keep-Alive"),
            new Column(Columns.LASTMODIFIED, "Last-Modified"),
            // new Column(Columns.LATENCY, "Latency"),
            new Column(Columns.METHOD, "Method"),
            new Column(Columns.NAME, "Name"),
            new Column(Columns.PATH, "Path"),
            new Column(Columns.PRIORITY, "Priority"),
            // new Column(Columns.PROTOCOL, "Protocol"),
            new Column(Columns.REMOTEADDRESS, "Remote Address"),
            // new Column(Columns.RESPONSETIME, "Response Time"),
            new Column(Columns.SCHEME, "Scheme"),
            new Column(Columns.SERVER, "Server"),
            new Column(Columns.SETCOOKIES, "Set Cookies"),
            new Column(Columns.SIZE, "Size"),
            // new Column(Columns.STARTTIME, "Start Time"),
            new Column(Columns.STATUS, "Status"),
            new Column(Columns.TIME, "Time"),
            // new Column(Columns.TOTALDURATION, "Total Duration"),
            new Column(Columns.TYPE, "Type"),
            new Column(Columns.URL, "Url"),
            new Column(Columns.VARY, "Vary"),
        ];

        let visibleColumns = this.readVisibleColumns();
        for (let index = 0; index < result.length; index++) {
            if (visibleColumns.indexOf(result[index].Id) >= 0) {
                result[index].IsVisible = true;
            }
        }

        return result;
    }
}