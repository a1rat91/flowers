import { gsap } from 'gsap/all';

const positionConfigFadeInFrom = { y: 20, z: 0, opacity: 0};
const positionConfigFadeInTo = { duration: 0.3, y: 0, z: 0, opacity: 1, delay: 0.3, stagger: 0.1, ease: 'expo'};

const positionConfigFadeOutFrom = { y: 0, z: 0, opacity: 1};
const positionConfigFadeOutTo = { duration: 0.3, y: 20, z: 0, opacity: 0, delay: 0.3, stagger: 0.1, ease: 'expo'};

export function fadeInNavigation(nav, navItems) {

    const navConfig = { duration: 1, y: 0, z: 0, ease: 'expo.inOut'};

    return gsap.timeline()
        .to(nav, navConfig)
        .fromTo(navItems, positionConfigFadeInFrom, positionConfigFadeInTo);
}

export function fadeOutNavigation(nav, navItems) {

    const navConfig = { duration: 1, y: '-130%', z: 0, ease: 'expo.inOut'};

    return gsap.timeline()
        .fromTo(navItems, positionConfigFadeOutFrom, positionConfigFadeOutTo)
        .to(nav, navConfig);

}
