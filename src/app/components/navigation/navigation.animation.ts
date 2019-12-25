import { gsap } from 'gsap/all';
gsap.ticker.lagSmoothing(1000, 16);

export function fadeInNavigation(nav, navItems) {

    const navConfig = { duration: 1, y: 0, ease: 'expo.inOut'};
    const positionConfig = { duration: 0.5, y: 0, delay: 0.3, stagger: 0.1, ease: 'expo'};

    return gsap.timeline()
        .to(nav, navConfig)
        .to(navItems, positionConfig);
}

export function fadeOutNavigation(nav, navItems) {

    const navConfig = { duration: 1, y: '-130%', ease: 'expo.inOut'};
    const positionConfig = {duration: 0.5, y: '-100%', delay: 0.3, stagger: 0.1, ease: 'expo'};

    return gsap.timeline()
        .to(navItems, positionConfig)
        .to(nav, navConfig);

}
