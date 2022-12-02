import {createContext} from "react";
import {TAuthor} from "src/interfaces/author";
import {TComment} from "src/interfaces/comment";

type TConxtext = {
    authors: TAuthor[];
    comments: TComment[];
};

export const CommentContext = createContext<TConxtext>({
    authors: [],
    comments: [],
});
