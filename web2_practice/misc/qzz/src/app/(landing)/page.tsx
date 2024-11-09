'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Brain, CheckCircle, ChevronDown, GraduationCap, Star, Trophy, Flag, Languages, Smartphone, HardHat, School, Briefcase } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'

export default function LandingPage() {
  return (
      <div className="min-h-screen bg-gradient-to-b from-[#ffe5e5] to-[#e5e5ff]">
        <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:max-w-7xl flex h-16 items-center">
            <div className="mr-4 hidden md:flex">
              <a className="mr-6 flex items-center space-x-2" href="/">
                <BookOpen className="h-6 w-6 text-[#C8102E]" />
                <span className="hidden font-bold text-[#003893] sm:inline-block">
                QuizMaster Nepal
              </span>
              </a>
              <nav className="flex items-center space-x-6 text-sm font-medium">
                <a className="transition-colors hover:text-[#C8102E] text-[#003893]" href="#features">Features</a>
                <a className="transition-colors hover:text-[#C8102E] text-[#003893]" href="#testimonials">Testimonials</a>
                <a className="transition-colors hover:text-[#C8102E] text-[#003893]" href="#pricing">Pricing</a>
              </nav>
            </div>
            <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
              <Button variant="ghost" className="text-base text-[#003893]">Log in</Button>
              <Button className="bg-[#C8102E] text-white hover:bg-[#a50d24]">Sign up</Button>
            </div>
          </div>
        </header>
        <main>
          <section className="relative overflow-hidden py-24 md:py-32">
            <div className="absolute inset-0 z-0">
              <img
                  src="https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3"
                  alt="Nepali landscape with prayer flags"
                  className="w-full h-full object-cover opacity-20"
              />
            </div>
            <div className="container mx-auto relative z-10 grid lg:grid-cols-2 gap-8 items-center px-4 sm:px-6 lg:px-8">
              <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="max-w-3xl"
              >
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl xl:text-6xl text-[#003893]">
                  Master Nepal's Toughest Exams with Interactive Quizzes
                </h1>
                <p className="mt-4 text-xl text-[#4a4a4a]">
                  Boost your preparation for Engineering License, CEE, IOE, and Government exams in Nepal.
                  Our adaptive learning platform offers personalized quizzes, real-time feedback, and comprehensive analytics.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="w-full sm:w-auto bg-[#C8102E] text-white hover:bg-[#a50d24]">
                    Start Preparing <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-[#003893] text-[#003893] hover:bg-[#003893] hover:text-white">
                    Explore Exams <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
              <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative lg:h-[600px]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#C8102E] to-[#003893] rounded-lg opacity-20 blur-2xl" />
                <div className="relative bg-white rounded-lg shadow-2xl overflow-hidden">
                  <img
                      src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3"
                      alt="Students studying in a library"
                      className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </section>

          <section id="features" className="container mx-auto py-24 md:py-32 space-y-16 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center"
            >
              <h2 className="text-3xl font-bold tracking-tight text-[#003893]">
                Features that Set Us Apart
              </h2>
              <p className="mt-4 text-xl text-[#4a4a4a]">
                Discover why QuizMaster is the preferred choice for learners across Nepal.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[
                {
                  title: "Nepal-Focused Content",
                  description: "Tailored quizzes for Engineering License, CEE, IOE, and Government exams in Nepal.",
                  icon: Flag,
                },
                {
                  title: "Adaptive Learning",
                  description: "Our AI-powered system adjusts quiz difficulty based on your performance.",
                  icon: Brain,
                },
                {
                  title: "Comprehensive Analytics",
                  description: "Track your progress with detailed insights and performance metrics.",
                  icon: GraduationCap,
                },
                {
                  title: "Nepali Language Support",
                  description: "Access quizzes and explanations in both English and Nepali languages.",
                  icon: Languages,
                },
                {
                  title: "Mobile-Friendly",
                  description: "Prepare on-the-go with our responsive design optimized for all devices.",
                  icon: Smartphone,
                },
                {
                  title: "Expert-Curated Content",
                  description: "Access high-quality quizzes created by Nepal's top educators and subject matter experts.",
                  icon: Star,
                },
              ].map((feature, index) => (
                  <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                  >
                    <Card className="bg-white border-[#003893] border-opacity-20 hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <feature.icon className="h-10 w-10 text-[#C8102E]" />
                        <CardTitle className="text-[#003893]">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-[#4a4a4a]">{feature.description}</CardDescription>
                      </CardContent>
                    </Card>
                  </motion.div>
              ))}
            </div>
          </section>

          <section id="testimonials" className="bg-gradient-to-b from-[#e5e5ff] to-[#ffe5e5] py-24 md:py-32">
            <div className="container mx-auto space-y-16 px-4 sm:px-6 lg:px-8">
              <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-center"
              >
                <h2 className="text-3xl font-bold tracking-tight text-[#003893]">
                  What Our Users Say
                </h2>
                <p className="mt-4 text-xl text-[#4a4a4a]">
                  Don't just take our word for it. Here's what learners have to say about QuizMaster Nepal.
                </p>
              </motion.div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    name: "Aarav Sharma",
                    role: "Engineering License Aspirant",
                    content: "QuizMaster Nepal has been invaluable in my preparation for the Engineering License exam. The comprehensive question bank and detailed explanations have boosted my confidence.",
                    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200&ixlib=rb-4.0.3",
                  },
                  {
                    name: "Sita Adhikari",
                    role: "IOE Entrance Candidate",
                    content: "As an IOE aspirant, I love how QuizMaster Nepal covers all the topics in depth. The practice tests closely mimic the actual exam format, which is incredibly helpful.",
                    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200&ixlib=rb-4.0.3",
                  },
                  {
                    name: "Binod Thapa",
                    role: "Government Job Applicant",
                    content: "Preparing for government exams has never been easier. QuizMaster Nepal's current affairs quizzes and subject-wise tests have significantly improved my general knowledge.",
                    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200&ixlib=rb-4.0.3",
                  },
                ].map((testimonial, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                      <Card className="bg-white border-[#003893] border-opacity-20 hover:shadow-lg transition-shadow duration-300">
                        <CardHeader>
                          <div className="flex items-center gap-4">
                            <Avatar>
                              <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                              <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="text-[#003893]">{testimonial.name}</CardTitle>
                              <CardDescription className="text-[#4a4a4a]">{testimonial.role}</CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-[#4a4a4a]">{testimonial.content}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section id="pricing" className="container mx-auto py-24 md:py-32 space-y-16 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center"
            >
              <h2 className="text-3xl font-bold tracking-tight text-[#003893]">
                Choose Your Plan
              </h2>
              <p className="mt-4 text-xl text-[#4a4a4a]">
                Flexible pricing options to suit your learning needs.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Basic",
                  price: "Free",
                  description: "Perfect for casual learners",
                  features: ["Access to 100+ Nepal-focused quizzes", "Basic analytics", "Mobile access"],
                },
                {
                  name: "Pro",
                  price: "Rs. 999",
                  description: "Ideal for serious exam preparation",
                  features: ["Unlimited quiz access", "Advanced analytics", "Create custom quizzes", "Bilingual support (English & Nepali)", "Ad-free experience"],
                },
                {
                  name: "Institute",
                  price: "Custom",
                  description: "For coaching centers and schools",
                  features: ["All Pro features", "Dedicated support", "Custom question banks", "Student performance tracking"],
                },
              ].map((plan, index) => (
                  <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                  >
                    <Card className="flex flex-col h-full bg-white border-[#003893] border-opacity-20 hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <CardTitle className="text-[#003893]">{plan.name}</CardTitle>
                        <CardDescription className="text-[#4a4a4a]">{plan.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-4xl font-bold text-[#C8102E]">{plan.price}</p>
                        <p className="text-[#4a4a4a]">{plan.name !== "Institute" ? "per month" : "pricing"}</p>
                        <ul className="mt-4 space-y-2">
                          {plan.features.map((feature, idx) => (
                              <li key={idx} className="flex items-center text-[#4a4a4a]">
                                <CheckCircle className="mr-2 h-4 w-4 text-[#C8102E]" />
                                {feature}
                              </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full bg-[#003893] text-white hover:bg-[#002d7a]">
                          {plan.name === "Institute" ? "Contact Us" : "Get Started"}
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
              ))}
            </div>
          </section>

          <section className="container mx-auto py-24 md:py-32 space-y-16 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center"
            >
              <h2 className="text-3xl font-bold tracking-tight text-[#003893]">
                Prepare for Nepal's Top Exams
              </h2>
              <p className="mt-4 text-xl text-[#4a4a4a]">
                Comprehensive question banks and mock tests for various competitive exams in Nepal.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { name: "Engineering License", icon: HardHat, image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=300&h=200&ixlib=rb-4.0.3" },
                { name: "IOE Entrance", icon: School, image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=300&h=200&ixlib=rb-4.0.3" },
                { name: "Lok Sewa Aayog", icon: Briefcase, image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=300&h=200&ixlib=rb-4.0.3" },
                { name: "CEE (Common Entrance Exam)", icon: GraduationCap, image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=300&h=200&ixlib=rb-4.0.3" },
              ].map((exam, index) => (
                  <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                  >
                    <Card className="text-center bg-white border-[#003893] border-opacity-20 hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                      <img src={exam.image} alt={exam.name} className="w-full h-40 object-cover" />
                      <CardHeader>
                        <exam.icon className="h-12 w-12 mx-auto text-[#C8102E]" />
                        <CardTitle className="text-[#003893]">{exam.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Button variant="outline" className="border-[#003893] text-[#003893] hover:bg-[#003893] hover:text-white">
                          Start Preparing
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
              ))}
            </div>
          </section>

          <section className="bg-gradient-to-b from-[#ffe5e5] to-[#e5e5ff] py-24 md:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold tracking-tight mb-4 text-[#003893]">
                  Ready to Boost Your Learning?
                </h2>
                <p className="text-xl text-[#4a4a4a] mb-8">
                  Join thousands of satisfied learners and start your journey with QuizMaster Nepal today.
                </p>
                <Button size="lg" className="bg-[#C8102E] text-white hover:bg-[#a50d24]">
                  Sign Up Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </section>
        </main>
        <footer className="bg-[#003893] text-white py-8 md:py-12">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <BookOpen className="h-6 w-6 text-white" />
              <span className="font-bold">QuizMaster Nepal</span>
            </div>
            <nav className="flex gap-4">
              <a href="#" className="text-sm hover:text-[#ffe5e5]">Privacy Policy</a>
              <a href="#" className="text-sm hover:text-[#ffe5e5]">Terms of Service</a>
              <a href="#" className="text-sm hover:text-[#ffe5e5]">Contact Us</a>
            </nav>
          </div>
        </footer>
      </div>
  )
}