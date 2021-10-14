import {
  array,
  boolean,
  date,
  list,
  Null,
  number,
  optional,
  scanner,
  string,
  union,
} from "..";
import { instanceOf } from "../fields";

describe("scan test", () => {
  const Lang = {
    ja: "ja",
    en: "en",
  } as const;

  type Lang = typeof Lang[keyof typeof Lang];
  const langList = Object.values(Lang);

  class Timestamp {
    constructor(public seconds: number, public nanoseconds: number) {}
  }

  type Post = {
    id: number;
    title: string;
    body: string;
    lang: Lang;
    isPublic: boolean;
    createdAt: Date;
    tags?: string[] | null;
    foo: string | number;
    timestamp: Timestamp;
  };

  type User = {
    name: string;
    age: number;
    iconImage?: string;
    email?: string | null;
    lang: Lang;
    likes: string[];
    posts: Post[] | null;
  };

  const isPost = scanner<Post>({
    id: number,
    title: string,
    body: string,
    lang: list(langList),
    isPublic: boolean,
    createdAt: date,
    tags: optional(array(string), Null),
    foo: union<string | number>(string, number),
    timestamp: instanceOf(Timestamp),
  });

  const isUser = scanner<User>({
    name: string,
    age: number,
    iconImage: optional(string),
    email: optional(string, Null),
    lang: list(langList),
    likes: array(string),
    posts: union(array(isPost), Null),
  });

  const isPosts = array(isPost);
  const isUsers = array(isUser);

  const correctPost = {
    id: 1,
    title: "title",
    body: "body",
    lang: "ja",
    isPublic: true,
    createdAt: new Date(),
    tags: ["tag1", "tag2"],
    foo: "foo",
    timestamp: new Timestamp(1, 2),
  } as unknown;

  const correctUser = {
    name: "name",
    age: 20,
    iconImage: "image",
    email: "email",
    lang: "ja",
    likes: ["like1", "like2"],
    posts: null,
  };

  it("to be true", () => {
    // set post
    const post2 = (): Post => {
      const post = correctPost as Post;
      post.foo = 100;
      return post;
    };
    const postList = [correctPost, post2()] as unknown;

    expect(isPosts(postList)).toBe(true);

    // set user
    const user2 = (): User => {
      const user = correctUser as User;
      delete user.email;
      user.posts = postList as Post[];
      return user;
    };
    const user3 = (): User => {
      const user = correctUser as User;
      user.likes = [];
      user.lang = "en";
      return user;
    };
    const userList = [correctUser, user2(), user3()] as unknown;

    expect(isUsers(userList)).toBe(true);
  });

  describe("to be false", () => {
    // to be false
    const post1 = (): Post => {
      const post = correctPost as any;
      delete post.foo;
      return post;
    };
    // to be false
    const post2 = (): Post => {
      const post = correctPost as any;
      post.tags = null;
      return post;
    };

    // to be ture
    const post3 = correctPost;

    it("is post", () => {
      expect(isPost(post1)).toBe(false);
      expect(isPost(post2)).toBe(false);
      expect(isPost(post3)).toBe(true);
    });
    it("is posts (include the correct type)", () => {
      expect(isPosts([post1, post2, post3])).toBe(false);
    });

    // to be false
    const user1 = {
      name: "user1",
      age: 20,
    };

    // to be true
    const user2 = correctUser;

    it("is user", () => {
      expect(isUser(user1)).toBe(false);
      expect(isUser(user2)).toBe(true);
    });

    it("is users (inclued the correct type)", () => {
      expect(isUsers([user1, user2])).toBe(false);
    });
  });
});
