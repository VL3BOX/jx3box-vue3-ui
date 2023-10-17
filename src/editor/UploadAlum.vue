<template>
    <div class="c-upload-album">
        <Upload @insert="updateFileList" text="批量上传图片" />
        <div class="c-upload-album-list">
            <div class="m-album" id="uploadAlbum" v-if="imgList && imgList.length">
                <div class="u-album-item" v-for="(item, i) in imgList" :key="timeStamp + i">
                    <img class="u-pic" :src="item.url ? item.url : item" />
                    <i class="u-mask"></i>
                    <el-icon class="u-op u-preview" @click="previewHandle(item)"><ZoomIn /></el-icon>
                    <el-icon class="u-op u-delete" @click="deleteHandle(i)"><Delete /></el-icon>
                </div>
            </div>
            <div class="u-null" v-else><i class="el-icon-warning-outline"></i> 当前没有任何图片</div>
        </div>
        <el-dialog class="c-upload-album-preview" v-model="dialogVisible">
            <img class="u-img" :src="dialogImageUrl" alt />
        </el-dialog>
    </div>
</template>

<script>
const { getThumbnail } = require("@jx3box/jx3box-common/js/utils.js");
import Upload from "./Upload.vue"; 
import Sortable from "sortablejs";

export default {
    name: "UploadAlum",
    props: ["data"], 
    data: function () {
        return {
            imgList: this.data || [],
            dialogImageUrl: "",
            dialogVisible: false,
            timeStamp: new Date().getTime() + Math.random(),
        };
    },
    model: {
        prop: "data", //向上同步数据
        event: "update",
    },
    watch: {
        data: {
            immediate: true,
            deep: true,
            handler: function (newVal) {
                this.imgList = newVal || [];
                if (this.imgList.length) {
                    this.$nextTick(() => {
                        this.sort();
                    });
                }
            },
        },
        imgList: {
            deep: true,
            handler: function (newVal) {
                this.$nextTick(() => {
                    this.sort();
                });
                this.$emit("update", newVal);
            },
        },
    },
    computed: {},
    methods: {
        updateFileList: function (data) {
            let upload_list = data.list;
            let img_list = [];
            upload_list.forEach((item) => {
                if (item.is_img) {
                    img_list.push({
                        name: item.name,
                        url: item.url,
                    });
                }
            });
            this.imgList = [...this.imgList, ...img_list];
        },
        previewHandle: function (item) {
            this.dialogImageUrl = item;
            this.dialogVisible = true;
        },
        deleteHandle: function (i) {
            this.imgList.splice(i, 1);
        },
        sort() {
            var el = document.getElementById("uploadAlbum");
            var sortable = Sortable.create(el);
        },
        showThumbnail(val) {
            return getThumbnail(val, 146);
        },
    },
    components: {
        Upload,
    },
};
</script>

<style lang="less">
.c-upload-album {
    .flex;
    .w(100%);
    flex-direction: column;
    gap: 20px;
    .c-upload-album-list {
        .flex;
        .w(100%);
        .r(8px);
        gap: 20px;
        box-sizing: border-box;
        flex-wrap: wrap;
        padding: 20px;
        border: 2px dashed #eee;
        @h: 148px;
        min-height: @h;
        .u-null {
            .x;
            .auto(x);
            .fz(12px,@h);
            color: #999;
        }
        .m-album {
            .flex;
            gap:10px;
            .u-album-item {
                .pr;
                .size(@h);
                img {
                    .db;
                    .size(100%);
                }
                overflow: hidden;
                background-color: #fff;
                border: 1px solid #c0ccda;
                border-radius: 6px;
                box-sizing: border-box;
                display: inline-block;
                &:hover {
                    .u-mask,
                    .u-op {
                        .db;
                    }
                }
            }

            .u-mask,
            .u-op {
                .pa;
                .none;
            }
            .u-op {
                .pointer;
            }
            .u-mask {
                background-color: rgba(0, 0, 0, 0.5);
                transition: opacity 0.3s;
                .lt(0);
                .size(100%);
                .none;
                cursor: move;
            }
            .u-delete,
            .u-preview {
                .fz(20px);
                color: #fff;
                .lt(50%);
                .size(20px);
                transform: translate(-50%, -50%);
            }
            .u-delete {
                .ml(20px);
            }
            .u-preview {
                .ml(-20px);
            }
        }
    }
}
.c-upload-album-preview {
    .u-img {
        min-width: 800px;
    }
}
</style>
