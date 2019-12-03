import { TweenMax, Power0, Power1, Power2, Power4, Circ, Expo, Bounce, Back, TimelineMax, TweenConfig } from 'gsap';

export function fadeInFlowerPage(slider, title, text, btn, pagination, footer) {

    const sliderConfig: TweenConfig = { x: '100%', delay: 1, ease: Expo.easeOut};
    const titleConfig: TweenConfig = { top: 0, opacity: 1, ease: Expo.easeOut};
    const textConfig: TweenConfig = { top: 0, opacity: 1, ease: Expo.easeOut};
    const btnConfig: TweenConfig = { top: 0, opacity: 1, ease: Expo.easeOut};
    const paginationConfig: TweenConfig = { top: 0, opacity: 1, ease: Expo.easeOut};
    const footerConfig: TweenConfig = { top: 0, opacity: 1, ease: Expo.easeOut};

    return new TimelineMax()
        .to(slider, 1, sliderConfig)
        .to(title, 1, titleConfig, '-=0.3')
        .to(text, 1, textConfig, '-=0.8')
        .to(btn, 1, btnConfig, '-=0.8')
        .to(pagination, 1, paginationConfig, '-=0.8')
        .to(footer, 1, footerConfig, '-=0.8');
    // '-=0.5'
}
