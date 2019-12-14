import { EaselPlugin, gsap } from 'gsap/all';
gsap.registerPlugin(EaselPlugin);

export function fadeInSoc(socItem) {

    const socConfig = { duration: 0.5, opacity: 1, stagger: 0.1, ease: 'expo'};

    return gsap.timeline()
        .to(socItem, socConfig);
}

export function fadeOutSoc(socItem) {

    const socConfig = { duration: 0.5, opacity: 0, stagger: 0.1, ease: 'expo'};

    return gsap.timeline()
        .to(socItem, socConfig);
}
