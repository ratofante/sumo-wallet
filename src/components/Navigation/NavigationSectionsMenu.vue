<script setup>
import LinkSimple from '@/components/Link/LinkSimple.vue';
</script>
<template>
    <div class="navigation__menu fixed z-30 top-0 left-0 min-h-screen w-full bg-rose-950">
        <div class="container md:container py-14">
            <div class="rounded bg-rose-100 p-6">
                <h5 class="font-serif text-2xl text-slate-950">Sections</h5>
                <ul class="pt-2 text-xl">
                    <li>
                        <LinkSimple
                            path="/"
                            class="block py-1 font-sans font-semibold text-slate-800"
                        >
                            Home
                        </LinkSimple>
                    </li>
                    <li>
                        <LinkSimple
                            path="/"
                            class="block py-1 font-sans font-semibold text-slate-800"
                        >
                            About
                        </LinkSimple>
                    </li>
                    <li>
                        <LinkSimple
                            path="/"
                            class="block py-1 font-sans font-semibold text-slate-800"
                        >
                            FAQ
                        </LinkSimple>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>
.navigation__menu {
    animation: fadeIn 300ms ease;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
</style>
