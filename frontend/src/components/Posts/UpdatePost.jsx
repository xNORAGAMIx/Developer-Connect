import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getPostAPI, updatePostAPI } from "../../APIServices/posts/postsAPI";

const UpdatePost = () => {
  const { id } = useParams();
  // use query
  const { data } = useQuery({
    queryKey: ["post-details"],
    queryFn: () => getPostAPI(id),
  });

  //post mutation
  const postMutation = useMutation({
    mutationKey: ["update-post"],
    mutationFn: updatePostAPI,
  });

  const formik = useFormik({
    initialValues: {
      title: data?.postFound.title || "",
      description: data?.postFound.description || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: (values) => {
      const postData = {
        title: values.title,
        description: values.description,
        id,
      };
      postMutation.mutate(postData);
    },
  });

  //get loading state
  const isLoading = postMutation.isPending;
  //get error state
  const isError = postMutation.isError;
  //get success state
  const isSuccess = postMutation.isSuccess;
  //error
  const error = postMutation.error;

  return (
    <div>
      <h1>{data?.postFound.title}</h1>
      <p>{data?.postFound.description}</p>
      <div>
        {isLoading && <p>Loading...</p>}
        {isSuccess && <p>Post Created Successfully</p>}
        {isError && <p>{error.message}</p>}
        <form onSubmit={formik.handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Enter Title"
            {...formik.getFieldProps("title")}
          />
          {/* Display Error Messages */}
          {formik.touched.title && formik.errors.title && (
            <span>{formik.errors.title}</span>
          )}
          <input
            type="text"
            name="description"
            placeholder="Enter Description"
            {...formik.getFieldProps("description")}
          />
          {/* Display Error Messages */}
          {formik.touched.description && formik.errors.description && (
            <span>{formik.errors.description}</span>
          )}
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePost;
