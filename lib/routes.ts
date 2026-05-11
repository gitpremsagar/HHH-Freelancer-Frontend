/**
 * URL builders for the freelancer-only app (no /freelancer prefix).
 */

/** Dynamic segment for the create-service wizard before a server id exists */
export const CREATE_NEW_SERVICE_SLUG = "new" as const;

export const routes = {
  home: () => "/",
  logIn: () => "/log-in",
  signUp: () => "/sign-up",
  dashboard: (freelancerId: string) => `/dashboard/${freelancerId}`,
  jobs: () => "/jobs",
  jobCategory: (categorySlug: string, subCategorySlug: string) =>
    `/jobs/${categorySlug}/${subCategorySlug}`,
  createNewService: (serviceId: string) => `/create-new-service/${serviceId}`,
  createNewServiceNew: () =>
    `/create-new-service/${CREATE_NEW_SERVICE_SLUG}`,
  profile: () => "/profile",
  notifications: () => "/notifications",
  /** Placeholder until a dedicated settings route exists */
  settings: () => "/profile",
  /** Browse categories / sell services entry */
  browseServices: () => "/jobs",
};
