import { TweenMax, Power0, Power1, Power2, Power4, Circ, Expo, Bounce, Back, TimelineMax, TweenConfig } from 'gsap';

export function fadeInFlowerPage(title, text, btn, pagination, footer) {

    const titleConfig: TweenConfig = { top: 0, delay: 0.5, opacity: 1, ease: Expo.easeOut};
    const textConfig: TweenConfig = { top: 0, opacity: 1, ease: Expo.easeOut};
    const btnConfig: TweenConfig = { top: 0, opacity: 1, ease: Expo.easeOut};
    const paginationConfig: TweenConfig = { top: 0, opacity: 1, ease: Expo.easeOut};
    const footerConfig: TweenConfig = { top: 0, opacity: 1, ease: Expo.easeOut};

    return new TimelineMax()
        .to(title, 2, titleConfig)
        .to(text, 2, textConfig, '-=1.7')
        .to(btn, 1.5, btnConfig, '-=1.3')
        .to(pagination, 1.5, paginationConfig, '-=1.3')
        .to(footer, 1.5, footerConfig, '-=0.8');
    // '-=0.5'
}
