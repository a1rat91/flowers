import { EaselPlugin, gsap } from 'gsap/all';
gsap.registerPlugin(EaselPlugin);

export function fadeInNextSectionLink(link) {

    const linkConfig = { duration: 0.5, opacity: 1, ease: 'expo'};

    return gsap.timeline()
        .to(link, linkConfig);
}

export function fadeOutNextSectionLink(link) {

    const linkConfig = { duration: 0.5, opacity: 0, ease: 'expo'};

    return gsap.timeline()
        .to(link, linkConfig);
}
