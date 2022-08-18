import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";


@Injectable({
    providedIn: 'root',
})
export class StockService {
    constructor(private http: HttpClient) { }

    // azionario flessibile
    getQBUO(): Observable<any> {
        return this.http.get<any>("https://api.allorigins.win/get?url=" + environment.apiUrl + "QBUO?period=4");
    }

    // mix 3
    getQBA8A(): Observable<any> {
        return this.http.get<any>("https://api.allorigins.win/get?url=" + environment.apiUrl + "QBA8A?period=4");
    }

    // azionario internazionale
    getQBFC(): Observable<any> {
        return this.http.get<any>("https://api.allorigins.win/get?url=" + environment.apiUrl + "QBFC?period=4");
    }
}