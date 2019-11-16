import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Post} from '../../../admin/shared/interfaces';

@Component({
    selector: 'app-catalog-item',
    templateUrl: './catalog-item.component.html',
    styleUrls: ['./catalog-item.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CatalogItemComponent implements OnInit {

    @Input() post: Post;
    @Input() index;

    constructor() {
    }

    ngOnInit() {
    }

}
