import { $cms } from "@jx3box/jx3box-common/js/https_v2";
import axios from "axios";
import JX3BOX from "@jx3box/jx3box-common/data/jx3box.json";
function getPostAuthors(post_id) {
    return $cms({ mute: true }).get(`/api/cms/post/${post_id}/authors`);
}

function uploadFile(data) {
    return $cms().post(`/api/cms/upload`, data);
}

// 获取用户列表
function loadAuthors(params) {
    return $cms().get(`/api/cms/user/list`, {
        params: params,
    });
}

// 获取表情列表
function loadEmotions(params) {
    return $cms().get(`/api/cms/post/emotions`, {
        params: params,
    });
}

function uploadImage(formData) {
    return $cms().post(`/api/cms/upload/avatar`, formData);
}
//获取装扮
function getDecoration(params) {
    return $cms().get(`/api/cms/user/decoration`, {
        params,
    });
}
function getDecorationJson() {
    let url = JX3BOX.__imgPath + "decoration/index.json";
    return axios.get(url);
}
function getHonorJson() {
    let url = JX3BOX.__imgPath + "decoration/honor.json";
    return axios.get(url);
}
// 通用上传
function upload(formData) {
    return $cms().post(`/api/cms/upload`, formData);
}

function getSliders(source_type, source_ids, client='std') {
    let _params = {
        type: "slider",
        source_type,
        per: 10,
        client
    };

    if (source_ids) {
        _params.source_ids = source_ids;
    }

    return $cms({ mute: true }).get(`/api/cms/news/v2`, {
        params: _params,
    });
}

function getCollection(id) {
    return $cms({ mute: true }).get(`/api/cms/post/collection/${id}`);
}

export { getPostAuthors, uploadImage, upload, getDecoration, getDecorationJson, getHonorJson, getSliders, loadAuthors, loadEmotions, uploadFile, getCollection };
