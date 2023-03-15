<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录">
      <van-icon slot="left" name="cross" @click="$router.back()"></van-icon>
    </van-nav-bar>

    <!-- 登录表单 -->
    <van-form ref="loginFrom" @submit="onSubmit">
      <van-cell-group inset>
        <van-field v-model="user.mobile" name="mobile" placeholder="请输入手机号" :rules="userFromRules.mobile" type="number"
          maxlength="11">
          <i slot="left-icon" class="toutiao toutiao-shouji"></i>
        </van-field>
        <van-field v-model="user.code" name="code" placeholder="请输入验证码" :rules="userFromRules.code" maxlength="6">
          <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
          <template #button>
            <!-- time倒计时 时间 -->
            <van-count-down :time="1000 * 60" format=" ss s" v-if="isCountDownShow" @finish="isCountDownShow = false" />
            <van-button v-else class="send-sms-btn" round size="small" type="default" native-type="button"
              @click="onSendSms">发送验证码</van-button>
          </template>
        </van-field>
      </van-cell-group>
      <div class="log-btn-wrap">
        <van-button class="login-btn" block type="default" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from "@/api/user.js";
export default {
  name: "LoginIndex",
  components: {},
  props: {},
  data() {
    return {
      user: {
        mobile: "",
        code: "",
      },
      userFromRules: {
        mobile: [
          { required: true, message: "手机号不能为空" },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: "手机号格式错误" },
        ],
        code: [
          { required: true, message: "验证码不能为空" },
          { pattern: /^\d{6}$/, message: "验证码格式错误" },
        ],
      },
      isCountDownShow: false,
    };
  },
  computed: {},
  watch: {},
  created() { },
  mounted() { },
  methods: {
    async onSubmit() {
      const user = this.user;
      // loading 转圈圈提示
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: "登陆中...",
        forbidClick: true, // 是否禁止背景点击
      });
      try {
        const { data } = await login(user);
        // console.log("OK", res);
        this.$store.commit("setUser", data.data);
        this.$toast.success("登录成功");
        //跳转回原来页面
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail("手机号或验证码错误");
        } else {
          this.$toast.fail("登录失败");
        }
      }
    },
    async onSendSms() {
      //验证手机号
      try {
        await this.$refs.loginFrom.validate("mobile");
        // console.log("验证通过");
        //验证倒计时
        this.isCountDownShow = true;
        //发送验证码
        try {
          await sendSms(this.user.mobile);
          // console.log(res);
          this.$toast("发送成功");
        } catch (err) {
          this.isCountDownShow = false;
          if (err.response.status === 429) {
            this.$toast("发送太频繁了，请稍后重试");
          } else {
            this.$toast("发送失败，请稍后重试");
          }
        }
      } catch (err) {
        return console.log("验证失败", err);
      }
    },
  },
};
</script>

<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }

  .send-sms-btn {
    background-color: #ededed;
    width: 152px;
    height: 46px;
    line-height: 46px;
    font-size: 22px;
    color: #666;
  }

  .log-btn-wrap {
    margin: 53px 33px;

    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
