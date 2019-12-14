import { EaselPlugin, gsap } from 'gsap/all';
gsap.registerPlugin(EaselPlugin);

export function fadeInHeader(logo, burger) {

    const logoConfig = { duration: 2, top: 0, opacity: 1, delay: 2.7, ease: 'expo'};
    const burgerConfig = { duration: 2, top: 0, opacity: 1, delay: 2.7, ease: 'expo'};

    return gsap.timeline()
        .to(logo, logoConfig, '-=1.5')
        .to(burger, burgerConfig, '-=4.5');
}

export function fadeOutHeader(logo, burger) {

    const logoConfig = { duration: 2, top: '30px', opacity: 0, ease: 'expo'};
    const burgerConfig = { duration: 2, top: '30px', opacity: 0, ease: 'expo'};

    return gsap.timeline()
        .to(logo, logoConfig)
        .to(burger, burgerConfig, '-=3');
}
