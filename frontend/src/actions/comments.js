import axios from 'axios';

export const FETCH_COMMENTS = 'FETCH_COMMENTS';

export function fetchComments(post) {
  return (dispatch) => {
      axios.get(`/posts/${post}/comments`)
        .then((res) => {
          const payload = res.data.reduce((cur, comment) => {
            if (!comment.deleted) {
              cur[comment.id] = comment;
            }            

            return cur;
          }, {});

          dispatch({
            type: FETCH_COMMENTS,
            payload,
          });
        });
  };
}
