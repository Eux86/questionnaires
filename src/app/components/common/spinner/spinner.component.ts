import { Component, ViewChild } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import '../../../../../node_modules/spin/spin.js'

import { HttpOverride } from './../../../../HttpOverride';

declare var Spinner: any;

@Component({
    moduleId: module.id,
    selector: 'spinner',
    templateUrl: 'spinner.component.html',
    styleUrls: ['spinner.component.css'],
})
export class SpinnerComponent implements OnInit, OnDestroy {
    private DELAY_BEFORE_SPINNING = 200; // ms
    public spinning: boolean = false;
    private shouldSpin: boolean = false;3
    private spinner: any;

    constructor(
        private httpOverride: HttpOverride,
    ) { }

    @ViewChild('spinnerElement')
    spinnerElement: HTMLDivElement;


    ngOnInit() {
        this.initSpinner();
        this.createServiceSubscription();
    }

    ngOnDestroy() {

    }

    private initSpinner() {
        let opts = {
            lines: 13 // The number of lines to draw
            , length: 28 // The length of each line
            , width: 14 // The line thickness
            , radius: 42 // The radius of the inner circle
            , scale: 1 // Scales overall size of the spinner
            , corners: 1 // Corner roundness (0..1)
            , color: '#000' // #rgb or #rrggbb or array of colors
            , opacity: 0.25 // Opacity of the lines
            , rotate: 0 // The rotation offset
            , direction: 1 // 1: clockwise, -1: counterclockwise
            , speed: 1 // Rounds per second
            , trail: 60 // Afterglow percentage
            , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
            , zIndex: 2e9 // The z-index (defaults to 2000000000)
            , className: 'spinner' // The CSS class to assign to the spinner
            , top: '50%' // Top position relative to parent
            , left: '50%' // Left position relative to parent
            , shadow: false // Whether to render a shadow
            , hwaccel: false // Whether to use hardware acceleration
            , position: 'absolute' // Element positioning
        }
        console.log('Creating spinner with options:');
        this.spinner = Spinner({ color: '#fff', lines: 12 });
    }

    private createServiceSubscription() {
        this.httpOverride.pendingObservable.subscribe(show => {
            this.spin(show)
        });
    }

    private spin(val: boolean) {
        let spinnerContainer = document.getElementById("spinnerElement");
        if (val) {
            setTimeout(() => {
                if (this.shouldSpin) {
                    this.spinner.spin(spinnerContainer)
                    this.spinning = true;
                }
            }, this.DELAY_BEFORE_SPINNING);
            this.shouldSpin = true;
        } else {
            this.spinner.stop();
            this.spinning = false;
            this.shouldSpin = false;
        }
    }
}