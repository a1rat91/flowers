import {gsap, Expo} from 'gsap';

export function fadeInFlowerPage(title, text, btn, pagination, footer) {

    const titleConfig = { duration: 2, top: 0, opacity: 1, ease: Expo.easeOut};
    const textConfig = { duration: 2, top: 0, opacity: 1, ease: Expo.easeOut};
    const btnConfig = { duration: 1.5, top: 0, opacity: 1, ease: Expo.easeOut};
    const paginationConfig = { duration: 1.5, top: 0, opacity: 1, ease: Expo.easeOut};
    const footerConfig = { duration: 1.5, top: 0, opacity: 1, ease: Expo.easeOut};

    return gsap.timeline()
        .to(title, titleConfig)
        .to(text, textConfig, '-=1.7')
        .to(btn, btnConfig, '-=1.3')
        .to(pagination, paginationConfig, '-=1.3')
        .to(footer, footerConfig, '-=0.8');
    // '-=0.5'
}
