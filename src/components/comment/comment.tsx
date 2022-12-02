import React, {FC, useContext, useState} from "react";
import "./comment.sass";
import {TComment} from "src/interfaces/comment";
import {CommentContext} from "src/context/context";
import {getDate} from "src/utils";
import LikeRed from "src/assets/img/like-red";
type TProps = {
    comment: TComment;
};
const Comment: FC<TProps> = ({comment}: TProps) => {
    const {authors, comments} = useContext(CommentContext);
    const [stroke, setStroke] = useState<string>("none");
    const [likeCount, setLikeCount] = useState<number>(0);
    const author = authors.find((el) => el.id === comment.author);
    const subComments = comments.filter((el) => el.parent === comment.id);

    return (
        <div className="comment__container">
            <div className="comment">
                <div className="comment__avatar-block">
                    <img
                        className="comment__avatar"
                        src={author?.avatar}
                        alt=""
                    />
                </div>
                <div className="comment__description">
                    <p className="comment__description-name">
                        {author?.name}
                        <span className="comment__block-like">
                            <div
                                onClick={() => {
                                    if (likeCount === 0) {
                                        setStroke("url(#paint1_linear_304_2)");
                                        setLikeCount(1);
                                    } else {
                                        setStroke("none");
                                        setLikeCount(0);
                                    }
                                }}
                                className="comments__block-top-img"
                            >
                                <LikeRed stroke={stroke} />
                            </div>
                            {comment.likes + likeCount}
                        </span>
                    </p>
                    <p className="comment__description-date">
                        {getDate(comment.created)}
                    </p>
                    <p className="comment__description-text">{comment.text}</p>
                </div>
            </div>
            {!!subComments.length && (
                <div className="comment__subs">
                    {subComments.map((subComment, index) => (
                        <Comment
                            key={`${index}${subComment.id}`}
                            comment={subComment}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
export default Comment;
