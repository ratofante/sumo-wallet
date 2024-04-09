<script setup>
import { ref } from 'vue';
import { easeOutQuint } from '@/utils/useBeziers.js';
import useDispatchEvent from '@/composables/useDispatchEvent';

const firstEnter = ref(true);
const courtain = ref();
const courtainTransitionEase = easeOutQuint;
const courtainAnimDuration = 600;
const pageTransitionDuration = 1200;
const courtainAnimOpts = {
    duration: courtainAnimDuration,
    easing: easeOutQuint,
    fill: 'forwards'
};

const onEnterAnim = (el) => {
    return el.animate([{ transform: 'translateX(100%)' }, { transform: 'translateX(0%)' }], {
        duration: pageTransitionDuration,
        easing: easeOutQuint,
        fill: 'forwards'
    });
};

const onLeaveAnim = (el) => {
    return el.animate([{ opacity: 1 }, { opacity: 0.5 }, { opacity: 0 }], {
        duration: pageTransitionDuration - 200,
        easing: easeOutQuint
    });
};

function courtainAnimation() {
    const onLeave = courtain.value.animate(
        [
            { clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)' },
            { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }
        ],
        courtainAnimOpts
    );
    onLeave.onfinish = () => {
        courtain.value.animate(
            [
                { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' },
                { clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' }
            ],
            courtainAnimOpts
        );
    };
}

function onEnter(el, done) {
    if (!firstEnter.value) {
        el.classList.add('absolute', 'translate-x-full');
        const anim = onEnterAnim(el);
        anim.onfinish = () => {
            done();
            el.classList.remove('absolute', 'translate-x-full');
            useDispatchEvent('page-transition-finished');
        };
    } else {
        firstEnter.value = false;
        done();
    }
}

function onLeave(el, done) {
    courtainAnimation();
    const anim = onLeaveAnim(el);
    anim.onfinish = () => {
        done();
    };
}
</script>
<template>
    <div
        ref="courtain"
        class="courtain initial fixed grid place-items-center bg-rose-950 z-40"
        :style="`transition: clip-path ${courtainAnimDuration} ${courtainTransitionEase}`"
    >
        <img
            src="@/assets/imgs/logo_alt_4.png"
            width="100"
            height="100"
            alt="Sumo's wallet logo"
            class=""
        />
    </div>
    <Transition
        @enter="onEnter"
        @leave="onLeave"
        :css="false"
    >
        <slot />
    </Transition>
</template>

<style>
.courtain {
    top: -1px;
    left: -1px;
    bottom: -1px;
    right: -1px;
    clip-path: polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%);
}
</style>
