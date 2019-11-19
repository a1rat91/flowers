import {Component, DoCheck, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Post} from '../../../admin/shared/interfaces';

@Component({
    selector: 'app-catalog-item',
    templateUrl: './catalog-item.component.html',
    styleUrls: ['./catalog-item.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CatalogItemComponent implements OnInit, DoCheck {

    @Input() post: Post;
    @Input() index;
    @Input() lightBoxActivated;


    constructor() {
    }

    ngOnInit() {
    }

    ngDoCheck() {
        // console.log(this.lightBoxActivated);
    }

}
