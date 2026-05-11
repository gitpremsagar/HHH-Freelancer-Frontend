import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowRight, CheckCircle, Zap, Search, Briefcase, DollarSign } from "lucide-react";
import { routes } from "@/lib/routes";

function FreelancerHeroSection() {
  return (
    <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Start Your Freelance Journey
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Find high-quality projects, build your portfolio, and grow your freelance business with top clients worldwide.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="relative group">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6 transition-all duration-300 group-hover:text-green-500 group-hover:scale-110 group-hover:-translate-x-5 z-5" />
              <Input
                type="text"
                placeholder="Search for projects, skills, or job opportunities..."
                className="pl-16 pr-40 py-6 text-xl border-3 border-gray-300 dark:border-gray-600 rounded-full focus:border-green-500 dark:focus:border-green-400 shadow-lg bg-white dark:bg-gray-800 focus:shadow-xl transition-all duration-300 group-hover:scale-105 hover:shadow-2xl hover:border-green-400 dark:hover:border-green-500 hover:bg-gray-50 dark:hover:bg-gray-750 transform-gpu"
              />
              <Button 
                size="lg" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 rounded-full px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105 group-hover:translate-x-4"
              >
                Find Projects
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-lg px-8 py-6 rounded-full" asChild>
              <Link href={routes.jobs()}>
                <Briefcase className="mr-2 w-5 h-5" />
                Browse Jobs
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2 rounded-full" asChild>
              <Link href={routes.signUp()}>
                <DollarSign className="mr-2 w-5 h-5" />
                Set Up Profile
              </Link>
            </Button>
          </div>
          
        </div>
      </div>
    </section>
  );
}

export default FreelancerHeroSection;
