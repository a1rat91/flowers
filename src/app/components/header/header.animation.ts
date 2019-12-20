import { EaselPlugin, gsap } from 'gsap/all';
gsap.registerPlugin(EaselPlugin);

const duration = 0.7;

export function fadeInHeader(logo, burger) {

    const logoConfig = { duration, top: 0, opacity: 1, delay: 1, ease: 'expo'};
    const burgerConfig = { duration, top: 0, opacity: 1, ease: 'expo'};

    return gsap.timeline()
        .to(logo, logoConfig)
        .to(burger, burgerConfig, `-=${duration}`);
}

export function fadeOutHeader(logo, burger) {

    const logoConfig = { duration, top: '30px', opacity: 0, ease: 'expo'};
    const burgerConfig = { duration, top: '30px', opacity: 0, ease: 'expo'};

    return gsap.timeline()
        .to(logo, logoConfig)
        .to(burger, burgerConfig, `-=${duration}`);
}
