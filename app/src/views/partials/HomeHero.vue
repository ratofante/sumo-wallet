<script setup>
import LinkSimple from '@/components/Link/LinkSimple.vue';
import LinkPrimary from '@/components/Link/LinkPrimary.vue';
</script>

<template>
    <section class="relative mt-16 pt-12 pb-4">
        <div class="relative flex flex-col justify-center z-10">
            <!-- Title-->
            <div class="mt-4">
                <h1
                    class="font-serif text-big-title text-center text-slate-950 dark:text-slate-50 transition-colors"
                >
                    Sumo's Wallet
                </h1>
                <p
                    class="font-sans font-medium text-sm text-center text-slate-700 pt-2 leading-none dark:text-slate-200 transition-colors"
                >
                    Your everyday
                    <br />
                    expense tracker
                </p>
            </div>
            <!-- login-->
            <LinkPrimary
                path="/register"
                class="mx-auto my-8"
                size="large"
            >
                Join
            </LinkPrimary>
            <!-- signUp -->
            <div class="mx-auto">
                <LinkSimple
                    path="/login"
                    class="text-slate-800 font-medium text-xs dark:text-rose-300 dark:opacity-70 transition-colors"
                >
                    Already have an account?
                </LinkSimple>
            </div>
        </div>
        <!-- background -->
        <div
            class="absolute top-0 center-absolute-horizontal h-full w-[60%] bg-slate-50 border-4 border-rose-950 border-opacity-5 rounded-md z-0 overflow-hidden dark:bg-slate-800 dark:border-rose-300 dark:border-opacity-15 transition-colors"
        >
            <img
                src="/img/logo_alt_2.png"
                width="100"
                height="100"
                alt="Sumo's wallet logo"
                class="absolute top-0 left-1/2 -translate-x-[50%] -translate-y-[50%] rotate-180"
            />
        </div>
    </section>
</template>
