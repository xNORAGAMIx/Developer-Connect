/* eslint-disable no-unused-vars */

// Packages
import { useQuery, useMutation } from "@tanstack/react-query";
import { deletePostAPI, listPostsAPI } from "../../APIServices/posts/postsAPI";
import { Link } from "react-router-dom";
import { useState } from "react";
//Icons
import { FaSearch } from "react-icons/fa";
import { MdClear } from "react-icons/md";
//API
import { fetchCategoriesAPI } from "../../APIServices/categories/categoryAPI";
//Components
import NoDataFound from "../Alert/NoDataFound";
import AlertMessage from "../Alert/AlertMessage";
import PostCategory from "../Category/PostCategory";

const ListPosts = () => {
  //Filtering states and pagination
  const [filters, setFilters] = useState({});
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Fetch Catgeories using useQuery
  const { data: categories } = useQuery({
    queryKey: ["category-list"],
    queryFn: fetchCategoriesAPI,
  });

  // Fetch Posts using useQuery
  const { isError, isLoading, isSuccess, data, error, refetch } = useQuery({
    queryKey: ["list-posts", { ...filters, page }],
    queryFn: () =>
      listPostsAPI({ ...filters, description: search, page, limit: 10 }),
  });

  // Category Filter handler
  const categoryFilterHandler = (category) => {
    setFilters({ ...filters, category: category });
    setPage(1);
    refetch();
  };

  // Search Handler
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // Search Submit Handler
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    setFilters({ ...filters, description: search });
    setPage(1);
    refetch();
  };

  // Clear Filters Handler
  const clearFiltersHandler = () => {
    setFilters({});
    setSearch("");
    setPage(1);
    refetch();
  };

  // Pagination Handler
  const paginationHandler = (pageNumber) => {
    setPage(pageNumber);
    refetch();
  };

  // Delete Post using useMutation
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

  return (
    <section className="overflow-hidden">
      <div className="container px-4 mx-auto">
        <h1 className="text-4xl lg:text-6xl font-bold mb-6 mt-16">Blog</h1>

        {/*  featured posts */}
        <h2 className="text-4xl font-bold mb-10">Latest Articles</h2>
        {/* Seraching feature */}
        <form
          onSubmit={searchSubmitHandler}
          className="flex flex-col md:flex-row items-center gap-2 mb-4"
        >
          <div className="flex-grow flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={handleSearch}
              className="flex-grow p-2 text-sm focus:outline-none"
            />
            <button
              type="submit"
              className="p-2 text-white bg-orange-500 hover:bg-blue rounded-r-lg"
            >
              <FaSearch className="h-5 w-5" />
            </button>
          </div>
          <button
            onClick={clearFiltersHandler}
            className="p-2 text-sm text-orange-500 border border-blue-500 rounded-lg hover:bg-blue-100 flex items-center gap-1"
          >
            <MdClear className="h-4 w-4" />
            Clear Filters
          </button>
        </form>
        {/* Post Categories */}
        <PostCategory
          categories={categories?.categories}
          onCategorySelect={categoryFilterHandler}
          onClearFilters={clearFiltersHandler}
        />
        {/* No Data Found */}
        {data?.posts?.length <= 0 && <NoDataFound text="No post found" />}
        {/* Error */}
        {isError && <AlertMessage type="error" message="Something happened" />}
        {/* Loading */}
        {isLoading && (
          <AlertMessage type="loading" message="Loading please wait" />
        )}
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
      {/* Pagination */}
      <div>
        {page > 1 && (
          <button onClick={() => paginationHandler(page - 1)}>Previous</button>
        )}
        <span>
          Page {page} of {data?.totalPages}
        </span>
        {page < data?.totalPages && (
          <button onClick={() => paginationHandler(page + 1)}>Next</button>
        )}
      </div>
    </section>
  );
};

export default ListPosts;
