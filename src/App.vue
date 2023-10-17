<template>
    <div class="container-page">
        <Header></Header>
        <breadcrumb
            name="频道名称"
            slug="slug"
            root="/slug"
            :publishEnable="true"
            :feedbackEnable="true"
            :adminEnable="true"
            :crumbEnable="true"
        >
            <template #logo>
                <img svg-inline src="../assets/img/jx3.svg" />
            </template>
            bread info
        </breadcrumb>
        <LeftSidebar :open="true" :uid="8">
            <LeftSideToggle :mobileOnly="true" />
            <Author :uid="8" />
        </LeftSidebar>

        <Main :withoutLeft="false" :withoutRight="false">
            <UploadAlum />
            <PostHeader :post="post"></PostHeader>
            <SimpleThxVue
                postType="bbs"
                postTitle="bbs23865的标题"
                :userId="7"
                :adminBoxcoinEnable="true"
                :userBoxcoinEnable="true"
                :allowGift="true"
                :postId="57260"
            />
            <Thx
                postType="bbs"
                postTitle="bbs23865的标题"
                type="batchReward"
                :userId="7"
                :adminBoxcoinEnable="true"
                :userBoxcoinEnable="true"
                :postId="57260"
                :allowGift="true"
            />
            <Comment category="post" id="19382"></Comment>
            <RightSidebar>
                <PostTopic type="bps" :id="48857"></PostTopic>
            </RightSidebar>

            <Footer> </Footer>
            <!-- <Bottom></Bottom> -->
        </Main>
    </div>
</template>

<script>
import UploadAlum from "./editor/UploadAlum.vue";
import Author from "./single/Author.vue";
import SimpleThxVue from "./single/SimpleThx.vue";
import Comment from "./single/Comment.vue";
import Thx from "./single/Thx.vue";
import PostHeader from "./single/PostHeader.vue";
import PostTopic from "./single/PostTopic.vue";
import axios from "axios";
export default {
    name: "App",
    components: {
        SimpleThxVue,
        Author,
        Comment,
        Thx,
        PostHeader,
        PostTopic,
        UploadAlum,
    },
    data() {
        return {
            post_id: "60031",
            post: "",
        };
    },
    watch: {
        post_id: {
            immediate: true,
            handler: function () {
                this.loadPost();
            },
        },
    },
    methods: {
        loadPost() {
            axios.get(`/api/cms/post/${this.post_id}`).then((res) => {
                this.post = res.data.data;
                this.$forceUpdate();
            });
        },
    },
};
</script>
