import { Meteor } from 'meteor/meteor';
import { Posts, Comments } from '../collections';
import * as Schema from './schema';

var bound = Meteor.bindEnvironment(function(callback) {
  callback()
});

const resolvers = {
  Query: {
    async posts(root, args) {
      return Posts.find({}).fetch();
    },
    async post(root, { id }) {
      return Posts.findOne(id);
    },
    async comments(root, { postId }) {
      return Comments.find({ postId }).fetch();
    },
  },
  Mutation: {
    async addPost(root, { title, content }) {
      const post = Posts.insert({ title, content });
      return [post];
    },
    async addComment(root: any, { postId, comment }: Schema.AddCommentParams) {
      const id = Comments.insert({ postId: postId, text: comment, createdAt: new Date().getTime() });
      return Posts.findOne(id);
    }
  }
};

export default resolvers;
