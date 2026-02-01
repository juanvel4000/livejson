<script setup lang="ts">
import { ref, watch } from "vue";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-json";
const src = ref("");
const dst = ref("");
const error = ref("");

async function waitError() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  error.value = false;
}

watch(src, async (val) => {
  try {
    const formatted = JSON.stringify(JSON.parse(val), null, 4);
    dst.value = Prism.highlight(formatted, Prism.languages.json, "json");
  } catch (err: any) {
    error.value = err.message || "unknown error";
    await waitError();
  }
});
</script>

<template>
  <div
    class="min-h-screen bg-neutral-300 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-300 p-1"
  >
    <div
      class="border rounded-md border-neutral-200 dark:border-neutral-800 p-2 flex items-center justify-between"
    >
      <h1 class="font-bold">
        <span class="font-bold animate-pulse">LiveJSON</span>
        <span class="font-semibold"
          >:
          <i>Minimalistic JSON Formatter / Validator</i>
        </span>
      </h1>

      <span class="text-red-700 dark:text-red-300" v-if="error">{{
        error
      }}</span>
    </div>
    <div class="flex flex-1 gap-2 p-2 min-h-96">
      <textarea
        v-model="src"
        class="p-2 border border-neutral-200 dark:border-neutral-800 rounded-md flex-1 resize-none"
      ></textarea>
      <pre
        class="p-2 border rounded-md border-neutral-200 dark:border-neutral-800 flex-1 overflow-auto prose dark:prose-invert"
        v-html="dst"
      ></pre>
    </div>
  </div>
</template>

<style scoped></style>
