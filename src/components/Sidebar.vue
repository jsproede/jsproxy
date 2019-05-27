<template>
  <div>Sidebar</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'Sidebar',
})
export default class Sidebar extends Vue {}
</script>

<style lang="scss" scoped>
div {
  width: 300px;
  padding: 10px;

  height: 100%;
}
</style>
