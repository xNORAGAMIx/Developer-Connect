import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import ReactQuill from "react-quill";
import { createPostAPI } from "../../APIServices/posts/postsAPI";

const CreatePost = () => {
  //post mutation
  const postMutation = useMutation({
    mutationKey: ["create-post"],
    mutationFn: createPostAPI,
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      const postData = {
        title: values.title,
        description: values.description,
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
  const errorMessage = postMutation?.error?.response?.data?.message;

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isSuccess && <p>Post Created Successfully</p>}
      {isError && <p>{errorMessage}</p>}
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
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreatePost;
