function FreelancerHowItWorksSection() {
  return (
    <section id="how-it-works" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How to Get Started as a Freelancer
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Launch your freelance career in just three simple steps and start earning today.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-white">1</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Create Your Profile</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Set up your professional profile, showcase your skills, and upload your portfolio to attract clients.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-white">2</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Find & Apply</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Browse available projects, submit compelling proposals, and connect with clients who need your expertise.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-white">3</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Work & Get Paid</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Deliver exceptional work, build lasting relationships, and get paid securely through our platform.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FreelancerHowItWorksSection;
