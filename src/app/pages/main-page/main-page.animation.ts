import { TweenMax, Power0, Power1, Power2, Power4, Circ, Expo, Bounce, Back, TimelineMax, TweenConfig } from 'gsap';

export function fadeInMainSection(title, btn, mouse) {

    const titleConfig: TweenConfig = { scale: 2, opacity: 0, delay: -1, ease: Expo.easeInOut};
    const btnConfig: TweenConfig = { y: 20, opacity: 0, delay: -0.5, ease: Expo.easeInOut};
    const mouseConfig: TweenConfig = { y: 20, opacity: 0, ease: Expo.easeInOut};

    return new TimelineMax()
        .from(title, 2, titleConfig)
        .from(btn, 1, btnConfig)
        .from(mouse, 1, mouseConfig);
}

export function fadeOutMainSection(title, btn, mouse) {

    const titleConfig: TweenConfig = { scale: 1, opacity: 1, delay: -1, ease: Expo.easeInOut};
    const btnConfig: TweenConfig = { y: 0, opacity: 1, delay: -0.5, ease: Expo.easeInOut};
    const mouseConfig: TweenConfig = { y: 0, opacity: 1, ease: Expo.easeInOut};

    return new TimelineMax()
        .from(title, 2, titleConfig)
        .from(btn, 1, btnConfig)
        .from(mouse, 1, mouseConfig);

}
