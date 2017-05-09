import { environment } from '../../environments/environment';

export abstract class GeneralService   {
    private localhostBaseUrl: string = "http://localhost:3010";
    private prodBaseUrl: string = "https://icaroexames.ddns.net";
    // private headers = new Headers({
    //                                 'Content-Type': 'application/x-www-form-urlencoded',
    //                                 'Audience':'Any', 
    //                              });

    protected getBaseUrl():string{
        if (environment.production)
            return this.prodBaseUrl;
        else 
            return this.localhostBaseUrl;
    }                                 
}