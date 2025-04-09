import './BlogDetails.scss';
import { Link, useParams } from 'react-router-dom';
import { useGetBlogsQuery } from "../../services/blogApi";
import { ROUTES } from '../../shared/const/router';

export const BlogDetails = () => {
  const { id } = useParams();
  const { data } = useGetBlogsQuery(undefined);

  const blog = data?.data?.find(item => item.id === Number(id));

  console.log('asdasd', blog);

//   if (!blog) return <div>Loading...</div>;

  return (
    <div className='blogDetails'>
      <Link to={ROUTES.BLOG}>back</Link>
      <h2 className='blogDetails-title'>{blog.title}</h2>
      <p className='blogDetails-date'>{blog.date}</p>
      {/* <img
        src={`http://localhost:1337${blog.img[0]?.url}`}
        alt={blog.title}
        className='blogDetails-img'
      /> */}
      <div className='blogDetails-description'>{blog.description}</div>
    </div>
  );
};
