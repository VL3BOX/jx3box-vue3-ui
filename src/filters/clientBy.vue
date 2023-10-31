<template>
    <div class="w-filter-client">
        <ul>
            <li
                class="u-client"
                :class="{ on: client == value }"
                v-for="(label, value) in clients"
                :key="value"
                @click="filter(value)"
            >
                {{ label }}
            </li>
        </ul>
    </div>
</template>

<script>
const clients = {
    all: "全部版本",
    std: "重制",
    origin: "缘起",
};
export default {
    name: "clientBy",
    emits: ["filter"],
    props: ["type"],
    data: function () {
        return {
            client: this.type || "all",
            clients,
        };
    },
    computed: {},
    methods: {
        filter: function (val) {
            this.client = val;
            this.$emit("filter", { type: "client", val: val });
            this.$forceUpdate();
        },
    },
    mounted: function () {
        const client = location.href.includes("origin") ? "origin" : "std";
        if (client) {
            this.client = client;
            this.filter(this.client);
        }
    },
};
</script>

<style lang="less">
.w-filter-client {
    font-size: 0;
    ul,
    li {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    ul {
        .clearfix;
        .dbi;
        background-color: @bg-gray;
        border: 1px solid #eee;
        .r(3px);
        overflow: hidden;
    }
    li {
        padding: 5px 10px;
        .fl;
        .fz(12px);
        border-right: 1px solid #eee;
        &:last-child {
            border-right: none;
        }
        .pointer;

        &.on {
            background-color: @color-link;
            color: #fff;
            border-color: darken(@color-link, 5%);
        }
    }
}
</style>
