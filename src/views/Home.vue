<template>
  <div class="home">
    <Topbar/>
    <div class="grid" @mousedown="mousedown" @mousemove="mousemove" @mouseup="mouseup">
      <div class="sidebar box">
        <Sidebar/>
        <div class="handler"></div>
      </div>
      <div class="content box">
        <Content/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Sidebar from '@/components/Sidebar.vue';
import Content from '@/components/Content.vue';
import Topbar from '@/components/Topbar.vue';

@Component({
  components: {
    Sidebar,
    Content,
    Topbar,
  },
})
export default class Home extends Vue {
  private isHandlerDragging: boolean = false;

  protected mousedown(e: MouseEvent) {
    if (e.target === document.querySelector('.handler')) {
      this.isHandlerDragging = true;
    }
  }

  protected mousemove(e: MouseEvent) {
    if (!this.isHandlerDragging) {
      return;
    }

    const wrapper: any = document.querySelector('div.grid');
    const sidebar: any = document.querySelector('div.sidebar');

    const containerOffsetLeft = wrapper.offsetLeft;
    const pointerRelativeXpos = e.clientX - containerOffsetLeft;

    sidebar.style.width = `${pointerRelativeXpos + 0}px`;
    sidebar.style.flexGrow = 0;
  }

  protected mouseup() {
    this.isHandlerDragging = false;
  }
}
</script>

<style lang="scss" scoped>
div.home {
  height: 100vh;

  div.grid {
    display: flex;
    height: calc(100% - 42px);

    div.box {
      box-sizing: border-box;
      flex: 1 1 auto;
      overflow-y: auto;

      &.sidebar {
        min-width: 100px;
        position: relative;
      }

      &.content {
        border-left: 2px solid rgba(252, 252, 252, 0.2);
      }
    }

    div.handler {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      width: 10px;
      flex: 0 0 auto;
      padding: 0;
      cursor: ew-resize;

      &:before {
        content: '';
        display: block;
        width: 4px;
        height: 100%;
        margin: auto;
      }
    }
  }
}
</style>

