import React, {FC, useEffect, useMemo, useState} from "react";
import getAuthorsRequest from "src/api/authors/getAuthorsRequest";
import getCommentsRequest from "src/api/comments/getCommentsRequest";
import {CommentContext} from "src/context/context";
import {TAuthor} from "src/interfaces/author";
import {TComment} from "src/interfaces/comment";
import like from "../../assets/img/like.svg";
import Comment from "../comment/comment";
import "./comments.sass";

const Comments: FC = () => {
    const [comments, setComments] = useState<TComment[]>([]);
    const [authors, setAutors] = useState<TAuthor[]>([]);
    const [nextPage, setNextPage] = useState<number>(2);

    useEffect(() => {
        getComments();
        getAutors();
    }, []);

    function getComments() {
        getCommentsRequest(1).then((comments) => setComments(comments.data));
    }
    function getAutors() {
        getAuthorsRequest().then((autors) => setAutors(autors));
    }

    function addComments(page: number, attempts: number = 2) {
        getCommentsRequest(page)
            .then((comments) => {
                setComments((prev) => [...prev, ...comments.data]);
                setNextPage(nextPage + 1);
            })
            .catch((res) => {
                if (attempts) {
                    addComments(page, attempts - 1);
                }
            });
    }
    const likes = useMemo(() => {
        let count = 0;
        comments.map((comment) => {
            count += comment.likes;
        });
        return count;
    }, [comments]);

    const sortedComments = useMemo(() => {
        return comments
            .sort(
                (a, b) =>
                    new Date(b.created).getTime() -
                    new Date(a.created).getTime(),
            )
            .filter((comment) => !comment.parent);
    }, [comments]);

    if (comments.length === 0) return null;
    else
        return (
            <CommentContext.Provider value={{authors, comments}}>
                <div className="comments">
                    <div className="comments__block-top">
                        <span>{comments.length} комментариев</span>
                        <span className="comments__block-top-like">
                            <img
                                className="comments__block-top-img"
                                alt=""
                                src={like}
                            ></img>
                            {likes}
                        </span>
                    </div>
                    <div className="comments__block-comments">
                        {sortedComments.map(
                            (comment: TComment, commentIndex) => {
                                return (
                                    <Comment
                                        key={`${commentIndex} ${comment.id}`}
                                        comment={comment}
                                    />
                                );
                            },
                        )}
                    </div>
                    {nextPage !== 4 ? (
                        <button
                            disabled={nextPage === 4}
                            onClick={() => addComments(nextPage)}
                            className="comments__button"
                        >
                            Загрузить еще
                        </button>
                    ) : null}
                </div>
            </CommentContext.Provider>
        );
};
export default Comments;
