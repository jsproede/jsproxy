<template>
  <span class="http-method">{{method}}</span>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({ name: 'request-method' })
export default class RequestMethod extends Vue {
  @Prop() method!: string;
}
</script>

<style lang="scss" scoped>
.http-method {
  padding: 2px 4px;
  font-size: 10px;
  background-color: #476c9b;
  color: #fff;
  border-radius: 2px;

  margin-right: 8px;
}
</style>
