import { gsap } from 'gsap/all';

const socItemConfigFadeInFrom = {opacity: 0, y: 20};
const socItemConfigFadeInTo = {opacity: 1, y: 0, delay: 3};
const socItemConfigFadeOutFrom = {opacity: 1, y: 0};
const socItemConfigFadeOutTo = {opacity: 0, y: 20, delay: 3};

gsap.timeline({defaults: {
        ease: 'expo',
        duration: 0.5
    }
});

export function startSoc(socItem) {
    return gsap.timeline()
        .fromTo(socItem, socItemConfigFadeInFrom, socItemConfigFadeInTo);
}

export function fadeInSoc(socItem) {

    return gsap.timeline()
        .fromTo(socItem, socItemConfigFadeInFrom, socItemConfigFadeInTo);
}

export function fadeOutSoc(socItem) {

    return gsap.timeline()
        .fromTo(socItem, socItemConfigFadeOutFrom, socItemConfigFadeOutTo);
}

export function fadeOutInSoc(socItem) {
    return gsap.timeline()
        .fromTo(socItem, {opacity: 1, y: 0}, {opacity: 0, y: 20})
        .to(socItem, { opacity: 1, y: 0, delay: 2});
}
