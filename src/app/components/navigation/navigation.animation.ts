import { gsap, Expo } from 'gsap';

export function fadeInNavigation(nav, navItems) {

    const navConfig = { duration: 1, top: '0', ease: Expo.easeInOut};
    const positionConfig = { duration: 0.5, top: '0', delay: 0.3, stagger: 0.1, ease: Expo.easeOut};

    return gsap.timeline()
        .to(nav, navConfig)
        .to(navItems, positionConfig);
}

export function fadeOutNavigation(nav, navItems) {

    const navConfig = { duration: 1, top: '-130%', ease: Expo.easeInOut};
    const positionConfig = {duration: 0.5, top: '-150px', delay: 0.3, stagger: 0.1, ease: Expo.easeOut};

    return gsap.timeline()
        .to(navItems, positionConfig)
        .to(nav, navConfig);

}
