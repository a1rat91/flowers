import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-soc',
    templateUrl: './soc.component.html',
    styleUrls: ['./soc.component.scss']
})
export class SocComponent implements OnInit {
    soc;

    constructor() {

    }

    ngOnInit() {
        this.soc =
            [
                {
                    link: '#',
                    icon: 'inst.svg'
                },
                {
                    link: '#',
                    icon: 'fb.svg'
                },
                {
                    link: '#',
                    icon: 'whatsapp.svg'
                },
                {
                    link: '#',
                    icon: 'vk.svg'
                }
            ];
    }

}
