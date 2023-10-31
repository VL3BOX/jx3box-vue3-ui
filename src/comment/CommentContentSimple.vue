<template>
    <div class="u-reply">
        <div class="u-reply-content">
            <span class="u-reply-label" v-if="replyForUserId != 0">
                回复
                <el-link type="primary" target="_blank" :href="userHref"
                    >@{{ replyForUsername }}</el-link
                >
                :
            </span>
            <div class="u-reply-text" v-html="formatContent(content)"></div>
             <!--<div class="u-reply-text" v-html="content"></div>-->
            <!-- <p v-for="(p, index) in getPList(content)" :key="index" v-html="formatContent(p)"></p> -->
        </div>
        <div class="u-attachements" v-if="attachments.length">
            <el-image
                v-for="url in attachments"
                :key="url"
                :src="showAttachment(url)"
                :preview-src-list="[showPreview(url)]"
                lazy
            ></el-image>
        </div>
        <div class="u-toolbar">
            <el-button
                class="u-admin"
                v-if="canReply"
                link
                icon="ChatLineRound"
                size="small"
                @click="showReplyForReplyInput()"
                type="primary"
                >回复</el-button
            >
            <el-button
                class="u-admin"
                v-if="canDelete"
                link
                icon="Delete"
                size="small"
                type="danger"
                @click="deleteComment()"
                >删除</el-button
            >
            <time class="u-date">
                <i class="Clock"></i>
                {{ dataFormat(date) }}
            </time>
        </div>
    </div>
</template>

<script>
import { resolveImagePath, authorLink } from "@jx3box/jx3box-common/js/utils";
import { formatContent } from "../../utils/emotion";
function fillZero(num) {
    return num > 9 ? num : `0${num}`;
}
export default {
    props: [
        "commentId",
        "content",
        "attachments",
        "date",
        "hasReply",
        "canDelete",
        "canReply",
        "userHref",
        "replyForUsername",
        "replyForUserId",
    ],
    data: function () {
        return {
            showInput: false,
        };
    },
    computed: {
        _attachments: function () {
            return this.attachments.map((val) => {
                return resolveImagePath(val);
            });
        },
    },
    methods: {
        profileLink: function (uid) {
            return authorLink(uid);
        },
        showAttachment: function (val) {
            return resolveImagePath(val) + "?x-oss-process=style/comment_thumb";
        },
        formatContent,
        getPList(content) {
            return content.split("\n");
        },
        deleteComment() {
            this.$confirm("确定删除该评论吗？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    this.$emit("delete", this.commentId);
                })
                .catch(() => {});
        },
        dataFormat(str) {
            let d = new Date(str);
            return (
                d.getFullYear() +
                "-" +
                fillZero(d.getMonth() + 1) +
                "-" +
                fillZero(d.getDate()) +
                " " +
                fillZero(d.getHours()) +
                ":" +
                fillZero(d.getMinutes()) +
                ":" +
                fillZero(d.getSeconds())
            );
        },
        showReplyForReplyInput() {
            this.$emit("showReplyInput");
        },
        previewImg(i) {
            this.$hevueImgPreview({
                multiple: true,
                nowImgIndex: i,
                imgList: this._attachments,
                controlBar: false,
                clickMaskCLose: true,
            });
        },
        showPreview: function (val) {
            return resolveImagePath(val);
        },
    },
};
</script>

<style lang="less">
.u-reply-content {
    div,
    p {
        padding: 0;
        margin: 0;
        line-height: 1.75;
        font-size: 14px;
        img {
            vertical-align: -3px;
        }
    }
}
.u-reply-text {
    white-space: pre-line;
}
.u-attachements {
    margin-top: 10px;
}
</style>
