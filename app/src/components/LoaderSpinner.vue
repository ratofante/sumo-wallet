<script setup>
import { easeOutQuint } from '@/utils/useBeziers';

defineProps({
    showSpinner: {
        type: Boolean,
        default: false
    }
});

function onEnter(el, done) {
    const anim = el.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 400,
        fill: 'forwards',
        easing: easeOutQuint
    });
    anim.onfinish = () => {
        done();
    };
}

function onLeave(el, done) {
    const anim = el.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 400,
        fill: 'forwards',
        easing: easeOutQuint
    });
    anim.onfinish = () => {
        done();
    };
}
</script>

<template>
    <Transition
        @enter="onEnter"
        @leave="onLeave"
    >
        <div
            v-if="showSpinner"
            class="fixed z-30 top-0 left-0 right-0 bottom-0"
        >
            <div class="w-full h-full grid place-items-center bg-rose-900 bg-opacity-30">
                <span class="loader"></span>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.loader {
    --loader-size: 10px;
    animation: rotate 1s infinite;
    height: calc(var(--loader-size) * 5);
    width: calc(var(--loader-size) * 5);
}

.loader:before,
.loader:after {
    border-radius: 50%;
    content: '';
    display: block;
    height: calc(var(--loader-size) * 2);
    width: calc(var(--loader-size) * 2);
}
.loader:before {
    animation: ball1 1s infinite;
    background-color: #fff1f2;
    box-shadow: 30px 0 0 #fb7185;
    margin-bottom: 10px;
}
.loader:after {
    animation: ball2 1s infinite;
    background-color: #fb7185;
    box-shadow: 30px 0 0 #fff1f2;
}

@keyframes rotate {
    0% {
        transform: rotate(0deg) scale(0.68);
    }
    50% {
        transform: rotate(360deg) scale(1);
    }
    100% {
        transform: rotate(720deg) scale(0.68);
    }
}

@keyframes ball1 {
    0% {
        box-shadow: 30px 0 0 #fb7185;
    }
    50% {
        box-shadow: 0 0 0 #fb7185;
        margin-bottom: 0;
        transform: translate(15px, 15px);
    }
    100% {
        box-shadow: 30px 0 0 #fb7185;
        margin-bottom: 10px;
    }
}

@keyframes ball2 {
    0% {
        box-shadow: 30px 0 0 #fff1f2;
    }
    50% {
        box-shadow: 0 0 0 #fff1f2;
        margin-top: -20px;
        transform: translate(15px, 15px);
    }
    100% {
        box-shadow: 30px 0 0 #fff1f2;
        margin-top: 0;
    }
}
</style>
