import { gsap } from 'gsap/all';

export function startSoc(socItem) {

    const socConfig = { duration: 0.9, opacity: 1, x: 0, delay: 3, ease: 'expo'};

    return gsap.timeline()
        .to(socItem, socConfig);
}

export function fadeInSoc(socItem) {

    const socConfig = { duration: 0.9, opacity: 1, x: 0, ease: 'expo'};

    return gsap.timeline()
        .to(socItem, socConfig);
}

export function fadeOutSoc(socItem) {

    const socConfig = { duration: 0.9, opacity: 0, x: -30, ease: 'expo'};

    return gsap.timeline()
        .to(socItem, socConfig);
}

export function fadeOutInSoc(socItem) {

    const socOutConfig = { duration: 0.9, opacity: 0, x: -30, ease: 'expo'};
    const socInConfig = { duration: 0.9, opacity: 1, x: 0, ease: 'expo'};

    return gsap.timeline()
        .to(socItem, socOutConfig)
        .to(socItem, socInConfig);
}
