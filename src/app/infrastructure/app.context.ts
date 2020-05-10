import { Injectable } from '@angular/core';
import { AppSession } from './sessions/app.session';

@Injectable()
export class AppContext {
    constructor(
        private appSession: AppSession
    ) {

    }
    
    get Session(): AppSession {
        return this.appSession;
    }
}