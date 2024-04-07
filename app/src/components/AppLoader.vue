<script setup>
import { ref, onMounted } from 'vue';
import { easeInOutQuint, easeOutQuint, easeInQuint } from '@/utils/useBeziers.js';

const appLoader = ref();
const loaderBar = ref();
const bar = ref();
const img = ref();
const msgs = ref();

const openingAnimation = () => {
    const loaderBarAnim = loaderBarAnimIn();
    imgAnimIn();

    loaderBarAnim.onfinish = () => {
        bar.value.animate([{ width: '45%' }], {
            duration: 601,
            easing: easeInQuint,
            fill: 'forwards'
        });

        const firstMsgAnimIn = textInAnim(msgs.value[0]);

        firstMsgAnimIn.onfinish = () => {
            textOutAnim(msgs.value[0]);

            const secondMsgAnimIn = textInAnim(msgs.value[1]);

            secondMsgAnimIn.onfinish = () => {
                bar.value.animate([{ width: '90%' }], {
                    duration: 700,
                    easing: 'ease-out',
                    fill: 'forwards'
                });

                textOutAnim(msgs.value[1]);

                const lastMsgAnimIn = textInAnim(msgs.value[2]);

                bar.value.animate([{ width: '100%' }], {
                    duration: 600,
                    fill: 'forwards',
                    easing: 'ease-in'
                });

                lastMsgAnimIn.onfinish = () => {
                    const lastMsgAnimOut = textOutAnim(msgs.value[2]);

                    lastMsgAnimOut.onfinish = () => {
                        const loaderBarAnim = loaderBarAnimOut();
                        imgAnimOut();

                        loaderBarAnim.onfinish = () => {
                            appLoader.value.animate(
                                [
                                    { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' },
                                    { clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' }
                                ],
                                {
                                    duration: 600,
                                    fill: 'forwards',
                                    easing: easeInOutQuint
                                }
                            );
                        };
                    };
                };
            };
        };
    };
};

function loaderBarAnimIn() {
    return loaderBar.value.animate(
        [
            { transform: 'scaleX(20%)', opacity: 0 },
            { transform: 'scaleX(50%)', opacity: 1 },
            { transform: 'scaleX(100%)', opacity: 1 }
        ],
        {
            duration: 1000,
            fill: 'forwards',
            easing: 'cubic-bezier(0.86, 0, 0.07, 1)'
        }
    );
}

function loaderBarAnimOut() {
    return loaderBar.value.animate(
        [
            { transform: 'scaleX(100%)', opacity: 1 },
            { transform: 'scaleX(20%)', opacity: 1 },
            { transform: 'scaleX(0%)', opacity: 0 }
        ],
        {
            duration: 1200,
            fill: 'forwards',
            easing: 'cubic-bezier(0.86, 0, 0.07, 1)'
        }
    );
}

function imgAnimIn() {
    return img.value.animate(
        [{ transform: 'translateY(100%)' }, { transform: 'translateY(15%)' }],
        {
            duration: 800,
            fill: 'forwards',
            easing: easeOutQuint,
            delay: 601
        }
    );
}

function imgAnimOut() {
    return img.value.animate(
        [{ transform: 'translateY(15%)' }, { transform: 'translateY(100%)', opacity: 0 }],
        {
            duration: 600,
            fill: 'forwards',
            easing: 'cubic-bezier(0.6, -0.28, 0.735, 0.045)'
        }
    );
}

function textInAnim(el) {
    const anim = el.animate([{ transform: 'translateY(-0%)' }], {
        duration: 400,
        easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
        fill: 'forwards'
    });
    return anim;
}

function textOutAnim(el) {
    const anim = el.animate([{ transform: 'translateY(-100%)' }], {
        duration: 400,
        fill: 'forwards',
        easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)'
    });
    return anim;
}

onMounted(() => {
    openingAnimation();
});
</script>
<template>
    <div
        class="app__loader bg-rose-900"
        ref="appLoader"
    >
        <div class="loader">
            <div class="image">
                <img
                    ref="img"
                    src="@/assets/imgs/logo_alt_4.png"
                    alt=""
                />
            </div>
            <div
                ref="loaderBar"
                class="loader__bar border border-rose-200 bg-rose-950"
            >
                <div
                    ref="bar"
                    class="bar bg-rose-50"
                ></div>
            </div>
            <div class="loader__messages text-rose-100 opacity-85 overflow-hidden">
                <span
                    v-for="(msg, i) in ['Connecting', 'Calculating', 'Collecting']"
                    :key="i"
                    ref="msgs"
                >
                    {{ msg }}
                </span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.app__loader {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.loader {
    position: relative;
    width: 180px;
}
.image {
    width: 140px;
    margin: auto;
    overflow: hidden;
}
img {
    transform: translateY(100%);
}
.loader__bar {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 8px;
    border-radius: 4px;
    overflow: hidden;
}
.bar {
    height: 100%;
    width: 0%;
}
.loader__messages {
    position: absolute;
    display: flex;
    justify-content: center;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 135%);
}
.loader__messages span {
    position: absolute;
    display: block;
    transform: translateY(100%);
}
.loader__messages span:first-child {
    position: relative;
}
</style>
