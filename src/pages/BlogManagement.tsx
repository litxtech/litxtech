import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar, 
  User, 
  BarChart3,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  MoreHorizontal
} from 'lucide-react'

interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  author: string
  status: 'draft' | 'published' | 'archived'
  tags: string[]
  featuredImage?: string
  createdAt: string
  updatedAt: string
  views: number
  likes: number
  comments: number
  seoTitle?: string
  seoDescription?: string
}

export function BlogManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'draft' | 'published' | 'archived'>('all')
  const [filterAuthor, setFilterAuthor] = useState('all')
  const [sortBy, setSortBy] = useState<'date' | 'views' | 'title'>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  // Mock data
  const [blogPosts] = useState<BlogPost[]>([
    {
      id: '1',
      title: 'AI-Powered Web Development Trends 2025',
      slug: 'ai-powered-web-development-trends-2025',
      content: 'Full blog post content here...',
      excerpt: 'Discover the latest trends in AI-powered web development for 2025.',
      author: 'LitxTech Team',
      status: 'published',
      tags: ['AI', 'Web Development', 'Trends'],
      featuredImage: '/images/blog/ai-trends.jpg',
      createdAt: '2025-01-15',
      updatedAt: '2025-01-15',
      views: 1250,
      likes: 45,
      comments: 12,
      seoTitle: 'AI Web Development Trends 2025 | LitxTech',
      seoDescription: 'Explore cutting-edge AI web development trends for 2025'
    },
    {
      id: '2',
      title: 'Building Scalable SaaS Applications',
      slug: 'building-scalable-saas-applications',
      content: 'Full blog post content here...',
      excerpt: 'Learn how to build scalable SaaS applications with modern technologies.',
      author: 'LitxTech Team',
      status: 'draft',
      tags: ['SaaS', 'Scalability', 'Architecture'],
      createdAt: '2025-01-14',
      updatedAt: '2025-01-14',
      views: 0,
      likes: 0,
      comments: 0,
      seoTitle: 'Scalable SaaS Applications Guide | LitxTech',
      seoDescription: 'Complete guide to building scalable SaaS applications'
    },
    {
      id: '3',
      title: 'React vs Vue: Which Framework to Choose?',
      slug: 'react-vs-vue-which-framework-to-choose',
      content: 'Full blog post content here...',
      excerpt: 'A comprehensive comparison between React and Vue.js frameworks.',
      author: 'LitxTech Team',
      status: 'published',
      tags: ['React', 'Vue', 'JavaScript', 'Frontend'],
      featuredImage: '/images/blog/react-vue.jpg',
      createdAt: '2025-01-13',
      updatedAt: '2025-01-13',
      views: 890,
      likes: 32,
      comments: 8,
      seoTitle: 'React vs Vue Comparison 2025 | LitxTech',
      seoDescription: 'Detailed comparison of React and Vue.js frameworks'
    }
  ])

  const filteredPosts = blogPosts
    .filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesStatus = filterStatus === 'all' || post.status === filterStatus
      const matchesAuthor = filterAuthor === 'all' || post.author === filterAuthor
      return matchesSearch && matchesStatus && matchesAuthor
    })
    .sort((a, b) => {
      let comparison = 0
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          break
        case 'views':
          comparison = a.views - b.views
          break
        case 'title':
          comparison = a.title.localeCompare(b.title)
          break
      }
      return sortOrder === 'asc' ? comparison : -comparison
    })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800'
      case 'draft':
        return 'bg-yellow-100 text-yellow-800'
      case 'archived':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-blue-100 text-blue-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published':
        return <CheckCircle className="w-4 h-4" />
      case 'draft':
        return <Clock className="w-4 h-4" />
      case 'archived':
        return <AlertCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const totalViews = blogPosts.reduce((sum, post) => sum + post.views, 0)
  const totalLikes = blogPosts.reduce((sum, post) => sum + post.likes, 0)
  const totalComments = blogPosts.reduce((sum, post) => sum + post.comments, 0)
  const publishedPosts = blogPosts.filter(post => post.status === 'published').length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center">
                <BarChart3 className="w-8 h-8 mr-3 text-blue-400" />
                Blog Management
              </h1>
              <p className="text-gray-300 mt-2">Manage your blog posts, analytics, and content strategy</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>New Post</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300 font-medium">Total Posts</p>
                <p className="text-3xl font-bold text-white">{blogPosts.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300 font-medium">Published</p>
                <p className="text-3xl font-bold text-white">{publishedPosts}</p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300 font-medium">Total Views</p>
                <p className="text-3xl font-bold text-white">{totalViews.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <Eye className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300 font-medium">Engagement</p>
                <p className="text-3xl font-bold text-white">{totalLikes + totalComments}</p>
              </div>
              <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-pink-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>

            <select
              value={filterAuthor}
              onChange={(e) => setFilterAuthor(e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Authors</option>
              <option value="LitxTech Team">LitxTech Team</option>
            </select>

            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split('-')
                setSortBy(field as any)
                setSortOrder(order as any)
              }}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="views-desc">Most Views</option>
              <option value="views-asc">Least Views</option>
              <option value="title-asc">Title A-Z</option>
              <option value="title-desc">Title Z-A</option>
            </select>

            <button className="flex items-center space-x-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors">
              <Filter className="w-4 h-4" />
              <span>More Filters</span>
            </button>
          </div>
        </div>

        {/* Blog Posts List */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
          <div className="space-y-6">
            {filteredPosts.map(post => (
              <div key={post.id} className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-xl font-semibold text-white">{post.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(post.status)}`}>
                        {getStatusIcon(post.status)}
                        <span className="capitalize">{post.status}</span>
                      </span>
                    </div>
                    
                    <p className="text-gray-300 mb-4">{post.excerpt}</p>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-400 mb-3">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{post.createdAt}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{post.views} views</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="w-4 h-4" />
                        <span>{post.likes} likes</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {post.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <Link 
                      to={`/blog/${post.slug}`}
                      className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                      title="View Post"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <button 
                      className="p-2 text-gray-400 hover:text-green-400 transition-colors"
                      title="Edit Post"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-400 transition-colors" title="Delete Post">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-200 transition-colors" title="More Options">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No posts found</h3>
              <p className="text-gray-400 mb-6">Try adjusting your search or filter criteria</p>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center space-x-2 mx-auto">
                <Plus className="w-4 h-4" />
                <span>Create New Post</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
