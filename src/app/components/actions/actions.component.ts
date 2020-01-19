import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'app-actions',
    templateUrl: './actions.component.html',
    styleUrls: ['./actions.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ActionsComponent implements OnInit {
    @Input() posts;

    constructor() {

    }

    ngOnInit() {
    }

}
