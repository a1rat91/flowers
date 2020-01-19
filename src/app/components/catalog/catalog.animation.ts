import { gsap } from 'gsap/all';

export function catalogNextPageTransition(title, pic, curtain) {

    const catalogCurtainConfig = { duration: 2, scaleX: 2, delay: 1, ease: 'expo.inOut'};

    return gsap.timeline()
        .to(curtain, catalogCurtainConfig);
}

export function fadeInCatalogSection(title, pic, curtain, index, itemTitle, btns, shadow, pagination, link) {
    return gsap.timeline()
        .set(curtain,
            {opacity: 1})
        .fromTo(curtain,
            {translateX: '-100%'},
            {duration: 1, translateX: 0, ease: 'expo.in'})
        .set([pic, index, itemTitle],
            {opacity: 1})
        .set(link, {display: 'block'})
        .fromTo(curtain,
            {translateX: 0},
            {duration: 1, translateX: '100%', ease: 'expo.out'})
        .fromTo([title, shadow],
            {translateY: 20, opacity: 0},
            {duration: 1, translateY: 0, opacity: 1, stagger: .3, ease: 'expo.inOut'}, '-=1.5')
        .fromTo(btns,
            {opacity: 0},
            {duration: .3, opacity: 1, ease: 'expo.inOut'})
        .fromTo(pagination,
            {translateY: 20, opacity: 0},
            {duration: 1, translateY: 0, opacity: 1, stagger: .3, ease: 'expo.inOut'}, '-=1.7')
        .set(curtain,
            {opacity: 0});
}

export function fadeOutCatalogSection(title, pic, curtain, index, itemTitle, btns, shadow, pagination, link) {
    return gsap.timeline()
        .set(curtain, {opacity: 0})
        .fromTo(btns,
            {opacity: 1},
            {duration: .3, opacity: 0, ease: 'expo.inOut'})
        .fromTo(curtain,
            {translateX: '100%', opacity: 1},
            {duration: 1, translateX: 0, opacity: 1, ease: 'expo.inOut'})
        .set([pic, index, itemTitle],
            {opacity: 0})
        .set(link, {display: 'none'})
        .fromTo(curtain,
            {translateX: 0},
            {duration: 1, translateX: '-100%', ease: 'expo.inOut'})
        .fromTo([title, shadow],
            {translateY: 0, opacity: 1},
            {duration: 1, translateY: 20, opacity: 0, stagger: .3, ease: 'expo.inOut'}, '-=1.5')
        .fromTo(pagination,
            {translateY: 0, opacity: 1},
            {duration: 1, translateY: 20, opacity: 0, stagger: .3, ease: 'expo.inOut'}, '-=1.7')
        .set(curtain,
            {opacity: 0});
}

export function sliderProgrees(progressEl, progress) {

    const progressConfig = { duration: 0.5, width: `${progress}%`, ease: 'expo.inOut'};

    return gsap.timeline()
        .to(progressEl, progressConfig);
}
