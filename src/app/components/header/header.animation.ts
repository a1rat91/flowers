import {gsap} from 'gsap/all';

gsap.timeline({
    defaults:
        {
            duration: 0.5,
            ease: 'expo',
            translateZ: 0
        }
});

const startHeaderFrom = {translateY: 20, opacity: 0};
const startHeaderTo = {translateY: 0, opacity: 1, delay: 2};

const fadeInHeaderFrom = {translateY: 20, opacity: 0};
const fadeInHeaderTo = {translateY: 0, opacity: 1};

const fadeOutHeaderFrom = {translateY: 0, opacity: 1};
const fadeOutHeaderTo = {translateY: 20, opacity: 0};

export function startHeader(logo, burger) {

    return gsap.timeline()
        .fromTo([logo, burger], startHeaderFrom, startHeaderTo);
}

export function fadeInHeader(logo, burger) {

    return gsap.timeline()
        .fromTo([logo, burger], fadeInHeaderFrom, fadeInHeaderTo);
}

export function fadeOutHeader(logo, burger) {

    return gsap.timeline()
        .fromTo([logo, burger], fadeOutHeaderFrom, fadeOutHeaderTo);
}

export function fadeOutInHeader(logo, burger) {

    return gsap.timeline()
        .fromTo([logo, burger], fadeOutHeaderFrom, fadeOutHeaderTo)
        .to([logo, burger], startHeaderTo);
}
