import { gsap } from 'gsap/all';
gsap.ticker.lagSmoothing(1000, 16);

export function fadeInMainSection(title, btn, mouse) {

    const titleConfig = { duration: 2, scale: 2, opacity: 0, ease: 'expo.inOut'};
    const btnConfig = { duration: 0.5, y: 0, opacity: 1, ease: 'expo.in'};
    const mouseConfig = { duration: 0.5, y: 20, opacity: 0, ease: 'expo.inOut'};

    return gsap.timeline()
        .from(title, titleConfig)
        .to(btn, btnConfig, '-=1')
        .from(mouse, mouseConfig, '-=0.2');
}

export function fadeOutMainSection(title, btn, mouse) {

    const titleConfig = { duration: 0.1, scale: 1, opacity: 1, ease: 'expo.inOut'};
    const btnConfig = { duration: 0.1, y: 20, opacity: 0, ease: 'expo.inOut'};
    const mouseConfig = { duration: 0.1, y: 0, opacity: 1, ease: 'expo.inOut'};

    return gsap.timeline()
        .from(title, titleConfig)
        .to(btn, btnConfig)
        .from(mouse, mouseConfig);

}
