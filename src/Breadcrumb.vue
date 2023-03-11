<template>
    <div class="c-breadcrumb" v-if="!isApp">
        <div class="u-menu" @click.stop="toggleLeftSide" v-if="!withoutLeft">
            <img class="u-toggle" :class="{ on: isOpen }" svg-inline src="../assets/img/bread/menu.svg" />
        </div>
        <a class="u-channel" :href="rootLink" :class="{ on: withoutLeft }">
            <i class="u-channel-logo">
                <img :src="getAppIcon(slug)" v-if="!$slots.logo" />
                <slot name="logo"></slot>
            </i>
            <span class="u-title">{{ name }}</span>
        </a>
        <!-- 面包屑内容 -->
        <Crumb :name="slug" v-if="crumbEnable" />
        <slot></slot>
        <div class="u-op">
            <slot name="op-append"></slot>
            <a
                v-if="publishEnable"
                :href="publishLink(slug)"
                class="u-publish el-button el-button--primary el-button--medium u-op-public"
            >
                <el-icon><Edit /></el-icon>
                <span>发布</span>
            </a>
            <a
                v-if="feedbackEnable"
                v-show="isNotAdmin"
                :href="feedback"
                class="u-feedback el-button el-button--primary el-button--medium u-op-public"
                target="_blank"
            >
                <el-icon><InfoFilled /></el-icon>
                <span>反馈</span>
            </a>
            <AdminButton v-if="adminEnable" class="u-admin" />
            <Admin v-if="adminEnable" />
            <slot name="op-prepend"></slot>
        </div>
    </div>
</template>

<script>
import { throttle } from "lodash";
import { publishLink, getAppIcon } from "@jx3box/jx3box-common/js/utils";
import User from "@jx3box/jx3box-common/js/user";
import Admin from "./bread/Admin";
import Crumb from "./bread/Crumb";
import AdminButton from "./bread/AdminButton";

import { isApp } from "../assets/js/app.js";
import Bus from "../utils/bus";

export default {
    name: "CommonBreadcrumb",
    props: [
        "name",
        "slug",
        "root",
        "publishEnable",
        "adminEnable",
        "feedbackEnable",
        "overlayEnable",
        "crumbEnable",
        "withoutLeft",
    ],
    data: function () {
        return {
            isOpen: true,
            feedback: "/feedback?refer=" + encodeURIComponent(window.location.href),
            isNotAdmin: !User.isEditor(),
            isOverlay: false,
            isApp: isApp(),
        };
    },
    computed: {
        rootLink: function () {
            return this.root || `/${this.slug}`;
        },
    },
    methods: {
        toggleLeftSide: function () {
            let status = !this.isOpen;
            Bus.emit("toggleLeftSide", status);
        },
        publishLink,
        getAppIcon,
    },
    mounted: function () {
        Bus.on("toggleLeftSide", (data) => {
            this.isOpen = data;
        });

        if (window.innerWidth < 1024) {
            this.isOpen = false;
        }

        if (this.overlayEnable) {
            const vm = this;
            window.addEventListener(
                "scroll",
                throttle(() => {
                    vm.isOverlay = window.scrollY > 200 ? true : false;
                }, 200)
            );
        }
    },
    components: {
        Admin,
        Crumb,
        AdminButton,
    },
};
</script>

<style lang="less">
@import "../assets/css/breadcrumb.less";
</style>
