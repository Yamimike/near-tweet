import { math, base64, logging, context, u128 } from "near-sdk-as";
import { Post, postsForStore, idPostsForShow, setAdmin, getAdmin } from "./model";

const POST_LIMIT = 10;

const POST_SIZE: u32 = 16;

const donationAmount: u128 = u128.from("10000000000000000000000");

/**
 * @dev assigns a new admin
 * @param admin accountId of admin
 */
export function assignAdmin(admin: string): void {
  assert(context.predecessor == context.contractName, "Unauthorized caller");
  setAdmin(admin);
}

export function retrieveAdmin(): string {
  let admin = getAdmin();
  return admin;
}

/**
 * generate id when create new post
 * @returns id string
 */
export function generatePostNumber(): string {
  let buf = math.randomBuffer(POST_SIZE);
  let b64 = base64.encode(buf);
  return b64;
}

/**
 * add new post to storage
 * @param content string content of post
 */
export function addPost(content: string): void {
  assert(content.length > 0, "Empty content for post");
  assert(idPostsForShow.length < 10, "There can only be 10 posts at a time");
  let id = generatePostNumber();
  const message = new Post(content, id);
  postsForStore.set(id, message);
  idPostsForShow.push(id);
}

/**
 * add new comment to post by idPost
 * @param content string content of comment
 * @param idPost id post
 * @returns Post that user comment
 */
export function addComment(content: string, idPost: string): Post {
  let post = checkPost(idPost);
  assert(content.length > 0, "Empty content for comment");
  post.addComment(content);
  postsForStore.set(idPost, post);
  logging.log("Comment success!");
  return post;
}

/**
 * show 10 posts newest
 * @returns array contain 10 posts
 */
export function showAllPosts(): Post[] {
  const numMessages = min(POST_LIMIT, idPostsForShow.length);
  const startIndex = idPostsForShow.length - numMessages;
  const result = new Array<Post>(numMessages);
  for (let i = 0; i < numMessages; i++) {
    let post = postsForStore.get(idPostsForShow[i + startIndex]);
    if (!post) {
      break;
    }
    result[i] = post;
  }
  return result;
}

/**
 * push id user to likes property of Post
 * @param idPost id post
 * @returns Post that user like
 */
export function likePost(idPost: string): Post {
  let post = checkPost(idPost);
  post.like();
  postsForStore.set(idPost, post);
  logging.log("Like success!");
  return post;
}

/**
 * remove id user from likes property of Post
 * @param idPost id post
 * @returns Post that user dislike
 */
export function dislikePost(idPost: string): Post {
  let post = checkPost(idPost);
  post.disLike();
  postsForStore.set(idPost, post);
  logging.log("dislike success!");
  return post;
}

/**
 * clear all post from storage
 */
export function clearAllPosts(): void {
  const admin = getAdmin();
  assert(context.sender.toString() == admin.toString(), "Only admin can clear all posts");
  for (let i = 0; i < idPostsForShow.length; i++) {
    let post = postsForStore.get(idPostsForShow[i]);
    if (!post) {
      break;
    }
    postsForStore.delete(idPostsForShow[i]);
  }

  while (idPostsForShow.length > 0) {
    idPostsForShow.pop();
  }
}

/**
 * @dev allow users to donate 0.1 NEAR  to post's sender
 * @param idPost id post
 * @returns Post that user donate
 */
export function donatePost(idPost: string): Post {
  let post = checkPost(idPost);
  assert(context.attachedDeposit.toString() == donationAmount.toString(), "You can only donate 0.1 NEAR");
  assert(context.sender.toString() != post.sender.toString(),"You can't donate to your own post");
  post.donate();
  postsForStore.set(idPost, post);
  logging.log("Donate success!");
  return post;
}

/**
 * check post exist by id
 * @param idPost id post
 * @returns Post
 */
export function checkPost(idPost: string): Post {
  let post = postsForStore.get(idPost);
  if (!post) {
    logging.log("Post not found!");
    throw null;
  }
  return post;
}
