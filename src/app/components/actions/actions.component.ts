import {Component, ViewEncapsulation} from '@angular/core';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {PopupComponent} from '../popup/popup.component';

@Component({
    selector: 'app-actions',
    templateUrl: './actions.component.html',
    styleUrls: ['./actions.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ActionsComponent {

    constructor(private ngxSmartModalService: NgxSmartModalService) {
    }

    getPopup() {
        this.ngxSmartModalService.create('myModal1', PopupComponent, {customClass: 'nsm-centered'}).open();
    }
}
