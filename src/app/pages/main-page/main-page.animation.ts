import { gsap, Expo } from 'gsap';

export function fadeInMainSection(title, btn, mouse) {

    const titleConfig = { duration: 2, scale: 2, opacity: 0, delay: -1, ease: Expo.easeInOut};
    const btnConfig = { duration: 1, y: 20, opacity: 0, delay: -0.5, ease: Expo.easeInOut};
    const mouseConfig = { duration: 0.5, y: 20, opacity: 0, ease: Expo.easeInOut};

    return gsap.timeline()
        .from(title, 2, titleConfig)
        .from(btn, 1, btnConfig)
        .from(mouse, 0.5, mouseConfig, '-=0.7');
}

export function fadeOutMainSection(title, btn, mouse) {

    const titleConfig = { duration: 2, scale: 1, opacity: 1, delay: -1, ease: Expo.easeInOut};
    const btnConfig = { duration: 1, y: 0, opacity: 1, delay: -0.5, ease: Expo.easeInOut};
    const mouseConfig = { duration: 0.5, y: 0, opacity: 1, ease: Expo.easeInOut};

    return gsap.timeline()
        .from(title, titleConfig)
        .from(btn, btnConfig)
        .from(mouse, mouseConfig, '-=0.7');

}
