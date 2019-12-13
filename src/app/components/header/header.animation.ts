import { gsap, Expo } from 'gsap';

export function fadeInHeader(logo, burger) {

    const logoConfig = { duration: 2, top: 0, opacity: 1, delay: 2.7, ease: Expo.easeOut};
    const burgerConfig = { duration: 2, top: 0, opacity: 1, delay: 2.7, ease: Expo.easeOut};

    return gsap.timeline()
        .to(logo, logoConfig, '-=1.5')
        .to(burger, burgerConfig, '-=4.5');
}

export function fadeOutHeader(logo, burger) {

    const logoConfig = { duration: 2, top: '30px', opacity: 0, ease: Expo.easeOut};
    const burgerConfig = { duration: 2, top: '30px', opacity: 0, ease: Expo.easeOut};

    return gsap.timeline()
        .to(logo, logoConfig)
        .to(burger, burgerConfig, '-=3');
}
