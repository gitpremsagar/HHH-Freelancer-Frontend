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
          Pick a subcategory in the left sidebar to see open jobs for that area.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Get started</CardTitle>
          <CardDescription>
            Categories and subcategories are listed in the sidebar. Click any
            subcategory to load matching jobs in this panel.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          <p>
            Your workspace shortcuts (dashboard, profile, services) stay below the
            category list in the same sidebar.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
