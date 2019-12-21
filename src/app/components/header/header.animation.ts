import { EaselPlugin, gsap } from 'gsap/all';
gsap.registerPlugin(EaselPlugin);

const duration = 0.7;

export function startHeader(logo, burger) {

    const logoConfig = { duration: 0.5, y: 0, opacity: 1, delay: 2.5, ease: 'expo'};
    const burgerConfig = { duration: 0.5, y: 0, opacity: 1, ease: 'expo'};

    return gsap.timeline()
        .to(logo, logoConfig)
        .to(burger, burgerConfig, '-=0.5');
}

export function fadeInHeader(logo, burger) {

    const logoConfig = { duration: 0.5, y: 0, opacity: 1, ease: 'expo'};
    const burgerConfig = { duration: 0.5, y: 0, opacity: 1, ease: 'expo'};

    return gsap.timeline()
        .to(logo, logoConfig)
        .to(burger, burgerConfig, '-=0.5');
}

export function fadeOutHeader(logo, burger) {

    const logoConfig = { duration: 0.5, y: 30, opacity: 0, ease: 'expo'};
    const burgerConfig = { duration: 0.5, y: 30, opacity: 0, ease: 'expo'};

    return gsap.timeline()
        .to(logo, logoConfig)
        .to(burger, burgerConfig, '-=0.5');
}

export function fadeOutInHeader(logo, burger) {

    const logoOutConfig = { duration: 0.5, y: 30, opacity: 0, ease: 'expo'};
    const burgerOutConfig = { duration: 0.5, y: 30, opacity: 0, ease: 'expo'};
    const logoInConfig = { duration: 0.5, y: 0, opacity: 1, delay: 2, ease: 'expo'};
    const burgerInConfig = { duration: 0.5, y: 0, opacity: 1, ease: 'expo'};

    return gsap.timeline({yoyo: true})
        .to(logo, logoOutConfig)
        .to(burger, burgerOutConfig, '-=0.5')
        .to(logo, logoInConfig)
        .to(burger, burgerInConfig, '-=0.5');
}
