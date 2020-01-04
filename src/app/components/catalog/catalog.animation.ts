import { gsap } from 'gsap/all';

export function catalogNextPageTransition(title, curtain) {

    const catalogCurtainConfig = { duration: 2, scaleX: 2, delay: 1, ease: 'expo.inOut'};

    return gsap.timeline()
        .to(curtain, catalogCurtainConfig);
}

export function fadeInCatalogSection(catalog) {
    return gsap.timeline().fromTo(catalog, {opacity: 0, ease: 'expo.inOut'}, {duration: 1, opacity: 1, ease: 'expo.inOut'});

}

export function fadeOutCatalogSection(catalog) {
    return gsap.timeline().fromTo(catalog, {opacity: 1, ease: 'expo.inOut'}, {duration: 1, opacity: 0, ease: 'expo.inOut'});
}

export function sliderProgrees(progressEl, progress) {

    const progressConfig = { duration: 0.5, width: `${progress}%`, ease: 'expo.inOut'};

    return gsap.timeline()
        .to(progressEl, progressConfig);
}
