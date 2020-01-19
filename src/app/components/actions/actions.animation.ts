import {gsap} from 'gsap/all';

gsap.timeline({
    defaults:
        {
            ease: 'expo.inOut',
            translateZ: 0
        }
});
export function fadeInActions(curtain, pic, title, desc, btn, footer) {

    return gsap.timeline()
        .set(curtain, {opacity: 0})
        .fromTo(curtain, {opacity: 1, translateX: '-100%'}, {duration: 1, opacity: 1, translateX: 0, ease: 'expo.in'})
        .set(pic, {opacity: 1})
        .fromTo(curtain, {translateX: 0}, {duration: 1, translateX: '100%', ease: 'expo.out'})
        .set(curtain, {opacity: 0})
        .fromTo([title, desc, footer],
            {translateY: 20, opacity: 0},
            {translateY: 0, opacity: 1, stagger: .2}, '-=1.5')
        .fromTo(btn,
            {translateY: 15, opacity: 0},
            {duration: 0.3, translateY: 0, opacity: 1, ease: 'expo.in'}, '-=1.5');
}

export function fadeOutActions(curtain, pic, title, desc, btn, footer) {

    return gsap.timeline()
        .set(curtain, {opacity: 0})
        .fromTo(curtain, {opacity: 1, translateX: '100%'}, {duration: 1, opacity: 1, translateX: 0, ease: 'expo.in'})
        .set(pic, {opacity: 0})
        .fromTo(curtain, {translateX: 0}, {duration: 1, translateX: '-100%', ease: 'expo.out'})
        .set(curtain, {opacity: 0})
        .fromTo(btn,
            {translateY: 0, opacity: 1},
            {duration: 0.3, translateY: 15, opacity: 0, ease: 'expo'}, '-=1.5')
        .fromTo([footer, desc, title],
            {translateY: 0, opacity: 1},
            {translateY: 20, opacity: 0, stagger: .2}, '-=1.5');
}
