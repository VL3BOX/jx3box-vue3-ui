<template>
    <div class="c-header-panel c-header-info">
        <div class="c-header-profile" id="c-header-profile">
            <img class="u-avatar" :src="showAvatar(user.user_avatar)" />
            <template v-if="isPhone">
                <ul class="u-menu u-pop-content">
                    <li>
                        <a href="/dashboard">{{ $t('个人中心') }}</a>
                    </li>
                    <li>
                        <a :href="url.msg">{{ $t('消息中心') }}</a>
                    </li>
                    <li>
                        <a :href="url.publish">{{ $t('发布中心') }}</a>
                    </li>
                    <hr />
                    <li v-if="isAdmin">
                        <a href="/admin">{{ $t('站点配置') }}</a>
                    </li>
                    <li v-if="isEditor">
                        <a href="https://os.jx3box.com/admin">{{ $t('管理平台') }}</a>
                    </li>
                    <li>
                        <a class="" @click="logout">{{ $t('退出登录') }}</a>

                    </li>
                </ul>
            </template>
            <template v-else>
                <div class="c-header-userdata u-pop-content">
                    <div class="u-profile">
                        <div class="u-basic">
                            <a class="u-displayname" :href="url.homepage" :title="user.display_name" target="_blank">{{
                                showUserName(user.display_name)
                            }}</a>
                            <a class="u-sign" href="/dashboard/cooperation">
                                <img
                                    :src="super_author_icon"
                                    class="u-superauthor-profile"
                                    alt="superauthor"
                                    :title="$t('签约作者')"
                                    :class="{ off: !isSuperAuthor }"
                            /></a>
                            <a
                                class="u-vip"
                                href="/vip/premium?from=header_usermenu"
                                target="_blank"
                                :title="$t('专业版账号')"
                            >
                                <i class="i-icon-vip" :class="{ on: isPRO }">{{ vipType }}</i>
                                <span class="u-expire">{{ $t('有效期至：') + pro_expire_date }}</span>
                            </a>
                        </div>
                        <div class="u-id">
                            <span
                                >{{ $t('魔盒UID：') }}<b>{{ user.ID }}</b></span
                            >
                            <el-icon @click.stop="copyText(user.ID)"><DocumentCopy /></el-icon>
                        </div>
                    </div>

                    <el-button-group class="u-actions">
                        <a class="el-button el-button--default is-plain" href="/dashboard">{{ $t('个人中心') }}</a>
                        <a class="el-button el-button--default is-plain" :href="url.profile">{{ $t('资料设置') }}</a>
                        <a class="el-button el-button--default is-plain" href="/dashboard/frame">{{ $t('主题风格') }}</a>
                    </el-button-group>

                    <div class="u-other">
                        <a href="/dashboard/fav" class="u-item"
                            ><el-icon><Star /></el-icon>{{ $t('收藏订阅') }}
                        </a>
                        <a href="/team/role/manage" class="u-item"
                            ><el-icon><User /></el-icon>{{ $t('角色管理') }}
                        </a>
                        <a href="/dashboard/purchases" class="u-item"
                            ><el-icon><ShoppingCart /></el-icon>{{ $t('已购资源') }}
                        </a>
                        <a href="/dashboard/mall" class="u-item"
                            ><el-icon><ShoppingBag /></el-icon>{{ $t('订单中心') }}
                        </a>
                        <hr />
                        <a href="/dashboard/feedback" class="u-item"
                            ><el-icon><Phone /></el-icon>{{ $t('反馈帮助') }}
                        </a>
                        <hr />
                        <div class="u-logout">
                            <el-button @click="logout" plain>{{ $t('退出登录') }}</el-button>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import User from "@jx3box/jx3box-common/js/user";
import { showAvatar } from "@jx3box/jx3box-common/js/utils";
import {showDate} from "@jx3box/jx3box-common/js/moment";
import { getMyInfo } from "../../service/author";
import JX3BOX from "@jx3box/jx3box-common/data/jx3box.json";
import { copyText } from "../../utils";
export default {
    name: "HeaderUserInfo",
    props: ["asset"],
    emits: ["logout"],
    data() {
        return {
            isPhone: window.innerWidth < 768,
            // 登录信息
            user: User.getInfo(),
            // links
            url: {
                msg: JX3BOX.__Links.dashboard.msg,
                publish: JX3BOX.__Links.dashboard.publish,
                dashboard: JX3BOX.__Links.dashboard.home,
                profile: JX3BOX.__Links.dashboard.profile,
                homepage: "/author/" + User.getInfo().uid,
            },

            isSuperAuthor: false,
        };
    },
    computed: {
        siteRoot: function () {
            return location.host.includes("origin") ? JX3BOX.__OriginRoot : JX3BOX.__Root;
        },
        super_author_icon: function () {
            return JX3BOX.__imgPath + "image/user/" + "superauthor.svg";
        },
        vipType: function () {
            return "PRO";
        },
        isPRO: function () {
            return User._isPRO(this.asset) || false;
        },
        isAdmin() {
            return User.isAdmin();
        },
        isEditor() {
            return User.isEditor();
        },
        pro_expire_date: function() {
            return this.asset.pro_expire_date ? showDate(this.asset.pro_expire_date) : '-';
        },
    },
    mounted() {
        this.loadMyInfo();
    },
    methods: {
        copyText,
        showAvatar,
        logout: function (mute=false) {
            User.destroy()
                .then(() => {
                    this.$emit("logout");
                    if (location.pathname.startsWith("/dashboard") || location.pathname.startsWith("/publish")) {
                        location.href = this.siteRoot;
                    }
                })
                .then(() => {
                    if (mute) return;
                    this.$notify({
                        title: "成功",
                        message: "登出成功",
                        type: "success",
                        duration: 1000,
                    });
                });
        },
        showUserName: function (val) {
            return val || "匿名";
        },
        loadMyInfo: function () {
            getMyInfo().then((data) => {
                this.user = data;
                this.isSuperAuthor = !!data.sign;

                if (this.user.deleted) {
                    this.logout(true);
                }
            });
        },
    },
};
</script>
