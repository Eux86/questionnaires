import { Injectable } from '@angular/core'
import { Http,ConnectionBackend,RequestOptionsArgs,RequestOptions,Response } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import 'rxjs/Rx';


@Injectable()
export class HttpOverride extends Http {

    private pendingObserver: Subscriber<{}>;
    public pendingObservable: Observable<boolean>;

    pending:number = 0;
    showingSpinner:boolean = false;

    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
        super(backend, defaultOptions);
        this.pendingObservable = new Observable(observer => {
            this.pendingObserver = observer;
        }).share();
        
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        console.log('get...');
        return this.intercept(super.get(url, options));
    }

    intercept(observable: Observable<Response>): Observable<Response> {
        this.addPending();
        return observable
            .catch((err, source) => {
                console.log("Caught error: " + err);
                this.removePending();
                return null;                                            // TODO: What should I return here?
                // return source;
            })
            .do((res: Response) => {
                console.log("Response: " + res);
                this.removePending();
            }, (err: any) => {
                console.log("Caught error. Spinner Off: " + err);
                this.removePending();
            })
            .finally(() => {
                console.log("Finally.. Spinner off")
                this.removePending();
            });
    }

    addPending(){
        this.pending++;
        this.showingSpinner == this.pending>0;
        console.log('Add pending: '+this.pending);        
        if (this.pendingObserver!=null)
            this.pendingObserver.next(this.showingSpinner);
    }
    removePending(){
        this.pending--;
        this.showingSpinner == this.pending>0;
        console.log('Remove pending: '+this.pending);                
        if (this.pendingObserver!=null)
            this.pendingObserver.next(this.showingSpinner);
    }
}
