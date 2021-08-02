import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";

@Injectable()
export class SharedService {

    messageSource: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor() { }
}