import { gsap, Expo} from 'gsap';

export function sliderProgrees(progressEl, progress) {

    const progressConfig = { duration: 0.5, width: `${progress}%`, ease: Expo.easeInOut};

    return gsap.timeline()
        .to(progressEl, progressConfig);
}
