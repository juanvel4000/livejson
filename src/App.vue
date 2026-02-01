<script setup lang="ts">
import { ref, watch } from "vue";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-json";
import { getDocument, setDocument } from "./utils/persistance";

const indent_level = ref(2);
function format(val: string) {
  const formatted = JSON.stringify(JSON.parse(val), null, indent_level.value);
  return Prism.highlight(formatted, Prism.languages.json, "json");
}

const src = ref(getDocument());
const error = ref("");
const dst = ref("");

try {
  dst.value = format(getDocument());
} catch (err) {
  error.value = err.message || "unknown error";
}

watch(src, (val) => {
  setDocument(val);
  error.value = "";
  try {
    dst.value = format(val);
  } catch (err: any) {
    error.value = err.message || "unknown error";
  }
});

watch(indent_level, (val) => {
  setDocument(src.value);
  error.value = "";
  try {
    dst.value = format(src.value);
  } catch (err: any) {
    error.value = err.message || "unknown error";
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
      <div>
        <span class="text-red-700 dark:text-red-300 me-1" v-if="error">{{
          error
        }}</span>
        <select
          v-model.number="indent_level"
          class="border rounded-md border-neutral-200 dark:border-neutral-800 p-1"
          title="Indent Level"
        >
          <option :value="2">2</option>
          <option :value="4">4</option>
          <option :value="8">8</option>
        </select>
      </div>
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
