import { Injectable, isDevMode, OnInit } from '@angular/core'

import { environment } from '../../environments/environment';
import { GeneralService } from './general.service'
import {HttpOverride } from './../../HttpOverride';

import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import 'rxjs/Rx';


@Injectable()
export class SpinnerService extends GeneralService {
    private pendingObserver: Subscriber<{}>;
    public pendingObservable: Observable<boolean>;

    
    constructor (private httpOverride: HttpOverride) {
        super();
        this.pendingObservable = new Observable(observer => {
            this.pendingObserver = observer;
        }).share();
    }

    public start(){
        if (this.pendingObserver!=null)
            this.pendingObserver.next(true);
    }

    public stop(){
        if (this.pendingObserver!=null)
            this.pendingObserver.next(false);
    }

}