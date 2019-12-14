import { EaselPlugin, gsap } from 'gsap/all';
gsap.registerPlugin(EaselPlugin);

export function sliderProgrees(progressEl, progress) {

    const progressConfig = { duration: 0.5, width: `${progress}%`, ease: 'expo.inOut'};

    return gsap.timeline()
        .to(progressEl, progressConfig);
}
