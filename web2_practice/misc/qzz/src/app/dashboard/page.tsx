'use client'

import * as React from 'react'
import { BarChart3, BookOpen, GraduationCap, Home, LayoutDashboard, LogOut, Settings, Trophy, User } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar'

export default function Dashboard() {
  return (
      <SidebarProvider>
        <div className="flex h-[100dvh] overflow-hidden bg-[#ffe5e5] bg-opacity-50 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiNDODEwMkUiIGZpbGwtb3BhY2l0eT0iLjAzIiBkPSJNMzYgMzRoLTJWMTZoMnYxOHptNCAwaDJWMTZoLTJ2MTh6Ii8+PHBhdGggZmlsbD0iIzAwMzg5MyIgZmlsbC1vcGFjaXR5PSIuMDMiIGQ9Ik0yMCAyNmgyMHYySDIwdi0yem0wIDZoMjB2MkgyMHYtMnoiLz48L2c+PC9zdmc+')]">
          <AppSidebar />
          <SidebarInset className="flex-1">
            <div className="flex flex-col h-full">
              <Header />
              <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-white bg-opacity-75">
                <DashboardContent />
              </main>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
  )
}

function AppSidebar() {
  return (
      <Sidebar className="border-r border-[#003893] border-opacity-20">
        <SidebarHeader className="px-2 py-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" className="w-full justify-start">
                <BookOpen className="h-6 w-6 text-[#C8102E]" />
                <span className="font-semibold text-lg text-[#003893] ml-2 transition-all duration-200 group-data-[collapsed=true]:opacity-0 group-data-[collapsed=true]:w-0 group-data-[collapsed=true]:overflow-hidden">QuizMaster Nepal</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent className="px-2">
          <SidebarMenu>
            {[
              { icon: LayoutDashboard, label: "Dashboard" },
              { icon: BookOpen, label: "Quizzes" },
              { icon: Trophy, label: "Achievements" },
              { icon: GraduationCap, label: "Learning Path" },
              { icon: BarChart3, label: "Analytics" },
            ].map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <a href="#" className="flex items-center py-2 text-[#003893] hover:text-[#C8102E] transition-colors duration-200">
                      <item.icon className="h-5 w-5" />
                      <span className="ml-2 transition-all duration-200 group-data-[collapsed=true]:opacity-0 group-data-[collapsed=true]:w-0 group-data-[collapsed=true]:overflow-hidden">{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="px-2 py-4">
          <SidebarMenu>
            {[
              { icon: Settings, label: "Settings" },
              { icon: LogOut, label: "Log out" },
            ].map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <Button variant="ghost" className="w-full justify-start text-[#003893] hover:text-[#C8102E] transition-colors duration-200">
                      <item.icon className="h-5 w-5" />
                      <span className="ml-2 transition-all duration-200 group-data-[collapsed=true]:opacity-0 group-data-[collapsed=true]:w-0 group-data-[collapsed=true]:overflow-hidden">{item.label}</span>
                    </Button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
  )
}

function Header() {
  const { toggleSidebar } = useSidebar()

  return (
      <header className="flex h-16 items-center gap-4 border-b border-[#003893] border-opacity-20 bg-white px-4 md:px-6">
        <SidebarTrigger />
        <div className="flex flex-1 items-center justify-between">
          <h1 className="text-2xl font-bold text-[#003893]">Dashboard</h1>
          <Avatar>
            <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200&ixlib=rb-4.0.3" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </header>
  )
}

function DashboardContent() {
  return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Total Quizzes Taken", value: "128", change: "+10% from last month", icon: BookOpen },
            { title: "Average Score", value: "76%", change: "+2% from last month", icon: Trophy },
            { title: "Study Streak", value: "14 days", change: "Keep it up!", icon: GraduationCap },
            { title: "Rank", value: "#42", change: "Out of 1,000 students", icon: User },
          ].map((stat, index) => (
              <Card key={index} className="bg-white border-[#003893] border-opacity-20 hover:shadow-md transition-shadow duration-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-[#003893]">{stat.title}</CardTitle>
                  <stat.icon className="h-4 w-4 text-[#C8102E]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#003893]">{stat.value}</div>
                  <p className="text-xs text-[#4a4a4a]">{stat.change}</p>
                </CardContent>
              </Card>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4 bg-white border-[#003893] border-opacity-20 hover:shadow-md transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="text-[#003893]">Your Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Engineering License", progress: 65 },
                  { name: "IOE Entrance", progress: 80 },
                  { name: "Lok Sewa Aayog", progress: 45 },
                  { name: "CEE (Common Entrance Exam)", progress: 70 },
                ].map((exam) => (
                    <div key={exam.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium text-[#003893]">{exam.name}</div>
                        <div className="text-sm text-[#4a4a4a]">{exam.progress}%</div>
                      </div>
                      <Progress value={exam.progress} className="h-2" indicatorColor="bg-[#C8102E]" />
                    </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-3 bg-white border-[#003893] border-opacity-20 hover:shadow-md transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="text-[#003893]">Recent Quizzes</CardTitle>
              <CardDescription className="text-[#4a4a4a]">You completed 5 quizzes this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Engineering Mathematics", score: 85, date: "2024-11-07" },
                  { name: "Nepali History", score: 92, date: "2024-11-06" },
                  { name: "General Knowledge", score: 78, date: "2024-11-05" },
                  { name: "Computer Science Basics", score: 88, date: "2024-11-04" },
                  { name: "English Grammar", score: 95, date: "2024-11-03" },
                ].map((quiz, index) => (
                    <div key={index} className="flex items-center">
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none text-[#003893]">{quiz.name}</p>
                        <p className="text-sm text-[#4a4a4a]">
                          Score: {quiz.score}% • {quiz.date}
                        </p>
                      </div>
                    </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="bg-white border-[#003893] border-opacity-20 hover:shadow-md transition-shadow duration-200">
          <CardHeader>
            <CardTitle className="text-[#003893]">Recommended Quizzes</CardTitle>
            <CardDescription className="text-[#4a4a4a]">Based on your recent activity and goals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                { name: "Advanced Engineering Ethics", description: "Prepare for the Engineering License exam", icon: HardHat },
                { name: "IOE Mathematics Challenge", description: "Sharpen your skills for the IOE entrance", icon: GraduationCap },
                { name: "Lok Sewa Current Affairs", description: "Stay updated with the latest for government exams", icon: BookOpen },
              ].map((quiz, index) => (
                  <Card key={index} className="bg-[#ffe5e5] border-[#C8102E] border-opacity-20 hover:shadow-md transition-shadow duration-200">
                    <CardHeader>
                      <quiz.icon className="h-8 w-8 text-[#C8102E]" />
                      <CardTitle className="text-[#003893]">{quiz.name}</CardTitle>
                      <CardDescription className="text-[#4a4a4a]">{quiz.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full bg-[#003893] text-white hover:bg-[#002d7a]">Start Quiz</Button>
                    </CardContent>
                  </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
  )
}

function HardHat(props: React.SVGProps<SVGSVGElement>) {
  return (
      <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
      >
        <path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z" />
        <path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5" />
        <path d="M4 15v-3a6 6 0 0 1 6-6h0" />
        <path d="M14 6h0a6 6 0 0 1 6 6v3" />
      </svg>
  )
}