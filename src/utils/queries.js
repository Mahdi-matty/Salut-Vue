import { gql } from '@apollo/client';

export const QUERY_POSTS = gql`
query getPosts{
    posts{
        id,
        title,
        content,
        imageSource,
        userId
    }
}
`;
export const QUERY_PRODUCT = gql`
query getPost {
    post {
        id,
        title,
        content,
        imageSource,
        userId
    }
}`