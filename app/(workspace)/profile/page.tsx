import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Star, MapPin, Globe, Calendar, Award, Briefcase, GraduationCap, Code, MessageCircle, Heart, Share2 } from "lucide-react"

// Dummy data inspired by the Prisma schema
const freelancerData = {
  id: "507f1f77bcf86cd799439011",
  name: "Sarah Johnson",
  email: "sarah.johnson@example.com",
  avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
  title: "Senior Full-Stack Developer & UI/UX Designer",
  overview: "Passionate full-stack developer with 8+ years of experience building scalable web applications. I specialize in React, Node.js, and modern design systems. I love creating beautiful, functional interfaces that users love to interact with.",
  experienceLevel: "EXPERT",
  country: "United States",
  state: "California",
  city: "San Francisco",
  website: "https://sarahjohnson.dev",
  bio: "I'm a creative problem-solver who loves turning complex ideas into elegant solutions. When I'm not coding, you'll find me hiking in the mountains or experimenting with new design trends.",
  
  // Freelancer Profile
  freelancerProfile: {
    title: "Senior Full-Stack Developer & UI/UX Designer",
    overview: "Passionate full-stack developer with 8+ years of experience building scalable web applications. I specialize in React, Node.js, and modern design systems.",
    experienceLevel: "EXPERT"
  },

  // Skills
  skills: [
    { name: "React", category: "Frontend", subCategory: "JavaScript Frameworks" },
    { name: "Node.js", category: "Backend", subCategory: "JavaScript" },
    { name: "TypeScript", category: "Programming", subCategory: "JavaScript" },
    { name: "Next.js", category: "Frontend", subCategory: "React Frameworks" },
    { name: "MongoDB", category: "Database", subCategory: "NoSQL" },
    { name: "PostgreSQL", category: "Database", subCategory: "SQL" },
    { name: "AWS", category: "Cloud", subCategory: "Infrastructure" },
    { name: "Docker", category: "DevOps", subCategory: "Containerization" },
    { name: "Figma", category: "Design", subCategory: "UI/UX" },
    { name: "Adobe Creative Suite", category: "Design", subCategory: "Graphics" }
  ],

  // Languages
  languages: [
    { language: "English", level: "NATIVE" },
    { language: "Spanish", level: "FLUENT" },
    { language: "French", level: "INTERMEDIATE" }
  ],

  // Portfolio Items
  portfolioItems: [
    {
      id: "1",
      title: "E-commerce Platform Redesign",
      description: "Complete redesign of a modern e-commerce platform with React and Node.js. Improved conversion rates by 40% and reduced page load times by 60%.",
      mediaUrls: [
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800&h=600&fit=crop"
      ],
      projectUrl: "https://example-ecommerce.com",
      serviceCategory: "Web Development",
      serviceSubCategory: "E-commerce"
    },
    {
      id: "2",
      title: "Mobile Banking App UI/UX",
      description: "Designed and developed a modern mobile banking application with focus on user experience and security. Featured in App Store's 'Best New Apps'.",
      mediaUrls: [
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop"
      ],
      projectUrl: "https://banking-app-demo.com",
      serviceCategory: "Mobile Development",
      serviceSubCategory: "iOS/Android"
    },
    {
      id: "3",
      title: "SaaS Dashboard Analytics",
      description: "Built a comprehensive analytics dashboard for a SaaS platform using React, D3.js, and real-time data visualization.",
      mediaUrls: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
      ],
      projectUrl: "https://analytics-dashboard-demo.com",
      serviceCategory: "Web Development",
      serviceSubCategory: "Data Visualization"
    }
  ],

  // Employment History
  employments: [
    {
      id: "1",
      company: "TechCorp Solutions",
      role: "Senior Full-Stack Developer",
      startDate: "2021-03-01",
      endDate: null,
      description: "Lead development of enterprise web applications using React, Node.js, and microservices architecture. Mentored junior developers and established coding standards.",
      serviceCategory: "Web Development",
      serviceSubCategory: "Full-Stack"
    },
    {
      id: "2",
      company: "DesignStudio Inc",
      role: "Frontend Developer & UI Designer",
      startDate: "2019-06-01",
      endDate: "2021-02-28",
      description: "Developed responsive web applications and created user interface designs. Collaborated with UX team to improve user experience across multiple products.",
      serviceCategory: "Web Development",
      serviceSubCategory: "Frontend"
    },
    {
      id: "3",
      company: "StartupXYZ",
      role: "Full-Stack Developer",
      startDate: "2017-01-01",
      endDate: "2019-05-31",
      description: "Built MVP applications from scratch using modern web technologies. Worked in agile environment with cross-functional teams.",
      serviceCategory: "Web Development",
      serviceSubCategory: "Full-Stack"
    }
  ],

  // Education
  educations: [
    {
      id: "1",
      school: "Stanford University",
      degree: "Master of Science",
      field: "Computer Science",
      startDate: "2015-09-01",
      endDate: "2017-06-01",
      serviceCategory: "Education",
      serviceSubCategory: "Computer Science"
    },
    {
      id: "2",
      school: "UC Berkeley",
      degree: "Bachelor of Science",
      field: "Software Engineering",
      startDate: "2011-09-01",
      endDate: "2015-06-01",
      serviceCategory: "Education",
      serviceSubCategory: "Software Engineering"
    }
  ],

  // Certifications
  certifications: [
    {
      id: "1",
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      issuedAt: "2022-03-15",
      expiresAt: "2025-03-15",
      credentialId: "AWS-SAA-123456",
      credentialUrl: "https://aws.amazon.com/verification/123456",
      serviceCategory: "Cloud Computing",
      serviceSubCategory: "AWS"
    },
    {
      id: "2",
      name: "Google UX Design Certificate",
      issuer: "Google",
      issuedAt: "2021-08-20",
      expiresAt: null,
      credentialId: "GOOGLE-UX-789012",
      credentialUrl: "https://coursera.org/verify/789012",
      serviceCategory: "Design",
      serviceSubCategory: "UX Design"
    },
    {
      id: "3",
      name: "React Developer Certification",
      issuer: "Meta",
      issuedAt: "2020-11-10",
      expiresAt: null,
      credentialId: "META-REACT-345678",
      credentialUrl: "https://meta.com/verify/345678",
      serviceCategory: "Web Development",
      serviceSubCategory: "React"
    }
  ],

  // Freelancing Services
  freelancingServices: [
    {
      id: "1",
      title: "Custom React Web Application Development",
      description: "I'll build a fully responsive, modern web application using React, TypeScript, and best practices. Includes UI/UX design, API integration, and deployment.",
      slug: "custom-react-web-application",
      basePrice: 2500,
      currency: "USD",
      deliveryTime: 14,
      rating: 4.9,
      ratingCount: 47,
      orderCount: 89,
      status: "APPROVED",
      tags: ["React", "TypeScript", "Web Development", "UI/UX"]
    },
    {
      id: "2",
      title: "E-commerce Website with Payment Integration",
      description: "Complete e-commerce solution with shopping cart, payment processing, inventory management, and admin dashboard.",
      slug: "ecommerce-website-payment-integration",
      basePrice: 3500,
      currency: "USD",
      deliveryTime: 21,
      rating: 4.8,
      ratingCount: 32,
      orderCount: 56,
      status: "APPROVED",
      tags: ["E-commerce", "Payment Integration", "Full-Stack", "MongoDB"]
    },
    {
      id: "3",
      title: "UI/UX Design for Mobile Apps",
      description: "Professional mobile app design including wireframes, prototypes, and design system. Compatible with iOS and Android guidelines.",
      slug: "ui-ux-design-mobile-apps",
      basePrice: 1200,
      currency: "USD",
      deliveryTime: 7,
      rating: 4.9,
      ratingCount: 28,
      orderCount: 45,
      status: "APPROVED",
      tags: ["UI/UX", "Mobile Design", "Figma", "Prototyping"]
    }
  ],

  // Reviews
  reviews: [
    {
      id: "1",
      clientName: "John Smith",
      clientAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      comment: "Sarah delivered an exceptional e-commerce platform that exceeded our expectations. Her attention to detail and communication throughout the project was outstanding.",
      createdAt: "2024-01-15",
      serviceTitle: "E-commerce Website with Payment Integration"
    },
    {
      id: "2",
      clientName: "Emily Chen",
      clientAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      comment: "The React application Sarah built for us is fast, responsive, and beautifully designed. She was professional, met all deadlines, and provided excellent support.",
      createdAt: "2024-01-08",
      serviceTitle: "Custom React Web Application Development"
    },
    {
      id: "3",
      clientName: "Michael Rodriguez",
      clientAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      rating: 4,
      comment: "Great UI/UX design work. Sarah understood our requirements perfectly and delivered a modern, user-friendly interface for our mobile app.",
      createdAt: "2023-12-20",
      serviceTitle: "UI/UX Design for Mobile Apps"
    }
  ],

  // Stats
  stats: {
    totalProjects: 156,
    successRate: 98,
    responseTime: "1 hour",
    onTimeDelivery: 100,
    repeatClients: 67
  }
}

