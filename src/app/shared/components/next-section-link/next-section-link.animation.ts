import { gsap } from 'gsap/all';

const linkConfigFadeInFrom = {opacity: 0, x: 20};
const linkConfigFadeInTo = {opacity: 1, x: 0, delay: 3};
const linkConfigFadeOutFrom = {opacity: 1, x: 0};
const linkConfigFadeOutTo = {opacity: 0, x: 20, delay: 3};

gsap.timeline({defaults: {
        ease: 'expo',
        duration: 0.5
    }
});

export function startNextSectionLink(link) {
    return gsap.timeline()
        .fromTo(link, linkConfigFadeInFrom, linkConfigFadeInTo);
}

export function fadeInNextSectionLink(link) {
    return gsap.timeline()
        .fromTo(link, linkConfigFadeInFrom, linkConfigFadeInTo);
}

export function fadeOutNextSectionLink(link) {
    return gsap.timeline()
        .fromTo(link, linkConfigFadeOutFrom, linkConfigFadeOutTo);
}

export function fadeOutInNextSectionLink(link) {
    return gsap.timeline()
        .fromTo(link, {opacity: 1, x: 0}, {opacity: 0, x: 20})
        .to(link, { opacity: 1, x: 0, delay: 2});
}
