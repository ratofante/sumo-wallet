<script setup>
import { easeOutQuint } from '@/utils/useBeziers.js';

const onEnterAnim = (el) => {
    return el.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 800,
        easing: easeOutQuint,
        fill: 'forwards'
    });
};

const onLeaveAnim = (el) => {
    return el.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 800,
        easing: easeOutQuint
    });
};

function onEnter(el, done) {
    el.classList.add('absolute');
    const anim = onEnterAnim(el);
    anim.onfinish = () => {
        done();
        el.classList.remove('absolute');
    };
}

function onLeave(el, done) {
    const anim = onLeaveAnim(el);
    anim.onfinish = () => {
        done();
    };
}
</script>
<template>
    <Transition
        @enter="onEnter"
        @leave="onLeave"
        :css="false"
    >
        <slot />
    </Transition>
</template>
