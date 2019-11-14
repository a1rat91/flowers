import { TweenMax, Power0, Power1, Power2, Power4, Circ, Expo, Bounce, Back, TimelineMax, TweenConfig } from 'gsap';

export function fadeInNavigation(nav, navItems) {

    const navConfig: TweenConfig = { top: '0', ease: Expo.easeInOut};
    const positionConfig: TweenConfig = { top: '0', delay: 0.3, ease: Expo.easeOut};

    return new TimelineMax()
        .to(nav, 1, navConfig)
        .staggerTo(navItems, 0.5, positionConfig, 0.1);
}

export function fadeOutNavigation(nav, navItems) {

    const navConfig: TweenConfig = { top: '-100%', ease: Expo.easeInOut};
    const positionConfig: TweenConfig = { top: '-150px', delay: 0.3, ease: Expo.easeOut};

    return new TimelineMax()
        .staggerTo(navItems, 0.5, positionConfig, 0.1)
        .to(nav, 1, navConfig);

}