export default function FreelancerProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Profile Image and Basic Info */}
            <div className="flex flex-col items-center lg:items-start">
              <Avatar className="w-32 h-32 mb-4">
                <AvatarImage src={freelancerData.avatar} alt={freelancerData.name} />
                <AvatarFallback>{freelancerData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="text-center lg:text-left">
                <h1 className="text-3xl font-bold text-gray-900">{freelancerData.name}</h1>
                <p className="text-xl text-gray-600 mt-2">{freelancerData.title}</p>
                <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{freelancerData.city}, {freelancerData.state}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Globe className="w-4 h-4" />
                    <a href={freelancerData.website} className="hover:text-blue-600" target="_blank" rel="noopener noreferrer">
                      Website
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats and Actions */}
            <div className="flex-1 lg:ml-8">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{freelancerData.stats.totalProjects}</div>
                  <div className="text-sm text-gray-500">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{freelancerData.stats.successRate}%</div>
                  <div className="text-sm text-gray-500">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{freelancerData.stats.responseTime}</div>
                  <div className="text-sm text-gray-500">Response Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{freelancerData.stats.onTimeDelivery}%</div>
                  <div className="text-sm text-gray-500">On Time</div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button className="flex-1">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contact Me
                </Button>
                <Button variant="outline">
                  <Heart className="w-4 h-4" />
                </Button>
                <Button variant="outline">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{freelancerData.overview}</p>
                <p className="text-gray-700 leading-relaxed mt-4">{freelancerData.bio}</p>
              </CardContent>
            </Card>

            {/* Skills Section */}
            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {freelancerData.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-sm">
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Languages Section */}
            <Card>
              <CardHeader>
                <CardTitle>Languages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {freelancerData.languages.map((lang, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="font-medium">{lang.language}</span>
                      <Badge variant="outline">{lang.level}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Portfolio Section */}
            <Card>
              <CardHeader>
                <CardTitle>Portfolio</CardTitle>
                <CardDescription>Recent projects and work samples</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {freelancerData.portfolioItems.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4">
                      <div className="flex gap-4">
                        <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                          <img 
                            src={item.mediaUrls[0]} 
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{item.title}</h3>
                          <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                          <div className="flex gap-2 mt-2">
                            <Badge variant="outline" className="text-xs">
                              {item.serviceCategory}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {item.serviceSubCategory}
                            </Badge>
                          </div>
                          {item.projectUrl && (
                            <a 
                              href={item.projectUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 text-sm mt-2 inline-block"
                            >
                              View Project →
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Employment History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Work Experience
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {freelancerData.employments.map((job) => (
                    <div key={job.id} className="border-l-2 border-blue-200 pl-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">{job.role}</h3>
                          <p className="text-gray-600 font-medium">{job.company}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(job.startDate).toLocaleDateString()} - {job.endDate ? new Date(job.endDate).toLocaleDateString() : 'Present'}
                          </p>
                        </div>
                        <Badge variant="outline">{job.serviceSubCategory}</Badge>
                      </div>
                      <p className="text-gray-700 mt-2">{job.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Education */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {freelancerData.educations.map((edu) => (
                    <div key={edu.id} className="border-l-2 border-green-200 pl-4">
                      <h3 className="font-semibold">{edu.degree} in {edu.field}</h3>
                      <p className="text-gray-600 font-medium">{edu.school}</p>
                      <p className="text-sm text-gray-500">
                        {edu.startDate ? new Date(edu.startDate).toLocaleDateString() : ''} - {edu.endDate ? new Date(edu.endDate).toLocaleDateString() : ''}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Certifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {freelancerData.certifications.map((cert) => (
                    <div key={cert.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{cert.name}</h3>
                          <p className="text-gray-600">{cert.issuer}</p>
                          <p className="text-sm text-gray-500">
                            Issued: {cert.issuedAt ? new Date(cert.issuedAt).toLocaleDateString() : 'N/A'}
                            {cert.expiresAt && ` • Expires: ${new Date(cert.expiresAt).toLocaleDateString()}`}
                          </p>
                        </div>
                        <Badge variant="outline">{cert.serviceSubCategory}</Badge>
                      </div>
                      {cert.credentialUrl && (
                        <a 
                          href={cert.credentialUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm mt-2 inline-block"
                        >
                          View Credential →
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Services */}
            <Card>
              <CardHeader>
                <CardTitle>My Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {freelancerData.freelancingServices.map((service) => (
                    <div key={service.id} className="border rounded-lg p-4">
                      <h3 className="font-semibold text-sm">{service.title}</h3>
                      <p className="text-gray-600 text-xs mt-1 line-clamp-2">{service.description}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="font-bold text-green-600">${service.basePrice}</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs">{service.rating} ({service.ratingCount})</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {service.tags.slice(0, 2).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Client Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {freelancerData.reviews.map((review) => (
                    <div key={review.id} className="border-b pb-4 last:border-b-0">
                      <div className="flex gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={review.clientAvatar} alt={review.clientName} />
                          <AvatarFallback>{review.clientName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-sm">{review.clientName}</p>
                              <div className="flex items-center gap-1 mt-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`w-3 h-3 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                                  />
                                ))}
                              </div>
                            </div>
                            <span className="text-xs text-gray-500">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 mt-2">{review.comment}</p>
                          <p className="text-xs text-gray-500 mt-1">Service: {review.serviceTitle}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
