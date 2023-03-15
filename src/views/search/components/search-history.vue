<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="$emit('clear-search-history')">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon v-else name="delete" @click="isDeleteShow = true" />
    </van-cell>
    <!-- 内容部分 -->
    <van-cell
      v-for="(item, index) in searchHistories"
      :key="index"
      :title="item"
      @click="onSearchItemClick(item, index)"
    >
      <van-icon v-if="isDeleteShow" name="close" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "SearchHistory",
  props: {
    searchHistories: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isDeleteShow: false,
    };
  },
  computed: {},
  created() {},

  methods: {
    onSearchItemClick(item, index) {
      if (this.isDeleteShow) {
        //删除状态
        this.$emit("clearhistory", index);
      } else {
        //搜索状态
        console.log(item);
        this.$emit("search", item);
      }
    },
  },
};
</script>

<style  scoped lang="less"></style>