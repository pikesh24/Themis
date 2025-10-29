"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { BarChart, ChartContainer } from "../../../components/ui/chart"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"
import { Trophy, Users, BarChart3, PieChartIcon, Clock } from "lucide-react"
import { Progress } from "../../../components/ui/progress"
import { Badge } from "../../../components/ui/badge"
import { Button } from "../../../components/ui/button"
import Link from "next/link"

// Mock data - replace with your actual data fetching logic
const mockCandidates = [
  {
    id: 1,
    name: "Jane Smith",
    votes: 1245,
    party: "Progressive Party",
    color: "#3b82f6",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "John Doe",
    votes: 982,
    party: "Conservative Union",
    color: "#f0a08c",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    name: "Alex Johnson",
    votes: 879,
    party: "Liberty Alliance",
    color: "#22c55e",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 4,
    name: "Maria Garcia",
    votes: 654,
    party: "People's Coalition",
    color: "#f59e0b",
    image: "/placeholder.svg?height=80&width=80",
  },
]

const mockVotingStats = {
  totalVotes: 3760,
  totalVoters: 5000,
  turnoutPercentage: 75.2,
  lastUpdated: "2 minutes ago",
  votesPerHour: [
    { hour: "9 AM", votes: 120 },
    { hour: "10 AM", votes: 240 },
    { hour: "11 AM", votes: 380 },
    { hour: "12 PM", votes: 290 },
    { hour: "1 PM", votes: 340 },
    { hour: "2 PM", votes: 390 },
    { hour: "3 PM", votes: 420 },
    { hour: "4 PM", votes: 380 },
    { hour: "5 PM", votes: 320 },
    { hour: "6 PM", votes: 290 },
    { hour: "7 PM", votes: 590 },
  ],
}

