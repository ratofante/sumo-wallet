<script setup>
import LinkPrimary from '../Link/LinkPrimary.vue';

import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/16/solid';

defineProps({
  expense: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <article>
    <header class="flex justify-between">
      <div>
        {{ expense.expense_name }}
      </div>
      <menu class="flex">
        <li>
          <LinkPrimary
            path="/"
            size="small"
            class="w-8 h-8"
          >
            <template v-slot:icon>
              <TrashIcon class="w-4 h-4 text-slate-50" />
            </template>
          </LinkPrimary>
        </li>
        <li>
          <LinkPrimary
            path="/"
            size="small"
            class="w-8 h-8"
          >
            <template v-slot:icon>
              <PencilSquareIcon class="w-4 h-4 text-slate-50" />
            </template>
          </LinkPrimary>
        </li>
      </menu>
    </header>
  </article>
</template>
