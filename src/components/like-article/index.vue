<template>
  <van-button
    :icon="value === 1 ? 'good-job' : 'good-job-o'"
    :class="{
      liked: value === 1,
    }"
    :loading="loading"
    @click="onCollect"
  />
</template>
    
<script>
import { addLike, deleteLike } from "@/api/article";
export default {
  name: "LikeArticle",
  components: {},
  props: {
    value: {
      type: Number,
      required: true,
    },
    articleId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onCollect() {
      this.loading = true;
      try {
        let status = -1;
        if (this.value === 1) {
          // 已收藏，取消收藏
          await deleteLike(this.articleId);
        } else {
          // 没有收藏，添加收藏
          await addLike(this.articleId);
          status = 1;
        }

        // 更新视图
        // 自定义事件修改数据并不是立即的
        this.$emit("input", status);

        this.$toast.success(status === 1 ? "点赞成功" : "取消点赞");
      } catch (err) {
        this.$toast.fail("操作失败，请重试！");
      }
      this.loading = false;
    },
  },
};
</script>

<style scoped lang="less">
.liked {
  .van-icon {
    color: #e5645f;
  }
}
</style>
  