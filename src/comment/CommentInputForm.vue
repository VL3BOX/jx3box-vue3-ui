<template>
    <el-form ref="form" :model="newComment" class="c-comment-box">
        <el-form-item>
            <el-input
                rows="3"
                type="textarea"
                maxlength="300"
                show-word-limit
                v-model="newComment.content"
                :placeholder="$t('参与讨论...')"
                :id="inputId"
            ></el-input>
            <div class="c-comment-tools">
                <el-icon class="u-upload-icon" @click="showUploader = !showUploader"><Picture /></el-icon>
                <Emotion
                   class="c-comment-emotion"
                   @selected="handleEmotionSelected"
                   type="pop"
                   :max="6">
                </Emotion>
            </div>
            <Uploader
                class="u-uploader"
                ref="uploader"
                @onFinish="attachmentUploadFinish"
                @onError="attachmentUploadError"
                v-if="showUploader"
            />
            <div class="u-toolbar">
                <el-button
                    type="primary"
                    @click="onSubmit"
                    class="u-publish"
                    :disabled="disableSubmitBtn"
                    >{{ $t('发表评论') }}</el-button
                >
            </div>
        </el-form-item>
    </el-form>
</template>

<script>
import Uploader from "./Upload.vue";
import Emotion from "@jx3box/jx3box-emotion/src/Emotion2.vue";

export default {
    components: {
        Uploader,
        Emotion
    },
    props: {
        // 用于判定该评论组件是否在底部
        isBottom: {
            type: Boolean,
            default: false
        }
    },
    mounted() {
        if (this.isBottom) this.inputId = "textarea-bottom";
    },
    data: function() {
        return {
            showUploader: false,
            disableSubmitBtn: false,
            newComment: {
                content: ""
            },
            inputId: "textarea-top"
        };
    },
    methods: {
        onSubmit() {
            this.disableSubmitBtn = true;
            if (this.$refs.uploader) {
                this.$refs.uploader.upload();
            } else {
                this.attachmentUploadFinish([]);
            }
        },
        // 文件上传完成后，进行数据提交
        attachmentUploadFinish(data) {
            this.$emit("submit", {
                content: this.newComment.content,
                attachmentList: data
            });
            this.newComment = {
                content: ""
            };
            this.showUploader = false;

            this.disableSubmitBtn = false;
        },
        attachmentUploadError() {
            this.disableSubmitBtn = false;
        },
        // 处理表情
        handleEmotionSelected(key) {
            this.insertVariable(key);
        },
        /**
         * add emotion to textarea
         * @parma {string} emotionVal emotion key
         */
        async insertVariable(emotionVal) {
            const myField = document.querySelector(`#${this.inputId}`);
            const value = emotionVal.key
            if (myField.selectionStart || myField.selectionStart === 0) {
                let startPos = myField.selectionStart;
                let endPos = myField.selectionEnd;

                this.newComment.content =
                    myField.value.substring(0, startPos) +
                    value +
                    myField.value.substring(endPos, myField.value.length);

                await this.$nextTick();

                myField.focus();
                myField.setSelectionRange(
                    endPos + value.length,
                    endPos + value.length
                );
            } else {
                this.newComment.content = value;
            }
        }
    }
};
</script>
