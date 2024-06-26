import { gql } from 'graphql-tag'
// import { gql } from '@apollo/client';
export const NEW_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!){
    addUser(username: $username, email: $email, password: $password){
        token
        user {
            id
            username
        }
    }
}
`;

export const LOGIN = gql`
mutation login($username: String!, $password: String!){
    login(username: $username, password: $password){
        token
        user {
            id
            username
        }
    }
}
`;
export const ADD_POST = gql`
mutation addPost($title: String!, $content: String!, $imageSource: String, $userId: ID!){
    addPost(title: $title, content: $content, imageSource: $imageSource, userId: $userId){
        id
        title
        content
        imageSource
        userId
    }
}
`;
export const DELETE_POST = gql`
mutation deletePost($id: ID!, $userId: ID!){
    deletePost(id: $id, userId: $userId){
        success
        message
    }
}
`;

export const EDIT_POST = gql`
mutation editPost($id: ID!, $title: String, $content: String, $imageSource: String, $userId: ID!){
    editPost(id: $id, title: $title, content: $content, imageSource: $imageSource, userId: $userId){
        id
        title
        content
        imageSource
    }
}
`;
export const ADD_COMMENT = gql`
mutation addComment($text: String!, $userId: ID!, $postId: ID!){
    addComment(text: $text,userId: $userId, postId: $postId){
        id
        text
        postId        
    }
}
`;
export const REMOVE_COMMENT  = gql`
mutation removeComment($id: ID!, $userId:ID!){
    removeComment(id:$id, userId:$userId){
        success
        message
    }
}
`;
export const ADD_STORY = gql`
mutation addStory($imageSource: String!, $userId: ID!){
    addStory(imageSource: $imageSource, userId: $userId){
        id
        imageSource
        userId   
    }
}
`;
export const ADD_FOLLOW = gql`
mutation addFollow($followingUserId: ID!, $followedUserId: ID!){
    addFollow(followingUserId: $followingUserId, followedUserId: $followedUserId){
        id
        followingUserId
        followedUserId   
    }
}
`;
export const REMOVE_FOLLOW = gql`
mutation removeFollow($followingUserId: ID!, $id: ID!){
    removeFollow(followingUserId: $followingUserId, id: $id){
        id
        followingUserId,  
    }
}
`;
export const ADD_LIKE = gql`
mutation addLike($status: LikeStatus!, $userId: ID!, $postId: ID!){
    addLike(status: $status, userId: $userId, postId: $postId){
        id
        status
        userId
        postId        
    }
}
`;
export const REMOVE_LIKE = gql`
mutation removeLike( $id: ID!, $userId: ID!){
    removeLike(id: $id, userId: $userId){
        message
    }
}`

export const SEND_MESSAGES = gql`
mutation sendMessage($text: String!, $senderId: ID!, $reciverId: ID!){
    sendMessage(text: $text, senderId: $senderId, reciverId: $reciverId){
            text
            reciverId
    }
}`

export const ADD_Notif=gql`
mutation addNotif($message: String!, $status: NotificationStatus!, $userId: ID! ){
    addNotif(message: $message, status: $status, userId: $userId){
        id
        status
        message
    }
}`;

export const UPLOAD_IMAGE = gql`
mutation UploadImage($image: Upload!){
    uploadImage(image: $image){
        Image
    }
}`
