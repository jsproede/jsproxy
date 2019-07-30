<template>
  <div>
    <ul>
      <li
        v-for="(request, index) in requests"
        :key="index"
        :class="{active: index === selectedIndex}"
        @click="select(index)"
      >
        <a>
          <request-method :method="request.method" />
          <span class="http-url" :title="request.url">{{request.url}}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { mapMutations } from 'vuex';

import RequestMethod from '@/components/RequestMethod.vue';

@Component({ components: { RequestMethod } })
export default class RequestHistory extends Vue {
  @Prop() requests!: string[];

  protected selectedIndex: number = -1;

  protected select(index: number) {
    this.selectedIndex = index;
    this.$emit('request-selected', index);
  }
}
</script>

<style lang="scss" scoped>
div {
  width: 100%;

  ul {
    width: 100%;
    padding: 0;

    li {
      width: 100%;
      padding: 10px;
      overflow-x: hidden;
      text-overflow: ellipsis;

      cursor: pointer;

      &.active {
        a {
          span.http-url {
            color: #ce8964;
          }
        }
      }
    }
  }
}
</style>
