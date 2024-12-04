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

  // //get loading state
  // const isLoading = postMutation.isPending;
  // //get error state
  // const isError = postMutation.isError;
  // //get success state
  // const isSuccess = postMutation.isSuccess;
  // //error
  // const errorMessage = postMutation?.error?.response?.data?.message;

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 m-4">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Add New Post
        </h2>
        {/* show alert */}

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Description Input - Using ReactQuill for rich text editing */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <ReactQuill
              value={formik.values.description}
              onChange={(value) => {
                setDescription(value);
                formik.setFieldValue("description", value);
              }}
            />
            {/* display err msg */}
            {formik.touched.description && formik.errors.description && (
              <span style={{ color: "red" }}>{formik.errors.description}</span>
            )}
          </div>

          {/* Category Input - Dropdown for selecting post category */}
          

          {/* Image Upload Input - File input for uploading images */}
         

          {/* Submit Button - Button to submit the form */}
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-orange-500 hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
