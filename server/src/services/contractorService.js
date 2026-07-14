export const submitApplication = (
  data
) => {
  return api.put(
    "/contractor/submit-application",
    data
  );
};