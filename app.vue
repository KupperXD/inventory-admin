<template>
  <div>
    <NuxtWelcome />
  </div>
</template>
<script lang="ts" setup>
const config = useRuntimeConfig();

console.log('config', {
    config,
});
</script>
