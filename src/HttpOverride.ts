///
/// https://www.illucit.com/blog/2016/03/angular2-http-authentication-interceptor/
///

import { Injectable } from '@angular/core'
import { Http,ConnectionBackend,RequestOptionsArgs,RequestOptions,Response } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import 'rxjs/Rx';
import { Router} from '@angular/router';

@Injectable()
export class HttpOverride extends Http {
    public pendingObservable: Observable<boolean>;
    
    private pendingObserver: Subscriber<{}>;
    private pending:number = 0;
    private showingSpinner:boolean = false;
    // private _router: Router;

    constructor(
        private backend: ConnectionBackend, 
        private defaultOptions: RequestOptions,
        private router:Router) 
    {
        super(backend, defaultOptions);
        
        this.pendingObservable = new Observable(observer => {
            this.pendingObserver = observer;
        }).share();

        // this._router = router;
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.get(url, options));
    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {   
        return this.intercept(super.post(url, body,options));        
    }

    intercept(observable: Observable<Response>): Observable<Response> {
        this.addPending();
        return observable
            .catch((err, source) => {
                console.log("Caught error: " + err);
                this.handleError(err);
                return Observable.empty();                                            
            })
            .do((res: Response) => {
                console.log("Response: " + res);
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
        this.showingSpinner = this.pending>0;
        console.log('Add pending: '+this.pending);        
        if (this.pendingObserver!=null)
            this.pendingObserver.next(this.showingSpinner);
    }
    removePending(){
        this.pending--;
        this.showingSpinner = this.pending>0;
        console.log('Remove pending: '+this.pending);                
        if (this.pendingObserver!=null)
            this.pendingObserver.next(this.showingSpinner);
    }

    handleError(err:Response){
        if (err.status==0){
            this.router.navigate(['/error']);
        } 
        if (err.status==401){
            this.router.navigate(['/login',true]);
        }
    }
}
