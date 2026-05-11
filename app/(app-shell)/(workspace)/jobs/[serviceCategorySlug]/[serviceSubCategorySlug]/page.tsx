import { FreelancerJobSubcategoryView } from "@/components/freelancer/FreelancerJobSubcategoryView";

type JobsPageProps = {
  params: Promise<{
    serviceCategorySlug: string;
    serviceSubCategorySlug: string;
  }>;
};

export default async function JobsBySubcategoryPage({ params }: JobsPageProps) {
  const { serviceCategorySlug, serviceSubCategorySlug } = await params;

  return (
    <FreelancerJobSubcategoryView
      categorySlug={serviceCategorySlug}
      subCategorySlug={serviceSubCategorySlug}
    />
  );
}
