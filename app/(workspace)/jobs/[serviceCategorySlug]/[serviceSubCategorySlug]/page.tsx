type JobsPageProps = {
  params: Promise<{
    serviceCategorySlug: string;
    serviceSubCategorySlug: string;
  }>;
};

export default async function JobsPage({ params }: JobsPageProps) {
  const { serviceCategorySlug, serviceSubCategorySlug } = await params;
  return (
    <div>
      JobsPage {serviceCategorySlug} {serviceSubCategorySlug}
    </div>
  );
}
