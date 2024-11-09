'use client'

import * as React from 'react'
import { BookOpen, ChevronDown, Filter, GraduationCap, HardHat, Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
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

export default function QuizzesPage() {
    return (
        <SidebarProvider>
            <div className="flex h-[100dvh] overflow-hidden bg-[#ffe5e5] bg-opacity-50 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiNDODEwMkUiIGZpbGwtb3BhY2l0eT0iLjAzIiBkPSJNMzYgMzRoLTJWMTZoMnYxOHptNCAwaDJWMTZoLTJ2MTh6Ii8+PHBhdGggZmlsbD0iIzAwMzg5MyIgZmlsbC1vcGFjaXR5PSIuMDMiIGQ9Ik0yMCAyNmgyMHYySDIwdi0yem0wIDZoMjB2MkgyMHYtMnoiLz48L2c+PC9zdmc+')]">
                <AppSidebar />
                <SidebarInset className="flex-1">
                    <div className="flex flex-col h-full">
                        <Header />
                        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-white bg-opacity-75">
                            <QuizzesContent />
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
                        { icon: BookOpen, label: "All Quizzes" },
                        { icon: GraduationCap, label: "My Quizzes" },
                        { icon: HardHat, label: "Practice Tests" },
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
        </Sidebar>
    )
}

function Header() {
    const { toggleSidebar } = useSidebar()

    return (
        <header className="flex h-16 items-center gap-4 border-b border-[#003893] border-opacity-20 bg-white px-4 md:px-6">
            <SidebarTrigger />
            <div className="flex flex-1 items-center justify-between">
                <h1 className="text-2xl font-bold text-[#003893]">Quizzes</h1>
                <Button variant="outline" className="text-[#003893] border-[#003893]">
                    Create Quiz
                </Button>
            </div>
        </header>
    )
}

function QuizzesContent() {
    const [searchTerm, setSearchTerm] = React.useState('')
    const [selectedCategory, setSelectedCategory] = React.useState('')

    const quizzes = [
        { id: 1, title: "Engineering License Prep", category: "Engineering", questions: 50, duration: 60, difficulty: "Advanced" },
        { id: 2, title: "IOE Entrance Math", category: "Mathematics", questions: 30, duration: 45, difficulty: "Intermediate" },
        { id: 3, title: "Lok Sewa General Knowledge", category: "General Knowledge", questions: 100, duration: 90, difficulty: "Intermediate" },
        { id: 4, title: "CEE Physics Challenge", category: "Physics", questions: 40, duration: 60, difficulty: "Advanced" },
        { id: 5, title: "Nepali History and Culture", category: "History", questions: 60, duration: 75, difficulty: "Beginner" },
        { id: 6, title: "Computer Science Fundamentals", category: "Computer Science", questions: 45, duration: 60, difficulty: "Intermediate" },
    ]

    const filteredQuizzes = quizzes.filter(quiz =>
        quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === '' || quiz.category === selectedCategory)
    )

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search quizzes..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="w-full md:w-[180px]">
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="">All Categories</SelectItem>
                            <SelectItem value="Engineering">Engineering</SelectItem>
                            <SelectItem value="Mathematics">Mathematics</SelectItem>
                            <SelectItem value="General Knowledge">General Knowledge</SelectItem>
                            <SelectItem value="Physics">Physics</SelectItem>
                            <SelectItem value="History">History</SelectItem>
                            <SelectItem value="Computer Science">Computer Science</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredQuizzes.map((quiz) => (
                    <Card key={quiz.id} className="flex flex-col bg-white border-[#003893] border-opacity-20 hover:shadow-md transition-shadow duration-200">
                        <CardHeader>
                            <CardTitle className="text-[#003893]">{quiz.title}</CardTitle>
                            <CardDescription className="text-[#4a4a4a]">{quiz.category}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <div className="text-[#4a4a4a]">Questions:</div>
                                <div className="font-medium text-[#003893]">{quiz.questions}</div>
                                <div className="text-[#4a4a4a]">Duration:</div>
                                <div className="font-medium text-[#003893]">{quiz.duration} mins</div>
                                <div className="text-[#4a4a4a]">Difficulty:</div>
                                <div className="font-medium text-[#003893]">{quiz.difficulty}</div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full bg-[#C8102E] text-white hover:bg-[#a50d24]">
                                Start Quiz
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}