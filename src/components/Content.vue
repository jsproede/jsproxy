<template>
  <div class="wrapper">
    <div></div>
    <button @click="toggleProxy">Start proxy</button>
    <button @click="closeAllProxies">Close all proxies</button>

    <ul v-if="urls">
      <li v-for="(proxyUrl, index) in urls" :key="index">{{proxyUrl}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';
import Proxy from '@/proxy';
import ProxyPool from '@/proxy/pool';

@Component({
  computed: mapState(['urls']),
})
export default class Content extends Vue {
  private proxy!: Proxy;

  private toggleProxy(): void {
    this.proxy = ProxyPool.acquireProxy();
    this.proxy.start();
  }

  private closeAllProxies(): void {
    ProxyPool.closeAllProxies();
  }
}
</script>

<style lang="scss" scoped>
div.wrapper {
  border-left: 1px solid lightgray;
  box-shadow: -5px 0 25px -15px rgba(1, 1, 1, 0.8);
  padding: 10px;

  height: 100%;
}
</style>
