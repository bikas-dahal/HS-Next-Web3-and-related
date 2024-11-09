'use client'

import * as React from 'react'
import { Award, BookOpen, GraduationCap, Medal, Star, Trophy, User } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger, useSidebar } from '@/components/ui/sidebar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function UserProfile() {
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <AppSidebar />
        <SidebarInset>
          <div className="flex flex-col h-full">
            <Header />
            <main className="flex-1 overflow-y-auto p-4 md:p-6">
              <ProfileContent />
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <BookOpen className="h-6 w-6" />
              <span className="font-semibold text-lg">QuizMaster</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="#">
                <User />
                <span>Profile</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="#">
                <BookOpen />
                <span>Quizzes</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="#">
                <Trophy />
                <span>Achievements</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="#">
                <GraduationCap />
                <span>Learning Path</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Button variant="outline" className="w-full justify-start">
                <User className="mr-2 h-4 w-4" />
                Log out
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

function Header() {
  const { toggleSidebar } = useSidebar()

  return (
    <header className="flex h-16 items-center gap-4 border-b bg-background px-6">
      <SidebarTrigger />
      <div className="flex-1">
        <h1 className="text-2xl font-bold">User Profile</h1>
      </div>
    </header>
  )
}

function ProfileContent() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src="/avatars/01.png" alt="@johndoe" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">John Doe</CardTitle>
            <CardDescription>Quiz Master Level 7</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Medal className="h-5 w-5 text-yellow-500" />
              <span className="text-sm font-medium">Gold Rank</span>
            </div>
            <Button variant="outline">Edit Profile</Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quiz Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">JavaScript</span>
                  <span className="text-sm text-muted-foreground">24/30</span>
                </div>
                <Progress value={80} className="h-2 w-full" />
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">React</span>
                  <span className="text-sm text-muted-foreground">18/25</span>
                </div>
                <Progress value={72} className="h-2 w-full" />
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Python</span>
                  <span className="text-sm text-muted-foreground">15/20</span>
                </div>
                <Progress value={75} className="h-2 w-full" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center justify-between">
                  <span className="text-sm">Completed "Advanced JavaScript" quiz</span>
                  <span className="text-sm text-muted-foreground">2 days ago</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-sm">Earned "React Rookie" badge</span>
                  <span className="text-sm text-muted-foreground">5 days ago</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-sm">Started "Python for Data Science" course</span>
                  <span className="text-sm text-muted-foreground">1 week ago</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="achievements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Badges</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {[
                  { name: "Quick Learner", icon: GraduationCap, color: "text-blue-500" },
                  { name: "Quiz Ace", icon: Star, color: "text-yellow-500" },
                  { name: "Persistent Programmer", icon: Award, color: "text-green-500" },
                  { name: "Knowledge Seeker", icon: BookOpen, color: "text-purple-500" },
                ].map((badge) => (
                  <div key={badge.name} className="flex flex-col items-center space-y-2">
                    <badge.icon className={`h-12 w-12 ${badge.color}`} />
                    <span className="text-center text-sm font-medium">{badge.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-center space-x-4">
                  <Trophy className="h-6 w-6 text-yellow-500" />
                  <div>
                    <p className="font-medium">JavaScript Master</p>
                    <p className="text-sm text-muted-foreground">Completed all JavaScript quizzes with 90% or higher score</p>
                  </div>
                </li>
                <li className="flex items-center space-x-4">
                  <Trophy className="h-6 w-6 text-blue-500" />
                  <div>
                    <p className="font-medium">React Rookie</p>
                    <p className="text-sm text-muted-foreground">Completed 10 React quizzes</p>
                  </div>
                </li>
                <li className="flex items-center space-x-4">
                  <Trophy className="h-6 w-6 text-green-500" />
                  <div>
                    <p className="font-medium">Python Enthusiast</p>
                    <p className="text-sm text-muted-foreground">Completed 5 Python courses</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="statistics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Quizzes Taken</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">128</div>
                <p className="text-xs text-muted-foreground">
                  +10% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">76%</div>
                <p className="text-xs text-muted-foreground">
                  +2% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Badges Earned</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">
                  +3 since last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">14 days</div>
                <p className="text-xs text-muted-foreground">Keep it up!</p>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Performance by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "JavaScript", score: 85 },
                  { name: "React", score: 92 },
                  { name: "Python", score: 78 },
                  { name: "HTML/CSS", score: 88 },
                  { name: "Data Structures", score: 72 },
                ].map((category) => (
                  <div key={category.name} className="flex items-center">
                    <div className="w-[180px] flex-shrink-0">
                      <p className="text-sm font-medium">{category.name}</p>
                    </div>
                    <div className="flex-1 px-4">
                      <Progress value={category.score} className="h-2 w-full" />
                    </div>
                    <div className="w-[60px] flex-shrink-0 text-right">
                      <p className="text-sm font-medium">{category.score}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}