<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue';
import Protobuf from '@/components/Protobuf.vue';
</script>

<template>
    <Suspense>
      <HelloWorld />
    </Suspense>
  <Protobuf/>
</template>
