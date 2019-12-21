import { EaselPlugin, gsap } from 'gsap/all';
gsap.registerPlugin(EaselPlugin);

export function catalogNextPageTransition(title, curtain) {

    const catalogCurtainConfig = { duration: 2, scaleX: 2, delay: 1, ease: 'expo.inOut'};

    return gsap.timeline()
        .to(curtain, catalogCurtainConfig);
}

export function fadeInCatalogSection() {

}

export function fadeOutCatalogSection() {

}

export function sliderProgrees(progressEl, progress) {

    const progressConfig = { duration: 0.5, width: `${progress}%`, ease: 'expo.inOut'};

    return gsap.timeline()
        .to(progressEl, progressConfig);
}
