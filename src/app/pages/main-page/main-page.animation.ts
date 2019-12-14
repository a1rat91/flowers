import { EaselPlugin, gsap } from 'gsap/all';
gsap.registerPlugin(EaselPlugin);

export function fadeInMainSection(title, btn, mouse) {

    const titleConfig = { duration: 2, scale: 2, opacity: 0, ease: 'expo.inOut'};
    const btnConfig = { duration: 1, y: 20, opacity: 0, delay: -0.5, ease: 'expo.inOut'};
    const mouseConfig = { duration: 0.5, y: 20, opacity: 0, ease: 'expo.inOut'};

    return gsap.timeline()
        .from(title, 2, titleConfig)
        .from(btn, 1, btnConfig)
        .from(mouse, 0.5, mouseConfig, '-=0.7');
}

export function fadeOutMainSection(title, btn, mouse) {

    const titleConfig = { duration: 0.5, scale: 1, opacity: 1, ease: 'expo.inOut'};
    const btnConfig = { duration: 0.25, y: 0, opacity: 1, ease: 'expo.inOut'};
    const mouseConfig = { duration: 0.15, y: 0, opacity: 1, ease: 'expo.inOut'};

    return gsap.timeline()
        .from(title, titleConfig)
        .from(btn, btnConfig, '-=0.5')
        .from(mouse, mouseConfig, '-=0.25');

}
