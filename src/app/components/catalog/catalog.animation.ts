import { TweenMax, Power0, Power1, Power2, Power4, Circ, Expo, Bounce, Back, TimelineMax, TweenConfig } from 'gsap';

export function catalogNextPageTransition(title, el) {

    // const catalogWrapConfig: TweenConfig = { scale: 2, x: -x, ease: Expo.easeInOut};
    const catalogTitleConfig: TweenConfig = { y: -20, opacity: 1, ease: Expo.easeInOut};

    return new TimelineMax()
        // .to(wrap, 4, catalogWrapConfig)
        .to(el, 4, catalogTitleConfig);
}
