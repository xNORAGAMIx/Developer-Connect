/* eslint-disable no-unused-vars */
import { useQuery, useMutation } from "@tanstack/react-query";
import { deletePostAPI, listPostsAPI } from "../../APIServices/posts/postsAPI";
import { Link } from "react-router-dom";
import NoDataFound from "../Alert/NoDataFound";
import AlertMessage from "../Alert/AlertMessage";
import PostCategory from "../Category/PostCategory";
import { fetchCategoriesAPI } from "../../APIServices/categories/categoryAPI";

const ListPosts = () => {
  const { data: categories } = useQuery({
    queryKey: ["category-list"],
    queryFn: fetchCategoriesAPI,
  });

  // use query
  const { isError, isLoading, isSuccess, data, error, refetch } = useQuery({
    queryKey: ["list-posts"],
    queryFn: listPostsAPI,
  });

  const postMutation = useMutation({
    mutationKey: ["delete-post"],
    mutationFn: deletePostAPI,
  });

  //delete handler
  // const deleteHandler = async (postId) => {
  //   postMutation
  //     .mutateAsync(postId)
  //     .then(() => {
  //       refetch();
  //     })
  //     .catch((e) => console.log(e));
  // };

  //Show messages to the user
  // is Loading
  if (isLoading)
    return <AlertMessage type="loading" message="Loading please wait" />;

  // is Error
  if (isError)
    return <AlertMessage type="error" message="Something happened" />;

  // no posts
  if (data?.posts?.length <= 0) return <NoDataFound text="No post found" />;

  return (
    <section className="overflow-hidden">
      <div className="container px-4 mx-auto">
        <h1 className="text-4xl lg:text-6xl font-bold mb-6 mt-16">Blog</h1>

        {/*  featured posts */}
        <h2 className="text-4xl font-bold mb-10">Latest Articles</h2>

        {/* Post Categories */}
        <PostCategory
          categories={categories?.categories}
        />
        <div className="flex flex-wrap mb-32 -mx-4">
          {/* Posts */}
          {/* Posts */}
          {data?.posts?.map((post) => (
            <div key={post._id} className="w-full md:w-1/2 lg:w-1/3 p-4">
              <Link to={`/posts/${post._id}`}>
                <div className="bg-white border border-gray-100 hover:border-orange-500 transition duration-200 rounded-2xl h-full p-3">
                  <div className="relative" style={{ height: 240 }}>
                    <div className="absolute top-0 left-0 z-10"></div>
                    <div className="absolute bottom-0 right-0 z-10"></div>
                    <img
                      className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                      src={post?.image?.path}
                      alt={post?.description}
                    />
                  </div>
                  <div className="pt-6 pb-3 px-4">
                    <div
                      className="rendered-html-content mb-2"
                      dangerouslySetInnerHTML={{
                        __html: post?.description,
                      }}
                    />
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="text-gray-500 text-sm">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={4}
                        height={4}
                        viewBox="0 0 4 4"
                        fill="none"
                      >
                        <circle cx={2} cy={2} r={2} fill="#B8B8B8" />
                      </svg>
                      <div className="py-1 px-2 rounded-md border border-gray-100 text-xs font-medium text-gray-700 inline-block">
                        {post?.category?.categoryName}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ListPosts;
