import React from 'react';
import CommentList from '../../comments/containers/comment_list';

import { IPosts } from '../../../../lib/collections';

export interface IComponentProps {
  post?: IPosts;
}

const Post = ({post}: IComponentProps) => (
  <div>
    Loaded
  </div>
);

export default Post;

// {post.saving ? <p>Saving...</p> : null}
// <h2>{post.title}</h2>
// <p>
//   {post.content}
// </p>
// <div>
//   <h4>Comments</h4>
//   <CommentList postId={post._id}/>
// </div>
