import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPostAPI } from "../../APIServices/posts/postsAPI";

const PostDetails = () => {
  const { id } = useParams();
  // use query
  const { data } = useQuery({
    queryKey: ["post-details"],
    queryFn: () => getPostAPI(id),
  });
  return (
    <div>
      <h1>{data?.postFound.title}</h1>
      <p>{data?.postFound.description}</p>
    </div>
  );
};

export default PostDetails;
