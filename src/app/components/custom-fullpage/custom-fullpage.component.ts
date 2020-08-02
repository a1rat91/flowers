import {
    AfterViewInit,
    Component,
    ContentChildren,
    ElementRef, Inject, NgZone,
    OnDestroy,
    OnInit,
    QueryList,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {fromEvent, Subscription} from 'rxjs';
import {throttleTime} from 'rxjs/operators';
import {FadeService} from '../../services/fade.service';
import {gsap} from 'gsap/gsap-core';
import {
    fadeInMainSection,
    fadeOutMainSection,
    startMainSection,
    mobFadeInCatalogSection,
    mobFadeInActionsSection,
} from '../../pages/main-page/main-page.animation';
import {
    fadeInCatalogSection,
    fadeOutCatalogSection
} from '../catalog/catalog.animation';
import {fadeInActions, fadeOutActions} from '../actions/actions.animation';
import {disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks} from 'body-scroll-lock';

@Component({
    selector: 'app-custom-fullpage',
    templateUrl: './custom-fullpage.component.html',
    styleUrls: ['./custom-fullpage.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CustomFullpageComponent implements OnInit, AfterViewInit, OnDestroy {
    sectionIndex = 0;
    activeSection;
    disableFullPage = false;
    responsiveHeight = 700;
    responsiveWidth = 1024;
    mainSectionActive: boolean;
    @ViewChild('sections', {static: true}) public sections: ElementRef;
    @ContentChildren('section') private sectionList: QueryList<ElementRef>;
    private subscription = new Subscription();

    get section() {
        return this.sectionList.map((element) => element.nativeElement);
    }

    constructor(private ngZone: NgZone, private fadeService: FadeService) {
    }

    ngOnInit(): void {
        const myObservable = fromEvent(this.sections.nativeElement, 'mousewheel');
        const subscription = myObservable.pipe(
            throttleTime(3000)
        );

        this.subscription.add(subscription.subscribe(event => this.sectionChange(event)));
    }

    ngAfterViewInit(): void {
        this.isFullpageEnabled();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    sectionChange(event) {
        this.activeSection = this.section[this.sectionIndex];

        if (event.deltaY === 100) {
            this.nextSection();
        } else {
            this.prevSection();
        }
    }

    nextSection() {
        if (this.sectionIndex < this.section.length - 1) {
            ++this.sectionIndex;
        } else {
            return;
        }

        if (!this.disableFullPage) {
            if (this.sectionIndex === 1) {
                this.fadeService.changeSectionState('fadeOutMainSection');
                this.fadeOutMainSection();
                this.mainSectionActive = false;
            } else if (this.sectionIndex === 2) {
                this.fadeService.changeSectionState('fadeOutCatalogSection');
                this.fadeOutCatalogSection();
            }
        }

        this.addActiveClass(this.section);
    }

    prevSection() {
        if (this.sectionIndex > 0) {
            --this.sectionIndex;
        } else {
            return;
        }

        if (this.sectionIndex === 0) {
            this.fadeService.changeSectionState('fadeInMainSection');
            this.fadeInMainSection();
            this.mainSectionActive = true;
        } else if (this.sectionIndex === 1) {
            this.fadeService.changeSectionState('fadeInCatalogSection');
            this.fadeInCatalogSection();
        }

        this.addActiveClass(this.section);
    }

    addActiveClass(items) {
        items.forEach((item) => {
            item.classList.remove('is-active');
        });
        items[this.sectionIndex].classList.add('is-active');
    }

    isFullpageEnabled() {
        if (window.innerWidth <= this.responsiveWidth || window.innerHeight <= this.responsiveHeight) {
            this.disableFullPage = true;
            clearAllBodyScrollLocks();
        } else {
            this.disableFullPage = false;
            disableBodyScroll(document.querySelector('body'));
            disableBodyScroll(document.querySelector('html'));
        }
    }

    fadeInMainSection() {
        this.ngZone.runOutsideAngular(() => {
                gsap.timeline({id: 'fadeInMainSection'})
                    .add(fadeOutCatalogSection('.catalog-title',
                        '.catalog-item__pic',
                        '.catalog-item__curtain',
                        '.catalog-item__index',
                        '.catalog-item__title',
                        '.catalog__btn',
                        '.catalog__shadow',
                        '.catalog__pagination',
                        '.catalog-item__link'))
                    .add(fadeInMainSection('.main-section__curtain', '.main-section__title', '.main-section__btn', '.main-section__mouse'));
            }
        );
    }

    fadeOutMainSection() {
        this.ngZone.runOutsideAngular(() => {
                gsap.timeline({id: 'fadeOutMainSection'})
                    .add(fadeOutMainSection('.main-section__curtain'))
                    .add(fadeInCatalogSection('.catalog-title',
                        '.catalog-item__pic',
                        '.catalog-item__curtain',
                        '.catalog-item__index',
                        '.catalog-item__title',
                        '.catalog__btn',
                        '.catalog__shadow',
                        '.catalog__pagination',
                        '.catalog-item__link'));
            }
        );

    }

    fadeInCatalogSection() {
        this.ngZone.runOutsideAngular(() => {
                gsap.timeline({id: 'fadeInCatalogSection'})
                    .add(fadeOutActions('.actions__curtain',
                        '.actions__pic',
                        '.actions__title',
                        '.actions__desc',
                        '.actions__btn',
                        '.footer'))
                    .add(fadeInCatalogSection('.catalog-title',
                        '.catalog-item__pic',
                        '.catalog-item__curtain',
                        '.catalog-item__index',
                        '.catalog-item__title',
                        '.catalog__btn',
                        '.catalog__shadow',
                        '.catalog__pagination',
                        '.catalog-item__link'));
            }
        );

    }

    fadeOutCatalogSection() {
        this.ngZone.runOutsideAngular(() => {
                gsap.timeline({id: 'fadeOutCatalogSection'})
                    .set('.actions__curtain', {opacity: 0})
                    .add(fadeOutCatalogSection('.catalog-title',
                        '.catalog-item__pic',
                        '.catalog-item__curtain',
                        '.catalog-item__index',
                        '.catalog-item__title',
                        '.catalog__btn',
                        '.catalog__shadow',
                        '.catalog__pagination',
                        '.catalog-item__link'))
                    .add(fadeInActions('.actions__curtain',
                        '.actions__pic',
                        '.actions__title',
                        '.actions__desc',
                        '.actions__btn',
                        '.footer'));
            }
        );

    }

}
