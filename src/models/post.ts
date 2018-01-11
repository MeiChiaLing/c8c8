export interface Post {
  $key?: string,
  title: string;
  username: string;
  time: string;
  content: string;
  image : string;
  workerID : string;
}

//add ? means the key is optional
