export interface MonthlySignup {
  month: string
  count: number
}

export interface AnalyticsSummary {
  generatedAt: string
  totalUsers: number
  signupsThisMonth: number
  activeToday: number
  active7d: number
  active30d: number
  monthlySignups: MonthlySignup[]
}
