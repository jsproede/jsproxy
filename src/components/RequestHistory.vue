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
          <span class="http-method">{{request.method}}</span>
          <span class="http-url" :title="request.url">{{request.url}}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { mapMutations } from 'vuex';

@Component({})
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

      a {
        .http-method {
          padding: 2px 4px;
          font-size: 10px;
          background-color: #476c9b;
          color: #fff;
          border-radius: 2px;

          margin-right: 8px;
        }
      }
    }
  }
}
</style>
