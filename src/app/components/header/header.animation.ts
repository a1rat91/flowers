import { Expo, TimelineMax, TweenConfig } from 'gsap';

export function fadeInHeader(logo, burger) {

    const logoConfig: TweenConfig = { top: 0, opacity: 1, delay: 2.7, ease: Expo.easeOut};
    const burgerConfig: TweenConfig = { top: 0, opacity: 1, delay: 2.7, ease: Expo.easeOut};

    return new TimelineMax()
        .to(logo, 2, logoConfig, '-=1.5')
        .to(burger, 2, burgerConfig, '-=4.5');
}

export function fadeOutHeader(logo, burger) {

    const logoConfig: TweenConfig = { top: '30px', opacity: 0, ease: Expo.easeOut};
    const burgerConfig: TweenConfig = { top: '30px', opacity: 0, ease: Expo.easeOut};

    return new TimelineMax()
        .to(logo, 2, logoConfig)
        .to(burger, 2, burgerConfig, '-=3');
}
