import ApiService from "../ApiService";
import { Post } from "./Example.types"

export const fetchPosts = async () => {
  const data = await ApiService.get<Post[]>('https://jsonplaceholder.typicode.com/posts')
  return data;
}
