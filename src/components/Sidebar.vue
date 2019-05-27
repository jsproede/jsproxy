<template>
  <div class="wrapper">
    <button @click="clearHistory">Clear history</button>
    <div>Requests</div>
    <ul v-if="requests">
      <li
        v-for="(request, index) in requests"
        :key="index"
        :class="{active: index === requestIndex}"
      >
        <a @click="selectRequest({ id: index })">{{request.url}}</a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState, mapMutations } from 'vuex';

@Component({
  name: 'Sidebar',
  computed: mapState(['requests', 'requestIndex']),
  methods: mapMutations(['clearRequests', 'selectRequest']),
})
export default class Sidebar extends Vue {
  clearHistory(): void {
    this.clearRequests();
  }
}
</script>

<style lang="scss" scoped>
div.wrapper {
  width: 300px;
  padding: 10px;

  height: 100%;

  ul {
    list-style-type: none;
    padding: 0 0 0 5px;

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
