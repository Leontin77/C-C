import { useState } from "react";
import { BlogItem } from "../../components/BlogItem/BlogItem";
import { Input } from "../../components/UI/Input/Input";
import { useGetBlogsQuery } from "../../services/blogApi";
import "./Blog.scss";
import { Button } from "../../components/UI/Button/Button";

export const Blog = () => {
  const { data } = useGetBlogsQuery(undefined);
  const [openComments, setOpenComments] = useState(false);

  console.log("dataBBB", data);
  return (
    <section className="blog">
      <h1 className="blog-title">Blog</h1>
      <div className="blog-wrapper">
        <div
          className={`blog-content ${
            openComments ? "blog-content--shrink" : ""
          }`}
        >
          {data?.data?.map((item) => (
            <BlogItem
              key={item.id}
              data={item}
              setOpenComments={setOpenComments}
            />
          ))}
        </div>

        <div
          className={`blog-comment ${
            openComments ? "blog-comment--visible" : ""
          }`}
          style={{ display: openComments ? "block" : "none" }}
        >
          <h4>Please, leave a comment</h4>
          <Input label="Name"/>
          <Input label="Comment"/>
          <Button className="button">Send</Button>
        </div>
      </div>
    </section>
  );
};
