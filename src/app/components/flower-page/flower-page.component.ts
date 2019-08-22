import {
    AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Page, FlowersService} from '../../services/flowers.service';
import {DistortionSliderPlugin} from '../distortion-slider/distortion-slider-plugin';

// import {imagesLoaded} from 'imagesLoaded';

@Component({
    selector: 'app-flower-page',
    templateUrl: './flower-page.component.html',
    styleUrls: ['./flower-page.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FlowerPageComponent implements OnInit {
    @Output() menuClosed: EventEmitter<any> = new EventEmitter<any>();
    id: string;

    page: Page;

    constructor(private route: ActivatedRoute,
                private flowersService: FlowersService) {
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.page = this.flowersService.getById(+params.id);
        });
    }
}
