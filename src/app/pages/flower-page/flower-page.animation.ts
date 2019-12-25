import { gsap } from 'gsap/all';
gsap.ticker.lagSmoothing(1000, 16);

export function fadeInFlowerPage(title, text, btn, pagination, footer) {

    const titleConfig = { duration: 2, y: 0, opacity: 1, ease: 'expo'};
    const textConfig = { duration: 2, y: 0, opacity: 1, ease: 'expo'};
    const btnConfig = { duration: 1.5, y: 0, opacity: 1, ease: 'expo'};
    const paginationConfig = { duration: 1.5, y: 0, opacity: 1, ease: 'expo'};
    const footerConfig = { duration: 1.5, y: 0, opacity: 1, ease: 'expo'};

    return gsap.timeline()
        .to(title, titleConfig)
        .to(text, textConfig, '-=1.7')
        .to(btn, btnConfig, '-=1.3')
        .to(pagination, paginationConfig, '-=1.3')
        .to(footer, footerConfig, '-=0.8');
    // '-=0.5'
}
