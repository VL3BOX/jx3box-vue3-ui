import Header from "./src/Header.vue";
import Footer from "./src/Footer.vue";
import Main from "./src/Main.vue";
import Breadcrumb from "./src/Breadcrumb.vue";
import LeftSidebar from "./src/LeftSidebar.vue";
import RightSidebar from "./src/RightSidebar.vue";
import LeftSideToggle from "./src/LeftSideToggle.vue";
import Bottom from "./src/Bottom.vue";

const components = {
    Header,
    Footer,
    Main,
    Breadcrumb,
    LeftSidebar,
    RightSidebar,
    LeftSideToggle,
    Bottom,
};

const install = function (app) {
    Object.keys(components).forEach((key) => {
        app.component(key, components[key]);
    });
};

export { install };
