<template>
    <div class="c-comment-cmt">
        <div>
            <el-link
                class="u-name"
                type="primary"
                target="_blank"
                :href="userHref"
                >{{ username || "人字榜800线无名小侠" }}</el-link
            >
            <span class="u-mark u-top" v-if="item.is_top"
                ><i class="Download"></i>置顶</span
            >
            <span class="u-mark u-star" v-if="item.is_star"
                ><i class="Star"></i>精华</span
            >
        </div>
        <CommentContent
            :date="item.commentDate"
            :content="item.content"
            :comment-id="item.id"
            :attachments="stringToArray(item.attachments)"
            :can-delete="power.allow || power.uid == item.userId"
            :can-set-top="power.is_author && !item.is_top"
            :can-cancel-top="power.is_author && item.is_top"
            :can-set-star="!item.is_star && power.group >= 64"
            :can-cancel-star="item.is_star && power.group >= 64"
            @addNewReply="addNewReply"
            @deleteComment="deleteComment"
            @setTopComment="setTopComment"
            @setStarComment="setStarComment"
        />
        <ReplyList
            :data="replyList"
            :pager="pager"
            :power="power"
            @addNewReply="addNewReply"
            @deleteReply="deleteReply"
            @goto="gotoReplyListIndex"
            @resetReply="resetReply"
        />
    </div>
</template>

<script>
import CommentContent from "./CommentContent.vue";
import ReplyList from "./ReplyList.vue";
import { POST, DELETE, GET } from "../../service/comment";
export default {
    props: ["item", "baseApi", "power", "user-href", "username"],
    components: {
        CommentContent,
        ReplyList
    },
    emits: [
        "deleteComment",
        "setTopComment",
        "setStarComment",
        "addNewReply",
        "deleteReply",
        "goto",
        "resetReply"
    ],
    data: function() {
        return {
            replyList: [],
            pager: {
                index: 1,
                pageSize: 10,
                pageTotal: 1,
                total: 0
            },

        };
    },
    created() {
        this.replyList = this.item.reply || [];
    },
    methods: {
        stringToArray: function(str) {
            if (!str) {
                return [];
            }
            return JSON.parse(str);
        },
        deleteComment() {
            this.$emit("deleteComment", this.item.id);
        },
        setTopComment(setTop) {
            this.$emit("setTopComment", this.item.id, setTop);
        },
        setStarComment(setStar) {
            this.$emit("setStarComment", this.item.id, setStar);
        },
        addNewReply(data) {
            POST(`${this.baseApi}/comment/${this.item.id}/reply`, null, data)
                .then(() => {
                    this.$notify({
                        title: "",
                        message: "评论成功!",
                        type: "success",
                        duration: 3000,
                        position: "bottom-right"
                    });

                    this.loadReplyList(this.pager.index);
                })
                .catch(() => {});
        },
        deleteReply(id) {
            DELETE(`${this.baseApi}/comment/${id}`)
                .then(() => {
                    this.$notify({
                        title: "",
                        message: "删除成功!",
                        type: "success",
                        duration: 3000,
                        position: "bottom-right"
                    });
                    this.loadReplyList(this.pager.index);
                })
                .catch(() => {});
        },
        gotoReplyListIndex(index) {
            this.loadReplyList(index, 6);
        },
        loadReplyList(index, pageSize) {
            GET(
                `${this.baseApi}/comment/${this.item.id}/reply/page/${index}?pageSize=${pageSize}`
            )
                .then(resp => {
                    if (index == 1 && pageSize == 3) {
                        // eslint-disable-next-line vue/no-mutating-props
                        this.item.reply = resp.data || [];
                    }
                    this.replyList = resp.data || [];
                    this.pager = resp.page;
                })
                .catch(() => {});
        },
        resetReply() {
            this.loadReplyList(1, 3);
        }
    }
};
</script>

<style lang="less">
.c-comment-cmt {
    .u-mark {
        font-style: normal;
        font-size: 12px;
        padding: 1px 5px 2px 5px;
        border-radius: 2px;
        color: #fff;
        margin-left: 5px;
        cursor: default;
    }
    .u-top {
        background-color: #6f42c1;
        i{
            transform: rotate(180deg);
        }
    }
    .u-star {
        background-color: #f39;
        i {
            margin-right: 2px;
        }
    }
}
</style>
