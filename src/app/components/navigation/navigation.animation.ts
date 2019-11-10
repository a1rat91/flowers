import { TweenMax, Power0, Power1, Power2, Power4, Circ, Expo, Bounce, Back, TimelineMax, TweenConfig } from 'gsap';

export function fadeInNavigation(nav, navItems) {
    const navConfig: TweenConfig = { yPercent: -100, delay: 0.5, ease: Expo.easeInOut};
    const positionConfig: TweenConfig = { y: 20, opacity: 1, ease: Expo.easeOut};

    return new TimelineMax()
        .staggerTo(navItems, 0.7, positionConfig, 0.2)
        .to(nav, 1.6, navConfig);
}

export function fadeOutNavigation(nav, navItems) {
    const navConfig: TweenConfig = { yPercent: 0, delay: 0.5, ease: Expo.easeInOut};
    const positionConfig: TweenConfig = { y: -10, opacity: 0, ease: Expo.easeOut};

    return new TimelineMax()
        .to(nav, 1.6, navConfig)
        .staggerFrom(navItems, 0.8, positionConfig, 0.2);
}