/**
 * URL builders for the freelancer-only app (no /freelancer prefix).
 */
export const routes = {
  home: () => "/",
  logIn: () => "/log-in",
  signUp: () => "/sign-up",
  dashboard: (freelancerId: string) => `/dashboard/${freelancerId}`,
  jobs: () => "/jobs",
  jobCategory: (categorySlug: string, subCategorySlug: string) =>
    `/jobs/${categorySlug}/${subCategorySlug}`,
  createNewService: (serviceId: string) => `/create-new-service/${serviceId}`,
  profile: () => "/profile",
  notifications: () => "/notifications",
  /** Placeholder until a dedicated settings route exists */
  settings: () => "/profile",
  /** Browse categories / sell services entry */
  browseServices: () => "/jobs",
};
