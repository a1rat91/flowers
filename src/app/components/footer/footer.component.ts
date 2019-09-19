import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styles: [
        `
        .footer {
            position: relative;
            z-index: 200;
        }
      `
    ],
    styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

    @ViewChild('footer', {static: true}) footer: ElementRef;

    constructor() {
    }

    ngOnInit() {
        const footerBottom = (footerSelector, wrapperSelector) => {
            const footer = document.querySelector(footerSelector);
            const wrapper = document.querySelector(wrapperSelector);
            let height;
            let setSize;

            if (!wrapper || !footer) {
                return false;
            }

            setSize = () => {

                height = footer.offsetHeight;

                // wrapper.style.paddingBottom = height + 'px';
                footer.style.marginTop = (height * (-1)) + 'px';

            }

            setSize();

            window.addEventListener('resize', setSize, false);
        };

        footerBottom('.page__footer-wrapper', '.page__content');
    }
}
