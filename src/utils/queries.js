import gql from 'graphql-tag'
export const QUERY_POSTS = gql`
query getPosts{
    posts{
        id,
        title,
        content,
        imageSource,
        userId,
        comments {
            text,
            userId,
            postId
        },
        likes{
            status,
            userId,
            postId
        }
    }
}
`;
export const QUERY_SINGLE_POST = gql`
query getPost($id: ID!) {
    post(id: $id) {
        id,
        title,
        content,
        imageSource,
        userId
        comments {
            text
        }
        likes {
            status
        }
    }
}
`;
export const QUERY_USER = gql`
query getUser($id: ID!) {
    user(id: $id) {
        id,
        username,
        password,
        email
    }
}
`;
export const QUERY_LOOGEDIN = gql`
query loggedin($token: ID!){
    loggedin(token: $token){
        user
    }
}`

export const QUERY_USERS = gql`
query getUsers {
    users {
        id,
        username,
        password,
        email
    }
}
`;
export const QUERY_USER_POSTS = gql`
query getUserPosts($userId: ID!) {
    userPosts(userId: $userId) {
        id,
        title,
        content,
        imageSource,
    }
}
`;

export const QUERY_USER_STORY = gql`
query getUserStory($userId : ID!) {
    userStory(userId : $userId) {
        imageSource,
        userId
    }
}
`;

export const QUERY_USER_FOLLOWERS= gql`
query getUserFollowers($userId : ID!) {
    userFollowers(userId: $userId) {
        username
    }
}
`;
export const QUERY_USER_FOLLOWING= gql`
query getUserFollowing($userId : ID!) {
    userFollowing(userId: $userId) {
        username
    }
}
`;

export const QUERY_USER_SEARCH = gql`
query getSearchUser($username: String!) {
    searchUsers(username: $username){
        username
        id
    }
}`
export const QUERY_LIKES = gql`
query likes($postId: ID!){
    likes(postId: $postId){
       likes{
        id,
        userId,
        status
       }
    }
}
`;

export const QUERY_MESSAGES = gql`
query messages($senderId: ID!){
    messages(senderId: $senderId){
       messages{
        id,
        text,
        senderId,
        reciverId
       }
    }
}
`;