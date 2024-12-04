import { useQuery, useMutation } from "@tanstack/react-query";
import { deletePostAPI, listPostsAPI } from "../../APIServices/posts/postsAPI";
import { Link } from "react-router-dom";

const ListPosts = () => {
  // use query
  const { isError, isLoading, isSuccess, data, error, refetch } = useQuery({
    queryKey: ["list-posts"],
    queryFn: listPostsAPI,
  });

  const postMutation = useMutation({
    mutationKey: ["delete-post"],
    mutationFn: deletePostAPI,
  });

  const deleteHandler = async (postId) => {
    postMutation
      .mutateAsync(postId)
      .then(() => {
        refetch();
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isSuccess && (
        <p className="text-green-500">Posts fetched successfully</p>
      )}
      {isError && <p>{error.message}</p>}

      {data?.posts.map((post) => {
        return (
          <div key={post?._id}>
            <h2 className="font-extrabold">{post?.title}</h2>
            <p>{post?.description}</p>
            <Link className="border-2" to={`/posts/${post?._id}`}>
              Edit
            </Link>
            <button onClick={() => deleteHandler(post?._id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
};

export default ListPosts;
