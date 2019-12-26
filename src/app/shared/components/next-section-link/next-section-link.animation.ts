import { gsap } from 'gsap/all';

export function startNextSectionLink(link) {

    const linkConfig = { duration: 0.5, opacity: 1, y: 0, delay: 3, ease: 'expo'};

    return gsap.timeline()
        .to(link, linkConfig);
}

export function fadeInNextSectionLink(link) {

    const linkConfig = { duration: 0.9, opacity: 1, y: 0, ease: 'expo'};

    return gsap.timeline()
        .to(link, linkConfig);
}

export function fadeOutNextSectionLink(link) {

    const linkConfig = { duration: 0.9, opacity: 0, y: -30, ease: 'expo'};

    return gsap.timeline()
        .to(link, linkConfig);
}

export function fadeOutInNextSectionLink(link) {

    const linkOutConfig = { duration: 0.9, opacity: 0, y: -30, ease: 'expo'};
    const linkInConfig = { duration: 0.9, opacity: 1, y: 0, ease: 'expo'};

    return gsap.timeline()
        .to(link, linkOutConfig)
        .to(link, linkInConfig);
}
