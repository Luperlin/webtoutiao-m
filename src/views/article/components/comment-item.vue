<template>
  <van-cell class="comment-item">
    <!-- 头像 -->
    <van-image
      slot="icon"
      class="avatar"
      round
      fit="cover"
      src="https://img.yzcdn.cn/vant/cat.jpeg"
    />
    <div slot="title" class="title-wrap">
      <div class="user-name">{{ comment.aut_name }}</div>

      <!-- 点赞 -->
      <van-button
        class="like-btn"
        :class="{
          liked: comments.is_liking,
        }"
        :icon="comments.is_liking ? 'good-job' : 'good-job-o'"
        :loading="commentLoading"
        @click="omCommentLike"
        >{{
          comments.like_count > 0 ? "comments.like_count" : "赞"
        }}</van-button
      >
    </div>

    <!-- 回复 -->
    <div slot="label">
      <p class="comment-content">{{ comment.comtent }}</p>
      <div class="bottom-info">
        <span class="comment-pubdate">{{
          comment.pubdata | relativeTime
        }}</span>
        <van-button class="reply-btn" round
          >回复 {{ comment.reply_count }}</van-button
        >
      </div>
    </div>
  </van-cell>
</template>
  
  <script>
import { addCommentLike, deleteCommentLike } from "@/api/comment";
export default {
  name: "CommentItem",
  components: {},
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      commentLoading: false,
      comments: this.comment,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    //点赞
    async omCommentLike() {
      this.commentLoading = true;
      try {
        if (this.comment.is_liking) {
          //已经点赞  取消点赞
          await deleteCommentLike(this.comment.com_id);
          this.comments.like_count--;
        } else {
          //没有点赞  点赞
          await addCommentLike(this.comment.com_id);
          this.comments.like_count++;
        }
        this.comments.is_liking = !this.comments.is_liking;
      } catch (err) {
        this.$toast("操作失败");
      }
      this.commentLoading = false;
    },
  },
};
</script>
  
  <style scoped lang="less">
.comment-item {
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 26px;
    }
  }
  .comment-content {
    font-size: 32px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 19px;
    color: #222;
    margin-right: 25px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    width: 135px;
    height: 48px;
    line-height: 48px;
    font-size: 21px;
    color: #222;
  }
  .like-btn {
    height: 30px;
    padding: 0;
    border: none;
    font-size: 19px;
    line-height: 30px;
    margin-right: 7px;
    .van-icon {
      font-size: 30px;
    }
    &.liked {
      color: #e5645f;
    }
  }
}
</style>
  