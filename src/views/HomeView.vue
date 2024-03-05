<script setup>
import LinkPrimary from '@/components/LinkPrimary.vue';
import LinkSimple from '@/components/LinkSimple.vue';
</script>

<template>
  <section class="relative mt-16 pt-12 pb-8">
    <div class="relative flex flex-col justify-center z-10">
      <h1 class="font-serif text-big-title text-center text-slate-950">Sumo's Wallet</h1>
      <p class="font-serif text-md text-center text-slate-800 pt-2 leading-none">
        Your everyday
        <br />
        expense tracker
      </p>
      <LinkPrimary
        path="/register"
        class="w-fit mx-auto my-8"
      >
        Join
      </LinkPrimary>
      <div class="mx-auto">
        <LinkSimple
          path="/login"
          class="text-rose-500 font-medium text-xs"
        >
          Already have an account?
        </LinkSimple>
      </div>
    </div>
    <div
      class="absolute top-0 center-absolute-horizontal h-full w-[60%] bg-rose-50 border-4 border-rose-950 border-opacity-5 rounded-md z-0"
    ></div>
  </section>
</template>
