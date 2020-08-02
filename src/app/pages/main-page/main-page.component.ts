import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    NgZone,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {Subscription} from 'rxjs/index';
import {PostsService} from '../../shared/posts.service';
import {NavigationService} from '../../services/navigation.service';
import {LoaderService} from '../../components/loader/loader.service';
import {gsap} from 'gsap';
import {
    fadeInMainSection,
    fadeOutMainSection,
    startMainSection,
    mobFadeInCatalogSection,
    mobFadeInActionsSection,
} from './main-page.animation';


import {FadeService} from '../../services/fade.service';
import {DOCUMENT} from '@angular/common';
import {CatalogComponent} from '../../components/catalog/catalog.component';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent implements OnInit, AfterViewInit, OnDestroy {

    config: any;
    navigation: boolean;
    @ViewChild(CatalogComponent, {static: false}) catalogComponent: CatalogComponent;
    loaderStatus: string;
    desktopMediaQuery: boolean;
    sectionState: string;

    private subscription = new Subscription();

    constructor(private navigationService: NavigationService,
                private postsService: PostsService,
                private loaderService: LoaderService,
                private fadeService: FadeService,
                private cdr: ChangeDetectorRef,
                private ngZone: NgZone,
                @Inject(DOCUMENT) private document: Document) {

        this.isDesctop();

        window.addEventListener('resize', () => this.isDesctop());
    }

    ngOnInit() {

        this.cdr.detectChanges();
        this.subscription
            .add(
                this.fadeService.currentSectionState.subscribe(sectionState => this.sectionState = sectionState)
            ).add(
            this.navigationService.currentNavigationState.subscribe(navigation => {
                return this.navigation = navigation;
            }));
    }

    ngAfterViewInit(): void {
        this.subscription.add(
            this.loaderService.currentLoaderState.subscribe(status => this.loaderStatus = status)
        );
        this.loaderService.changeLoaderState('enable');
        setTimeout(() => {
            this.startMainSection();
            this.fadeService.changeSectionState('fadeInMainPage');
        }, 500);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    startMainSection() {
        this.ngZone.runOutsideAngular(() => {
                gsap.timeline({id: 'fadeInMainSection'})
                    .add(startMainSection('.main-section__title', '.main-section__btn', '.main-section__mouse'));
            }
        );

    }


    isDesctop() {
        (window.innerWidth >= 1300) ? this.desktopMediaQuery = true : this.desktopMediaQuery = false;
        return this.desktopMediaQuery;
    }


}
