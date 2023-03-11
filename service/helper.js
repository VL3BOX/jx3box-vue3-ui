import { $helper } from "@jx3box/jx3box-common/js/https_v2";

function getCollection(id) {
    return $helper().get(`/api/post/collection/${id}`);
}

export { getCollection };
