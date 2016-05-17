import NewPost from '../components/newpost';
import { useDeps, composeAll } from 'mantra-core';
import { connect } from 'react-apollo';
const generateMutationObject = (title, content) => {
    return {
        mutation: gql `
    mutation addPost($title: String, $content: String) {
       addPost(title: $title, content: $content)
    }`,
        variables: {
            title,
            content
        }
    };
};
const mapMutationsToProps = () => {
    return {
        addPost: generateMutationObject
    };
};
// const mapDispatchToProps = (dispatch: any, ownProps: any) => {
//   return {
//     create: (title: string, content: string, mutation: any) => {
//         dispatch(ownProps.createAction(title, content, mutation));
//     }
//   };
// };
const mapStateToProps = (state) => {
    return {
        error: state.post.error
    };
};
const mapDepsToProps = (context, actions) => {
    return {
        create: actions.posts.create
    };
};
export default composeAll(connect({ mapMutationsToProps, mapStateToProps }), useDeps(mapDepsToProps))(NewPost);
// export default (NewPost);
