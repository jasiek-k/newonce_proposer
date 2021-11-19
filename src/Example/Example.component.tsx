import { useQuery } from "react-query";
import { fetchPosts } from "./Example.service";
import { take } from "lodash";
import { useRecoilValue } from "recoil";
import { textState } from "../TextInputExample/TextInputExample.state";
import TextInput from "../TextInputExample/TextInputExample.component";
const Example = () => {
  const { data, error, isError, isLoading } = useQuery("posts", fetchPosts);
  // first argument is a string to cache and track the query result

  // Wartość z globalnego atomu stanu mozemy wyswietlic w kazdym komponencie
  const textInputValue = useRecoilValue(textState);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error! {(error as any)?.message}</div>;
  }

  return (
    <div>
      <span>{textInputValue}</span>
      <h1>Posts</h1>
      {take(data?.data, 10).map((post, index) => {
        return <li key={index}>{post.title}</li>;
      })}
      <TextInput />
    </div>
  );
};

export default Example;
