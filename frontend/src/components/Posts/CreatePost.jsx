import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { createPostAPI } from "../../APIServices/posts/postsAPI";
import { useState } from "react";

const CreatePost = () => {
  //state for wysiwyg
  // eslint-disable-next-line no-unused-vars
  const [description, setDescription] = useState("");
  //post mutation
  const postMutation = useMutation({
    mutationKey: ["create-post"],
    mutationFn: createPostAPI,
  });

  const formik = useFormik({
    initialValues: {
      description: "",
    },
    validationSchema: Yup.object({
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      const postData = {
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
        <ReactQuill
          value={formik.values.description}
          onChange={(value) => {
            setDescription(value);
            formik.setFieldValue("description", value);
          }}
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
