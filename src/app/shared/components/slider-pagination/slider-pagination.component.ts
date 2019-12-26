import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'app-slider-pagination',
    templateUrl: './slider-pagination.component.html',
    styleUrls: ['./slider-pagination.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderPaginationComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}