export default function ResultsPage() {
  const [sortedCandidates, setSortedCandidates] = useState([...mockCandidates])
  const [activeTab, setActiveTab] = useState("overview")
  const [isLoading, setIsLoading] = useState(true)

  // Sort candidates by votes (highest first)
  useEffect(() => {
    const sorted = [...mockCandidates].sort((a, b) => b.votes - a.votes)
    setSortedCandidates(sorted)

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const totalVotes = mockVotingStats.totalVotes
  const winner = sortedCandidates[0]
  const pieData = sortedCandidates.map((candidate) => ({
    name: candidate.name,
    value: candidate.votes,
    color: candidate.color,
  }))

  // Calculate percentages
  const candidatesWithPercentage = sortedCandidates.map((candidate) => ({
    ...candidate,
    percentage: ((candidate.votes / totalVotes) * 100).toFixed(1),
  }))

  return (
    <div className="min-h-screen bg-[#f5f0e5] py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-[#333333] mb-2">Live Election Results</h1>
          <p className="text-[#555555]">
            Real-time updates of the current election standings
            <span className="inline-flex items-center ml-2 text-sm">
              <Clock className="h-4 w-4 mr-1 text-[#f0a08c]" />
              Last updated: {mockVotingStats.lastUpdated}
            </span>
          </p>
        </motion.div>

        {/* Loading state */}
        <AnimatePresence>
          {isLoading ? (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-[60vh]"
            >
              <div className="relative w-20 h-20">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="w-full h-full border-4 border-[#f0a08c] border-t-transparent rounded-full"
                />
              </div>
              <p className="mt-4 text-[#555555]">Loading latest results...</p>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              {/* Tabs */}
                <Tabs defaultValue="overview" className="mb-8" onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto">
                  <TabsTrigger className="w-full" value="overview">Overview</TabsTrigger>
                  <TabsTrigger className="w-full" value="candidates">Candidates</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Current Leader Card */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="md:col-span-1"
                    >
                      <Card className="border-none shadow-md overflow-hidden h-full">
                        <CardHeader className="bg-gradient-to-r from-[#f0a08c] to-[#e07a5f] text-white">
                          <div className="flex items-center">
                            <Trophy className="h-5 w-5 mr-2" />
                            <CardTitle>Current Leader</CardTitle>
                          </div>
                          <CardDescription className="text-white/80">Highest number of votes so far</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                          <div className="flex flex-col items-center text-center">
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                              className="relative mb-4"
                            >
                              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#f0a08c]">
                                <img
                                  src={winner?.image || "/placeholder.svg?height=80&width=80"}
                                  alt={winner?.name || "Winner"}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.5 }}
                                className="absolute -bottom-2 -right-2 bg-[#f0a08c] rounded-full p-1"
                              >
                                <Trophy className="h-6 w-6 text-white" />
                              </motion.div>
                            </motion.div>

                            <h3 className="text-xl font-bold text-[#333333]">{winner?.name}</h3>
                            <p className="text-[#555555] mb-2">{winner?.party}</p>
                            <div className="flex items-center justify-center gap-2 mb-4">
                              <Badge variant="outline" className="bg-[#f0a08c]/10 text-[#f0a08c] border-[#f0a08c]">
                                {winner?.votes.toLocaleString()} votes
                              </Badge>
                              <Badge variant="outline" className="bg-[#f0a08c]/10 text-[#f0a08c] border-[#f0a08c]">
                                {winner ? ((winner.votes / totalVotes) * 100).toFixed(1) : 0}%
                              </Badge>
                            </div>

                            <div className="w-full mt-2">
                              <div className="flex justify-between text-sm mb-1">
                                <span>Vote Share</span>
                                <span>{winner ? ((winner.votes / totalVotes) * 100).toFixed(1) : 0}%</span>
                              </div>
                              <Progress
                                value={winner ? Number(((winner.votes / totalVotes) * 100).toFixed(1)) : 0}
                                className="h-2 bg-gray-100"
                                indicatorClassName="bg-[#f0a08c]"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>

                    {/* Vote Distribution Chart */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="md:col-span-2"
                    >
                      <Card className="border-none shadow-md h-full">
                        <CardHeader>
                          <div className="flex items-center">
                            <PieChartIcon className="h-5 w-5 mr-2 text-[#f0a08c]" />
                            <CardTitle>Vote Distribution</CardTitle>
                          </div>
                          <CardDescription>Percentage breakdown of votes by candidate</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={pieData}
                                  cx="50%"
                                  cy="50%"
                                  labelLine={false}
                                  outerRadius={100}
                                  fill="#8884d8"
                                  dataKey="value"
                                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                                >
                                  {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                  ))}
                                </Pie>
                                <Legend />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>

                    {/* Voter Turnout */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="md:col-span-3"
                    >
                      <Card className="border-none shadow-md">
                        <CardHeader>
                          <div className="flex items-center">
                            <Users className="h-5 w-5 mr-2 text-[#f0a08c]" />
                            <CardTitle>Voter Turnout</CardTitle>
                          </div>
                          <CardDescription>
                            {mockVotingStats.totalVotes.toLocaleString()} out of{" "}
                            {mockVotingStats.totalVoters.toLocaleString()} registered voters
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex-1">
                              <div className="flex justify-between text-sm mb-1">
                                <span>Current Turnout</span>
                                <span>{mockVotingStats.turnoutPercentage}%</span>
                              </div>
                              <Progress
                                value={mockVotingStats.turnoutPercentage}
                                className="h-4 bg-gray-100"
                                indicatorClassName="bg-[#f0a08c]"
                              />
                              <div className="grid grid-cols-2 gap-4 mt-6">
                                <div className="bg-[#f5f0e5] p-4 rounded-lg text-center">
                                  <p className="text-sm text-[#555555]">Total Votes</p>
                                  <p className="text-2xl font-bold text-[#333333]">
                                    {mockVotingStats.totalVotes.toLocaleString()}
                                  </p>
                                </div>
                                <div className="bg-[#f5f0e5] p-4 rounded-lg text-center">
                                  <p className="text-sm text-[#555555]">Registered Voters</p>
                                  <p className="text-2xl font-bold text-[#333333]">
                                    {mockVotingStats.totalVoters.toLocaleString()}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm font-medium mb-2">Votes Per Hour</h4>
                              <div className="h-[150px]">
                                <ChartContainer className="h-full" data={mockVotingStats.votesPerHour}>
                                  <BarChart dataKey="votes" fill="#f0a08c" radius={4} />
                                </ChartContainer>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>
                </TabsContent>
                {/* Statistics Tab Removed */}
                {/* Candidates Tab */}
                <TabsContent value="candidates">
                  <div className="grid grid-cols-1 gap-6">
                    {candidatesWithPercentage.map((candidate, index) => (
                      <motion.div
                        key={candidate.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Card className="border-none shadow-md overflow-hidden">
                          <CardContent className="p-0">
                            <div className="flex flex-col md:flex-row items-center">
                              <div
                                className="w-full md:w-2 h-2 md:h-full"
                                style={{ backgroundColor: candidate.color }}
                              />
                              <div className="flex flex-col md:flex-row items-center w-full p-4 md:p-6">
                                <div className="flex items-center mb-4 md:mb-0">
                                  {index === 0 && (
                                    <div className="absolute -ml-2 -mt-2">
                                      <motion.div
                                        animate={{ rotate: [0, 10, -10, 0] }}
                                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
                                      >
                                        <Trophy className="h-6 w-6 text-[#f0a08c]" />
                                      </motion.div>
                                    </div>
                                  )}
                                  <div
                                    className="w-16 h-16 rounded-full overflow-hidden border-2"
                                    style={{ borderColor: candidate.color }}
                                  >
                                    <img
                                      src={candidate.image || "/placeholder.svg?height=80&width=80"}
                                      alt={candidate.name}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div className="ml-4">
                                    <h3 className="font-bold text-[#333333]">{candidate.name}</h3>
                                    <p className="text-sm text-[#555555]">{candidate.party}</p>
                                  </div>
                                </div>

                                <div className="flex-1 w-full md:ml-8">
                                  <div className="flex justify-between text-sm mb-1">
                                    <span>Votes: {candidate.votes.toLocaleString()}</span>
                                    <span>{candidate.percentage}%</span>
                                  </div>
                                  <Progress
                                    value={Number(candidate.percentage)}
                                    className="h-3 bg-gray-100"
                                    indicatorClassName="bg-gradient-to-r from-[#f0a08c] to-[#e07a5f]"
                                  />
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>

              {/* Back button */}
              <div className="flex justify-center mt-8">
                <Link href="/">
                  <Button
                    variant="outline"
                    className="rounded-full border-[#f0a08c] text-[#ffffff] hover:bg-[#f0a08c] hover:text-white"
                  >
                    Return to Voting Page
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

