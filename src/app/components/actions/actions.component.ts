import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-actions',
    templateUrl: './actions.component.html',
    styleUrls: ['./actions.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionsComponent implements OnInit {
    @Input() posts;

    constructor() {

    }

    ngOnInit() {
    }

}
