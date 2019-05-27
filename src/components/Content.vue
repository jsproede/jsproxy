<template>
  <div class="wrapper">
    <div class="proxy-state" :class="{ on: proxyRunning }"></div>
    <div>
      <label>
        <span>Port:</span>
        <input type="number" v-model="usePort">
      </label>

      <button @click="toggleProxy" :disabled="proxyRunning">Start proxy</button>
      <button @click="closeAllProxies">Close all proxies</button>

      <div v-if="requestIndex !== -1">
        {{selectedRequest.date}}
        <hr>
        <div class="method">
          <span>Method</span>
          <pre>{{selectedRequest.method}}</pre>
        </div>
        <hr>
        <div class="headers">
          <span>Headers</span>
          <pre>{{JSON.stringify(selectedRequest.headers, undefined, 2)}}</pre>
        </div>
        <hr>
        <div class="body">
          <span>Body</span>
          <pre>{{JSON.stringify(selectedRequest.body, undefined, 2)}}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { mapState } from 'vuex';
import Proxy from '@/proxy';
import ProxyPool from '@/proxy/pool';

@Component({
  computed: mapState(['requests', 'requestIndex']),
})
export default class Content extends Vue {
  private usePort: number = 3748;
  private proxy: Proxy | null = null;

  private toggleProxy(): void {
    this.proxy = ProxyPool.acquireProxy(this.usePort);
    this.proxy.start();
  }

  private closeAllProxies(): void {
    ProxyPool.closeAllProxies();
  }

  get proxyRunning(): boolean {
    return !!this.proxy && this.proxy.isRunning();
  }

  get selectedRequest(): any {
    if (this.requestIndex !== -1) {
      // TODO: Why is this marked as an error
      return this.requests[this.requestIndex];
    }

    return null;
  }
}
</script>

<style lang="scss" scoped>
div.wrapper {
  position: relative;
  border-left: 1px solid lightgray;
  box-shadow: -5px 0 25px -15px rgba(1, 1, 1, 0.8);
  padding: 10px;

  height: 100%;

  .proxy-state {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: red;

    &.on {
      background: green;
    }
  }
}
</style>
