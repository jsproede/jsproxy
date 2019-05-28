<template>
  <div class="wrapper">
    <div>
      <!-- <label>
        <span>Port:</span>
        <input type="number" v-model="usePort">
      </label>

      <button @click="toggleProxy" :disabled="proxyRunning">Start proxy</button>
      <button @click="closeAllProxies">Close all proxies</button>-->

      <div v-if="requestIndex !== -1">
        <span>
          {{selectedRequest.method}}
          <span class="bold">{{selectedRequest.url}}</span>
          | {{selectedRequest.date | date}}
        </span>
        <p></p>
        <div class="headers">
          <span>HTTP Headers</span>
          <pre class="json">{{JSON.stringify(selectedRequest.headers, undefined, 2)}}</pre>
        </div>
        <div v-if="selectedRequest.method !== 'GET'" class="body">
          <span>HTTP Body</span>
          <pre class="json">{{selectedRequest.body}}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { mapState } from 'vuex';
import moment from 'moment';

import Proxy from '@/proxy';
import ProxyPool from '@/proxy/pool';

@Component({
  computed: mapState(['requests', 'requestIndex']),
  filters: {
    date(value: any) {
      return moment(value).format('DD.MM.YYYY - HH:mm:ss');
    },
  },
})
export default class Content extends Vue {
  private requests!: [];
  private requestIndex!: number;

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
      console.log(this.requests[this.requestIndex]);
      return this.requests[this.requestIndex];
    }

    return null;
  }
}
</script>

<style lang="scss" scoped>
div.wrapper {
  position: relative;
  box-shadow: -2px 0 0 0px rgba(252, 252, 252, 0.2);
  padding: 10px;

  height: 100%;
}
</style>
