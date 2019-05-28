<template>
  <div class="wrapper">
    <div class="clear-history-wrapper">
      <a @click="clearHistory">Clear all</a>
    </div>
    <request-history :requests="requests" @request-selected="select"></request-history>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState, mapMutations } from 'vuex';

import RequestHistory from './RequestHistory.vue';

@Component({
  name: 'Sidebar',
  computed: mapState(['requests', 'requestIndex']),
  methods: mapMutations(['clearRequests', 'selectRequest']),
  components: {
    RequestHistory,
  },
})
export default class Sidebar extends Vue {
  public clearRequests!: any;

  protected selectRequest!: any;

  protected select(index: number) {
    this.selectRequest({
      id: index,
    });
  }

  private clearHistory(): void {
    this.clearRequests();
  }
}
</script>

<style lang="scss" scoped>
div.wrapper {
  height: 100%;

  div.clear-history-wrapper {
    padding: 10px 10px 0 0;
    text-align: right;

    a {
      cursor: pointer;
    }
  }

  ul {
    list-style-type: none;
    padding: 0;

    li {
      display: inline-block;

      &.active {
        font-weight: bold;
      }

      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
}
</style>
