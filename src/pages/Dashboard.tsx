import { 
  TrendingUp, 
  Users, 
  GitBranch, 
  Shield,
  Activity,
  Clock
} from 'lucide-react'
import { Button } from "@/components/ui/button"

export function Dashboard() {
  // Mock data - replace with real API calls
  const stats = [
    { name: 'Total Candidates', value: '1,234', change: '+12%', changeType: 'positive', icon: Users },
    { name: 'Repositories Analyzed', value: '89', change: '+5%', changeType: 'positive', icon: GitBranch },
    { name: 'Security Experts', value: '156', change: '+8%', changeType: 'positive', icon: Shield },
    { name: 'Active Sessions', value: '3', change: '0%', changeType: 'neutral', icon: Activity },
  ]

  const recentActivity = [
    {
      id: 1,
      type: 'analysis',
      message: 'Analysis completed for chipsalliance/Caliptra',
      time: '2 hours ago',
      status: 'completed'
    },
    {
      id: 2,
      type: 'candidate',
      message: 'New candidate profile created: Jeff Andersen',
      time: '4 hours ago',
      status: 'completed'
    },
    {
      id: 3,
      type: 'analysis',
      message: 'Analysis started for microsoft/vscode',
      time: '6 hours ago',
      status: 'running'
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Overview of your talent intelligence platform
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="card p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <stat.icon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-4 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {stat.name}
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {stat.value}
                    </div>
                    <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                      stat.changeType === 'positive' ? 'text-success-600' : 
                      stat.changeType === 'negative' ? 'text-danger-600' : 
                      'text-gray-500'
                    }`}>
                      <TrendingUp className="h-4 w-4 flex-shrink-0 self-center" />
                      <span className="sr-only">
                        {stat.changeType === 'positive' ? 'Increased' : 'Decreased'} by
                      </span>
                      {stat.change}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="card">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="px-6 py-4">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className={`h-2 w-2 rounded-full ${
                    activity.status === 'completed' ? 'bg-success-400' : 'bg-warning-400'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <div className="flex items-center mt-1">
                    <Clock className="h-3 w-3 text-gray-400 mr-1" />
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    activity.status === 'completed' 
                      ? 'bg-success-100 text-success-800' 
                      : 'bg-warning-100 text-warning-800'
                  }`}>
                    {activity.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Button className="w-full" variant="default">
              Analyze New Repository
            </Button>
            <Button className="w-full" variant="outline">
              Search Candidates
            </Button>
            <Button className="w-full" variant="outline">
              View Analytics
            </Button>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">System Status</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">API Status</span>
              <span className="badge-success">Online</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Database</span>
              <span className="badge-success">Connected</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">GitHub API</span>
              <span className="badge-success">Connected</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}