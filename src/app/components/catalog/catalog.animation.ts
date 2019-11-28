import { TweenMax, Power0, Power1, Power2, Power4, Circ, Expo, Bounce, Back, TimelineMax, TweenConfig } from 'gsap';

export function catalogNextPageTransition(title, curtain) {

    const catalogCurtainConfig: TweenConfig = { width: '100%', delay: 1, ease: Expo.easeInOut};

    return new TimelineMax()
        .to(curtain, 2, catalogCurtainConfig);
}
