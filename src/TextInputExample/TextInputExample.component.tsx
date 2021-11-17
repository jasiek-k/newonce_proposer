import { useRecoilState } from "recoil";
import { textState } from "./TextInputExample.state";

const TextInput = () => {
  // To ma api podobne jak lokalny state ale atom - textState mozemy sobie importować w kazdym komponencie,
  // mamy więc oddzielne od siebie atomy stanu globalnego  
  const [text, setText] = useRecoilState(textState);

  const onChange = (event: any) => {
    setText(event.target.value);
  };

  return (
    <div>
      <input type="text" value={text} onChange={onChange} />
      <br />
      Echo: {text}
    </div>
  );
}
export default TextInput;
