import { Injectable } from "@angular/core";
import { DeviceDetectorService } from "ngx-device-detector";
import { NgxSpinnerService } from "ngx-spinner";

@Injectable()
export class UtilitiesService {

    constructor(
        private spinner: NgxSpinnerService,
        private deviceService: DeviceDetectorService) { }

    startSpinner() {
        this.spinner.show();
    }

    stopSpinner() {
        this.spinner.hide();
    }

    isMobile() {
        return this.deviceService.isMobile();
    }

    isDesktop() {
        return this.deviceService.isDesktop();
    }

    isTablet() {
        return this.deviceService.isTablet();
    }
}