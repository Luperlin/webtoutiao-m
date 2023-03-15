<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        class="edit-btn"
        type="danger"
        plain
        round
        size="mini"
        @click="isEdit = !isEdit"
        >{{ isEdit ? "完成" : "编辑" }}</van-button
      >
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in mychannel"
        :key="index"
        @click="onMyChannelClick(channel, index)"
      >
        <van-icon
          v-show="isEdit && !fiexdChannels.includes(channel.id)"
          slot="icon"
          name="clear"
        ></van-icon>
        <span class="text" :class="{ active: index === active }" slot="text">{{
          channel.name
        }}</span>
      </van-grid-item>
    </van-grid>
    <!--频道推荐  -->
    <van-cell :border="false">
      <div slot="title">频道推荐</div>
    </van-cell>
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in recommendChannels"
        :key="index"
        icon="plus"
        :text="channel.name"
        @click="onAddChannel(channel)"
      />
    </van-grid>
  </div>
</template>
  
<script>
import {
  getAllChannels,
  addUserChannel,
  deleteUserChannel,
} from "@/api/channel";
import { mapState } from "vuex";
import { setItem } from "@/utils/stroage";
export default {
  name: "ChannelEdit",
  components: {},
  props: {
    myChannels: {
      type: Array,
      require: true,
    },
    active: {
      type: Number,
      require: true,
    },
  },
  data() {
    return {
      allChannels: [],
      isEdit: false,
      fiexdChannels: [0],
      mychannel: this.myChannels,
    };
  },
  computed: {
    ...mapState(["user"]),
    recommendChannels() {
      const channels = [];
      this.allChannels.forEach((channel) => {
        const ret = this.myChannels.find((myChannel) => {
          return myChannel.id === channel.id;
        });
        if (!ret) {
          channels.push(channel);
        }
      });

      return channels;
    },
  },
  watch: {},
  created() {
    this.loadAllChannels();
  },
  mounted() {},
  methods: {
    async loadAllChannels() {
      try {
        const { data } = await getAllChannels();
        // console.log(data);
        this.allChannels = data.data.channels;
      } catch (err) {
        console.log(err);
      }
    },

    //添加频道
    async onAddChannel(channel) {
      // console.log(channel);
      this.mychannel.push(channel);
      if (this.user) {
        try {
          //已登录 存储到线上
          await addUserChannel({
            id: channel.id, //频道id
            seq: this.mychannel.length, //序号
          });
        } catch (err) {
          this.$toast("保存失败，请稍后重试");
        }
      } else {
        //未登录 存储到本地
        setItem("TOUTIAO_cHANNELS", this.mychannel);
      }
    },

    onMyChannelClick(channel, index) {
      //删除频道
      if (this.isEdit) {
        //编辑状态，删除
        if (this.fiexdChannels.includes(channel.id)) {
          return; //固定频道不删除
        }
        if (index <= this.active) {
          this.$emit("update-active", this.active - 1, true);
        }
        this.deleteChannel(channel);
        this.mychannel.splice(index, 1);
      } else {
        //非编辑状态，切换
        this.$emit("update-active", index, false);
      }
    },
    async deleteChannel(channel) {
      try {
        if (this.user) {
          //将数据更新到后台
          await deleteUserChannel(channel.id);
        } else {
          //将数据更新到本地
          setItem("TOUTIAO_cHANNELS", this.mychannel); //将原本的覆盖就行了
        }
      } catch (err) {
        this.$toast("删除失败，请稍后重试");
      }
    },
  },
};
</script>
  
  <style scoped lang="less">
.channel-edit {
  padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: #333333;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    // line-height: 48px;

    border: 1px solid #f85959;
  }
  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text,
      .text {
        font-size: 28px;
        color: #222;
      }
      .active {
        color: red;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }

  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
      .van-grid-item__text {
        margin-top: 0;
      }
    }
  }
  /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
        .van-grid-item__text {
          margin-top: 0;
        }
      }
    }
  }
}
</style>
  