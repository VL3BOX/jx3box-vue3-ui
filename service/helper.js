import { $helper } from "@jx3box/jx3box-common/js/https_v2";

function getCollection(id) {
    return $helper().get(`/api/post/collection/${id}`);
}

// 面包屑
function getBreadcrumb(key) {
    return $helper()
        .get(`/api/breadcrumb/${key}`)
        .then((res) => {
            return res.data.data.breadcrumb.html || "";
        });
}

export { getCollection, getBreadcrumb };
