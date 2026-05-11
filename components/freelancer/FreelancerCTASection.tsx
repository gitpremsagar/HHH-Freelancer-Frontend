import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Briefcase, UserPlus, DollarSign } from "lucide-react";
import { routes } from "@/lib/routes";

function FreelancerCTASection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-blue-600">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Ready to Start Your Freelance Journey?
        </h2>
        <p className="text-xl text-green-100 mb-8">
          Join thousands of successful freelancers who are already building their dream careers on our platform.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="secondary" className="text-lg px-8 py-6" asChild>
            <Link href={routes.jobs()}>
              <Briefcase className="mr-2 w-5 h-5" />
              Browse Projects
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-white text-green-600 hover:text-white hover:bg-green-600" asChild>
            <Link href={routes.signUp()}>
              <UserPlus className="mr-2 w-5 h-5" />
              Create Profile
            </Link>
          </Button>
        </div>
        <div className="mt-8 flex flex-col sm:flex-row gap-8 justify-center items-center text-green-100">
          <div className="flex items-center">
            <DollarSign className="w-5 h-5 mr-2" />
            <span className="font-semibold">Start earning today</span>
          </div>
          <div className="flex items-center">
            <Briefcase className="w-5 h-5 mr-2" />
            <span className="font-semibold">Flexible schedule</span>
          </div>
          <div className="flex items-center">
            <UserPlus className="w-5 h-5 mr-2" />
            <span className="font-semibold">Global opportunities</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FreelancerCTASection;
