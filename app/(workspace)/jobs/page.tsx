import { JobCategoryExplorer } from "@/components/freelancer/JobCategoryExplorer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function FreelancerBrowseJobsPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Browse jobs</h1>
        <p className="text-muted-foreground">
          Explore categories and subcategories to find work that fits your skills.
        </p>
      </div>
      <Card className="overflow-hidden">
        <CardHeader className="pb-0">
          <CardTitle className="text-lg">Categories</CardTitle>
          <CardDescription>
            Select a subcategory to open the jobs view for that area.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="max-h-[calc(100vh-16rem)] overflow-y-auto border-t">
            <JobCategoryExplorer />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
