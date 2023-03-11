<template>
    <div class="c-header-logo" @click="toggleBox($event)" title="点击展开魔盒矩阵">
        <i class="u-pic" id="c-header-logo"><img svg-inline src="../../assets/img/header/logo.svg" /></i>
        <span class="u-txt" :class="{ on: isIndex }" href="/">魔盒</span>
    </div>
</template>

<script>
import Bus from "../../utils/bus";
export default {
    name: "HeaderLogo",
    props: [],
    data: function () {
        return {
            isIndex: /\/index\/?/.test(location.pathname),
        };
    },
    computed: {},
    methods: {
        // 盒子
        toggleBox: function (e) {
            e.stopPropagation();
            Bus.emit("toggleBox");
        },
    },
    mounted: function () {},
    components: {},
};
</script>

<style lang="less">
//logo
.c-header-logo {
    .pointer;
    user-select: none;
    display: inline-flex;
    flex-shrink: 0;
    flex-grow: 0;
    height: @header-height;

    @padding: 15px;

    .u-pic {
        .db;
        width: @logo-size;
        height: @logo-size;
        float: left;
        padding: @padding 10px;
        svg {
            .size(100%);
            fill: #fff;
        }
        transition: 0.3s ease-in-out;
        &:hover {
            transform: rotate(90deg);
            .mt(-2px);
        }
    }
    .u-txt {
        .db;
        color: #fff;
        font-family: Consolas;
        font-size: 20px;
        line-height: @logo-size;
        padding: @padding 0;
        transition: 0.15s ease-in-out;
        margin-right: 10px;
    }
}
@media screen and (max-width: @phone) {
    .c-header-logo {
        padding-right: 0;
        .u-pic {
            margin: 0;
        }
        .u-txt {
            display: none;
        }
        margin-right: 0;
    }
}
</style>
