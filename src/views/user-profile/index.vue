<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />>
    <!-- /导航栏 -->
    <input type="file" hidden ref="file" @change="onFileChange" />
    <!-- 个人信息 -->
    <!-- 头像 -->
    <van-cell
      class="photo-cell"
      title="头像"
      is-link
      center
      @click="$refs.file.click()"
    >
      <van-image class="avatar" fit="cover" round :src="user.photo" />
    </van-cell>
    <!-- 编辑头像 -->
    <van-popup
      v-model="isUpdatePhotoShow"
      style="height=100%"
      position="bottom"
    >
      <updatePhoto
        v-if="isUpdatePhotoShow"
        :img="img"
        @close="isUpdatePhotoShow = false"
        @update-photo="user.photo = $event"
      />
    </van-popup>
    <!-- /编辑头像 -->
    <!-- /头像 -->

    <!-- 昵称 -->
    <van-cell
      title="昵称"
      :value="user.name"
      is-link
      @click="isUpdateNameShow = true"
    />
    <!-- 编辑昵称 -->
    <van-popup v-model="isUpdateNameShow" style="height=100%" position="bottom">
      <UpdateName
        v-if="isUpdateNameShow"
        @close="isUpdateNameShow = false"
        v-model="user.name"
      />
    </van-popup>
    <!-- /编辑昵称 -->
    <!-- 昵称 -->

    <!-- 性别 -->
    <van-cell
      title="性别"
      :value="user.gender === 0 ? '男' : '女'"
      is-link
      @click="isUpdateGenderShow = true"
    />
    <!-- 编辑性别 -->
    <van-popup v-model="isUpdateGenderShow" position="bottom">
      <updateGender
        v-if="isUpdateGenderShow"
        @close="isUpdateGenderShow = false"
        v-model="user.gengder"
      />
    </van-popup>
    <!-- /编辑性别 -->
    <!-- 性别 -->

    <!-- 生日 -->
    <van-cell
      title="生日"
      :value="user.birthday"
      @click="isUpdateBirthdayShow = true"
      is-link
    />
    <!-- 编辑生日 -->
    <van-popup v-model="isUpdateBirthdayShow" position="bottom">
      <updateBirthday
        v-if="isUpdateBirthdayShow"
        @close="isUpdateBirthdayShow = false"
        v-model="user.birthday"
      />
    </van-popup>
    <!-- /编辑生日 -->
    <!-- 生日 -->
    <!-- /个人信息 -->
  </div>
</template>

<script>
import { getUserProfile } from "@/api/user";
import UpdateName from "./components/update-name.vue";
import updateGender from "./components/uodate-gender.vue";
import updateBirthday from "./components/update-birthday.vue";
import updatePhoto from "./components/update-photo.vue";
export default {
  name: "UserProfile",
  components: {
    UpdateName,
    updateGender,
    updateBirthday,
    updatePhoto,
  },
  props: {},
  data() {
    return {
      user: {},
      isUpdateNameShow: false,
      isUpdateGenderShow: false,
      isUpdateBirthdayShow: false,
      isUpdatePhotoShow: false,
      img: null,
    };
  },
  computed: {},
  watch: {},
  created() {
    this.loadUserProfile();
  },
  mounted() {},
  methods: {
    async loadUserProfile() {
      const { data } = await getUserProfile();
      this.user = data.data;
    },
    onFileChange() {
      // 获取文件对象
      const file = this.$refs.file.files[0];
      //基于文章对象获取blob数据
      const data = window.URL.createObjectURL(file);
      this.img = data;
      this.isUpdatePhotoShow = true;
      this.$refs.file.value = "";
    },
  },
};
</script>

<style scoped lang="less">
.user-profile {
  .avatar {
    width: 60px;
    height: 60px;
  }
  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>