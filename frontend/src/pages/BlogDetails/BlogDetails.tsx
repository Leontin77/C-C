import "./BlogDetails.scss";
import { Link, useParams } from "react-router-dom";
import { useGetBlogsQuery } from "../../services/blogApi";
import { ROUTES } from "../../shared/const/router";
import { IoChevronBackOutline } from "react-icons/io5";
import { BASE_URL } from "../../shared/const/url";

export const BlogDetails = () => {
  const { id } = useParams();
  const { data } = useGetBlogsQuery(undefined);

  const blog = data?.data?.find((item) => item.id === Number(id));

  return (
    <div className="blogDetails">
      <Link className="blogDetails-back" to={ROUTES.BLOG}>
        <IoChevronBackOutline />
        <span>Back</span>
      </Link>
      <h2 className="blogDetails-title">{blog.title}</h2>
      <p className="blogDetails-date">{blog.date}</p>
      <div className="blogDetails-description">
        {blog.description.split(/\n{2,}/).map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>
      <div className="blogDetails-img">
        <img
          src={`${BASE_URL}${blog.contentMedia[0]?.formats?.medium?.url}`}
          alt={blog.title}
        />
      </div>
    </div>
  );
};
