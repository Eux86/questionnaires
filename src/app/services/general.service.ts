import { environment } from '../../environments/environment';

export abstract class GeneralService   {
    private localhostBaseUrl: string = "http://localhost:3010";
    private prodBaseUrl: string = "https://icaroexames.ddns.net";

    protected getBaseUrl():string{
        if (environment.production || environment.useRemoteApi)
            return this.prodBaseUrl;
        else 
            return this.localhostBaseUrl;
    }                                 
}