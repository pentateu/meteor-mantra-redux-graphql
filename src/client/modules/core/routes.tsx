import React from 'react';
import {mount} from 'react-mounter';
import { AppContainer } from 'react-hot-loader';

// import MainLayout from './components/main_layout';
// import PostList from './containers/postlist';
// import Post from './containers/post';
// import NewPost from './containers/newpost';

// Optional, but helpful
import Redbox from 'redbox-react';
const consoleErrorReporter = ({error}: any) => {
  /*eslint no-console: ["error", { allow: ["error"] }] */
  console.error(error);
  return <Redbox error={error} />;
};
consoleErrorReporter['propTypes'] = {
  error: React.PropTypes.instanceOf(Error).isRequired
};

// So we can call FlowRotuer again later during hot reload
let localFlowRouter: any;

export default function (injectDeps: any, {FlowRouter}: IContext) {
  // MainLayoutCtx = injectDeps(MainLayout);
  localFlowRouter = FlowRouter;

  const MainLayoutCtx = function(props: any) {
    const MainLayout = require('./components/main_layout').default;
    const MainLayoutCtx = injectDeps(MainLayout);
    return (
      <AppContainer errorReporter={consoleErrorReporter}>
        <MainLayoutCtx {...props} />
      </AppContainer>
    );
  };

  FlowRouter.route('/', {
    name: 'posts.list',
    action() {
      const PostList = require('./containers/postlist').default;
      mount(MainLayoutCtx, {
        content: () => (<PostList />)
      });
    }
  });

  interface IPostRoute {
    postId: string;
  }

  FlowRouter.route('/post/:postId', {
    name: 'posts.single',
    action({postId}: IPostRoute) {
      const Post = require('./containers/post').default;
      mount(MainLayoutCtx, {
        content: () => (<Post postId={postId}/>)
      });
    }
  });

  FlowRouter.route('/new-post', {
    name: 'newpost',
    action() {
      const NewPost = require('./containers/newpost').default;
      mount(MainLayoutCtx, {
        content: () => (<NewPost/>)
      });
    }
  });
}

if (module['hot']) {
  module['hot'].accept([
    './components/main_layout',
    './containers/postlist',
    './containers/post',
    './containers/newpost',
  ], function () {
    // If any of the above files (or their dependencies) are updated, all we
    // really need to do is re-run the current route's action() method, which
    // will require() the updated modules and re-mount MainLayoutCtx
    // (which itself require()'s the updated MainLayout at render time).
    localFlowRouter._current.route._action(localFlowRouter._current.params);
  });
}
