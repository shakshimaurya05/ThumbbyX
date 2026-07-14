import api from "./api";

export const loginUser = (data) =>
  api.post("/auth/login", data);

export const registerCustomer = (data) =>
  api.post(
    "/auth/register/customer",
    data
  );

export const registerContractor = (data) =>
  api.post(
    "/auth/register/contractor",
    data
  );

export const getCurrentUser = () =>
  api.get("/auth/me");

export const forgotPassword = (email) =>
  api.post("/auth/forgot-password", {
    email,
  });

export const submitApplication = (
  data
) => {
  return api.put(
    "/contractor/submit-application",
    data
  );
};  
export const uploadDocuments =
  (formData) => {
    return api.put(
      "/contractor/upload-documents",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );
  };