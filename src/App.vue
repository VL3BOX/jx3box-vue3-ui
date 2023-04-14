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
            <SimpleThxVue
                postType="bbs"
                postTitle="bbs23865的标题"
                type="batchReward"
                :userId="7"
                :adminBoxcoinEnable="true"
                :userBoxcoinEnable="true"
                :postId="57260"
            />
            <RightSidebar> </RightSidebar>
            <Footer></Footer>
            <!-- <Bottom></Bottom> -->
        </Main>
    </div>
</template>

<script>
import Author from './Author.vue';
import SimpleThxVue from "./single/SimpleThx.vue";
export default {
    name: "App",
    components: {
        SimpleThxVue,
        Author,
    },
};
</script>
