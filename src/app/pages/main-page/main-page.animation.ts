import { gsap } from 'gsap/all';

const titleConfigFrom = {scale: 2, opacity: 0};
const titleConfigTo = {duration: 2, delay: 1, scale: 1, opacity: 1};
const btnAndMouseConfigFrom = { y: 20, opacity: 0};
const btnAndMouseConfigTo = { duration: 0.3, y: 0, opacity: 1, stagger: 0.5, ease: 'ease'};

export function startMainSection(title, btn, mouse) {

    return gsap.timeline({defaults: {
            ease: 'expo.inOut'
        }})
        .fromTo(title, titleConfigFrom, titleConfigTo)
        .fromTo([btn, mouse], btnAndMouseConfigFrom, btnAndMouseConfigTo);
}

export function fadeInMainSection(curtain, title, btn, mouse) {

    const mainSectionCurtainConfig = { duration: 1.5, x: '-100%'};

    return gsap.timeline({defaults: {
            ease: 'expo.inOut'
        }})
        .to(curtain, mainSectionCurtainConfig)
        .fromTo(title,  titleConfigFrom, titleConfigTo)
        .fromTo([btn, mouse], btnAndMouseConfigFrom, btnAndMouseConfigTo);
}

export function fadeOutMainSection(curtain) {

    const mainSectionCurtainConfig = { duration: 1.5, x: 0};

    return gsap.timeline({defaults: {
            ease: 'expo.inOut'
        }})
        .to(curtain, mainSectionCurtainConfig);

}

export function mobFadeInCatalogSection(section) {
    return gsap
        .fromTo(section, {translateY: 20, opacity: 0}, {duration: 2, translateY: 0, opacity: 1, ease: 'expo.inOut'});

}

export function mobFadeInActionsSection(section) {
    return gsap
        .fromTo(section, {translateY: 20, opacity: 0}, {duration: 2, translateY: 0, opacity: 1, ease: 'expo.inOut'});

}
