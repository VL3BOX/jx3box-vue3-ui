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
            <!-- <Author :author="author" :uid="37" /> -->
        </LeftSidebar>

        <Main :withoutLeft="false" :withoutRight="false">
            <RightSidebar> </RightSidebar>
            <Footer></Footer>
            <Bottom></Bottom>
        </Main>
    </div>
</template>

<script>
import Header from "./Header.vue";
import Breadcrumb from "./Breadcrumb.vue";
import Main from "./Main.vue";
import Footer from "./Footer.vue";
import LeftSidebar from "./LeftSidebar.vue";
import LeftSideToggle from "./LeftSideToggle.vue";
import RightSidebar from "./RightSidebar.vue";
import Bottom from "./Bottom.vue";
export default {
    name: "App",
    components: {
        Main,
        Header,
        Footer,
        Breadcrumb,
        LeftSidebar,
        LeftSideToggle,
        RightSidebar,
        Bottom,
    },
};
</script>
