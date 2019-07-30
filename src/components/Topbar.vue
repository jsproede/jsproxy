<template>
  <div class="wrapper">
    <ul>
      <li>
        <router-link to="/">Requests</router-link>
      </li>
      <li>Settings</li>
      <li>About</li>
    </ul>

    <div class="proxy-state" :class="{ on: proxyRunning }"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ProxyPool from '../proxy/pool';
import Proxy from '../proxy';

@Component({})
export default class Topbar extends Vue {
  protected proxy: Proxy = ProxyPool.acquireProxy();

  get proxyRunning(): boolean {
    return this.proxy.isRunning();
  }
}
</script>

<style lang="scss" scoped>
div.wrapper {
  position: relative;
  height: 40px;
  margin-bottom: 2px;
  box-shadow: 0px 0px 0px 2px rgba(233, 233, 233, 0.2);

  ul {
    margin: 0;
    padding: 0 50px 0 10px;

    height: 100%;

    list-style-type: none;

    display: flex;
    align-items: center;

    li {
      font-size: 14px;

      &:not(:last-child) {
        margin-right: 20px;
      }

      a {
        color: inherit;
        text-decoration: none;
      }
    }
  }

  .proxy-state {
    position: absolute;
    top: 0;
    right: 0;
    border-style: solid;
    border-width: 0 30px 30px 0;
    border-color: transparent #832232 transparent transparent;

    &.on {
      border-color: transparent #7fb069 transparent transparent;
    }
  }
}
</style>
