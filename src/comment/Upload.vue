<template>
    <div>
        <el-upload
            action="https://cms.jx3box.com/api/cms/upload"
            ref="upload"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :auto-upload="false"
            :file-list="fileList"
            :limit="maxCount"
            :accept="acceptedExtensions.reduce((acc, cur) => acc + `.${cur},`, '')"
            multiple
            with-credentials
            :on-exceed="onExceed"
            :on-change="onChange"
            :on-success="onSuccess"
            :on-error="onError"
        >
            <el-icon><Plus></Plus></el-icon>
            <template #tip>
                <div class="el-upload__tip">
                    最多上传 {{ maxCount }} 张
                    {{ acceptedExtensions.join(" / ").toUpperCase() }} 格式图片，单张图片不能超过
                    {{ maxSize / 1024 / 1024 }} MB
                </div>
            </template>
        </el-upload>
        <el-dialog v-model="dialogVisible">
            <img w-full :src="dialogImageUrl" alt />
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "CommentUploader",
    props: ["limit", "imgList"],
    emits: ["onFinish", "onError"],
    data() {
        return {
            dialogImageUrl: "",
            dialogVisible: false,
            fileList: [],
            successList: [],

            acceptedExtensions: ["jpg", "jpeg", "png", "gif"],
            maxCount: 5,
            maxSize: 2 * 1024 * 1024,
        };
    },
    watch: {
        limit: {
            immediate: true,
            handler: function (val) {
                if (val) this.maxCount = val;
            },
        },
        imgList: {
            immediate: true,
            deep: true,
            handler: function (_list) {
                // 判断是不是字符串
                if (typeof _list === "string") {
                    _list = [_list];
                }
                this.fileList = _list && _list.length ? _list.map((item) => ({ url: item })) : [];
            },
        },
    },
    methods: {
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        onExceed() {
            this.$notify({
                title: "",
                message: `最多上传 ${this.maxCount} 张图片！`,
                type: "error",
                duration: 3000,
                position: "bottom-right",
            });
        },
        onChange(file, fileList) {
            if (file.status == "ready") {
                if (file.size > this.maxSize) {
                    this.$notify({
                        title: "",
                        message: `单张图片大小不能超过 ${this.maxSize / 1024 / 1024} MB！`,
                        type: "error",
                        duration: 3000,
                        position: "bottom-right",
                    });
                    fileList.pop();
                } else {
                    this.fileList = fileList;
                }
            }
        },
        upload() {
            if (this.fileList.length > 0) {
                this.$refs.upload.submit();
            } else {
                this.$emit("onFinish", []);
            }
        },
        onSuccess(response) {
            this.successList = this.successList.concat(response.data);
            if (this.successList.length == this.fileList.length) {
                this.$emit("onFinish", this.successList || []);
                this.fileList = [];
                this.successList = [];
            }
        },
        onError() {
            this.$notify({
                title: "",
                message: "图片上传失败!",
                type: "error",
                duration: 3000,
                position: "bottom-right",
            });
            this.$emit("onError");
            this.fileList = [];
        },
    },
};
</script>
