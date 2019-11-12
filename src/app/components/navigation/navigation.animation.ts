import { TweenMax, Power0, Power1, Power2, Power4, Circ, Expo, Bounce, Back, TimelineMax, TweenConfig } from 'gsap';

export function fadeInNavigation(nav, navItems) {
    const navConfig: TweenConfig = { yPercent: -100, delay: 0.5, ease: Expo.easeInOut};
    const positionConfig: TweenConfig = { y: 100, ease: Expo.easeOut};

    return new TimelineMax()
        .staggerTo(navItems, 0.45, positionConfig, 0.1)
        .to(nav, 1, navConfig);
}

export function fadeOutNavigation(nav, navItems) {
    const navConfig: TweenConfig = { yPercent: 0, delay: 0.5, ease: Expo.easeInOut};
    const positionConfig: TweenConfig = { y: 0, ease: Expo.easeOut};

    return new TimelineMax()
        .to(nav, 1, navConfig)
        .staggerTo(navItems, 0.45, positionConfig, 0.1);
}
