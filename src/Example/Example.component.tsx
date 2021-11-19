import { useQuery } from "react-query"
import { fetchPosts } from "./Example.service";
import { take } from 'lodash';
import { useRecoilValue } from "recoil";
import { textState } from "../TextInputExample/TextInputExample.state";
import TextInput from "../TextInputExample/TextInputExample.component";
import { useEffect } from "react";
import ApiService from "../ApiService";
const Example = () => {
  const { data, error, isError, isLoading } = useQuery('posts', fetchPosts)
  // first argument is a string to cache and track the query result


  // Wartość z globalnego atomu stanu mozemy wyswietlic w kazdym komponencie
  const textInputValue = useRecoilValue(textState);

  useEffect(() => {
    const init = async () => {
      const response = await ApiService.get('https://accounts.spotify.com/authorize?response_type=code&client_id=5ea0d92a89814ca5a12905c432554723&scope=playlist-modify-private&redirect_uri=localhost:3000')
      console.log(response);
    }
    init();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error! {(error as any)?.message}</div>
  }

  return (
    <div>
      <span>{textInputValue}</span>
      <h1>Posts</h1>
      {
        take(data?.data, 10).map((post, index) => {
          return <li key={index}>{post.title}</li>
        })
      }
      <TextInput />
    </div>
  )
}

export default Example;