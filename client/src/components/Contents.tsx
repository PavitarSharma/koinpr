import useContents from "../hooks/useContents";
import { IContent } from "../types";
import Content from "./Content";

const Contents = () => {
  const {
    data: contents,
  } = useContents();

  return <div className="flex-1 grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
    {
      contents?.data?.length > 0 ? contents?.data && contents?.data?.map((content: IContent, index: number) => (
        <Content key={index} data={content} />
      )) : ""
    }
  </div>;
};

export default Contents;
