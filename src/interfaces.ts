export interface SocialNetworkState {
  theme: "light" | "dark";
  posts: Post[];
  commentState: { id: number; active: boolean }[];
}

export interface CommentPayload {
  id: number
}

export interface Post {
  title: string;
  body: string;
  userId: number;
  reactions: { likes: number; dislikes: number };
  views: number;
  id: number;
}

export interface UserInterface {
  id: number;
  data: { posts: [] };
  firstName: string;
  lastName: string;
  address: {
    address: string;
    city: string;
    coordinates: { lat: number; lng: number };
    country: string;
    postalCode: string;
    state: string;
    stateCode: string;
  };
  age: number;
  birthdate: number;
  company: {
    department: string;
    name: string;
    title: string;
  };
  university: string;
}

export interface Comment {
  body: string;
}
