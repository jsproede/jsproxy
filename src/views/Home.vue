<template>
  <div class="grid">
    <div class="sidebar">
      <Sidebar/>
    </div>
    <div class="content">
      <Content/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Sidebar from '@/components/Sidebar.vue';
import Content from '@/components/Content.vue';

@Component({
  components: {
    Sidebar,
    Content,
  },
})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
div.grid {
  display: grid;

  grid-template-columns: 300px 1fr;
  grid-template-rows: 100vh;
}
</style>

