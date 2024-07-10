"use client";
import { Input } from "@nextui-org/input";
import { cluster } from "radash";
import { useEffect, useState } from "react";

const RenderElementForLearnNonObserver = ({
  contents,
}: {
  contents: any[];
}) => {
  return (
    // @ts-ignore
    <div className="relative flex justify-center bg-gray-200 opacity-90 w-full h-[600px] sm:w-[375px]">
      <div className="z-40 flex flex-col justify-around w-full p-8">
      {contents.map((item, index) => {
          return (
            <div key={index} className={"mt-4 border-2 flex flex-col"}>
              <div className={"text-xl flex"}>{item.title}</div>
              <div className={"mt-2 flex rounded"}>{item.content}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// @ts-ignore
export default function Page() {
  const params = {
    word: "english",
  };
  const [word, setWord] = useState(params.word);
  const [data, setData] = useState({
    word: "block",
    contents: [
      {
        title: " 分析词义",
        content:
          '"Block" 是一个常见的英文单词，它既可以用作名词也可以用作动词。当作名词使用时，"block" 的意思为"块，区，大厦" 等，如 "a block of wood"（一块木头）。当作动词使用时，"block" 的意思为"阻碍，挡住" 等，如 "block the way"（阻挡道路）。',
      },
      {
        title: " 列举例句",
        content:
          "1.  They built a large office block in the city centre. (他们在市中心建造了一个大型办公楼。)\n2.  She blocked my view of the stage. (她挡住了我看台的视线。)\n3.  We need to block out the noise from the street. (我们需要阻挡街头的噪音。)",
      },
      {
        title: " 词根分析",
        content:
          '“Block”的词源来自中古英语"blok"，意为树桩，而中古英语这个词可能源于法文的"bloc"。',
      },
      {
        title: " 词缀分析",
        content:
          "“Block”本身就是一个根词，它没有前缀和后缀。但是我们可以通过添加一些常见的前缀和后缀来创造新的单词，如 unblock（解除阻碍）和 blocking（阻止中）。",
      },
      {
        title: " 发展历史和文化背景",
        content:
          "“Block”是英语中的一个基本单词，其词义逐渐从“一大块”或“充实的东西”发展为当前的各种含义，并已经被广泛使用。",
      },
      {
        title: " 单词变形",
        content:
          "*   名词复数：blocks\n*   一般现在时第三人称单数：blocks\n*   现在分词：blocking\n*   过去式：blocked\n*   过去分词：blocked",
      },
      {
        title: " 记忆辅助",
        content:
          '你可以用以下关联法来记住"block"：想象一个大型的木块阻塞在你的路上，这会帮助你更好的记住"block"表示阻塞的含义。',
      },
      {
        title: " 小故事",
        content:
          "Once upon a time, a big wooden block blocked the path in the magic forest. The animals were distressed, but then, the clever beaver arrived. She took the block and used it to build a beautiful house, this way she removed the block and solved the problem.",
      },
    ],
  });

  async function getWord(word: string) {
    fetch(`/api/words?word=${word}`).then((res) =>
      res.json().then((data) => {
        if (!data.data) {
          return;
        }
        setData(data.data);
      })
    );
  }

  useEffect(() => {
    void getWord(word);
  }, [word]);

  const blocks = cluster(data.contents, 3);

  return (
    <section>
      <div>
        <Input value={word} onChange={
          (e) => setWord(e.target.value)
        } />
        <div className="font-sans text-3xl font-bold opacity-0 sm:opacity-100">{word}</div>
        <div className="flex flex-col justify-between gap-2 mt-4 rounded-md sm:flex-row sm:flex-wrap md:border-2 md:border-black sm:justify-center sm:m-4 sm:p-4">
          {blocks.map((block, index) => {
            return (
              <RenderElementForLearnNonObserver key={index} contents={block} />
            );
          })}
        </div>
      </div>
    </section>
  );
}
