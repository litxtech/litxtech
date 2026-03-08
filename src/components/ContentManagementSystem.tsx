import { useState } from 'react'
import { 
  FileText, 
  Image, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar, 
  User, 
  Tag, 
  Settings,
  BarChart3,
  Filter,
  Upload,
  CheckCircle,
  AlertCircle,
  Clock
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
  seoTitle?: string
  seoDescription?: string
}

interface PageContent {
  id: string
  title: string
  slug: string
  content: string
  type: 'homepage' | 'about' | 'contact' | 'pricing' | 'custom'
  status: 'active' | 'inactive'
  updatedAt: string
  seoTitle?: string
  seoDescription?: string
}

interface MediaFile {
  id: string
  name: string
  url: string
  type: 'image' | 'video' | 'document'
  size: number
  uploadedAt: string
  alt?: string
}

export function ContentManagementSystem() {
  const [activeTab, setActiveTab] = useState<'blog' | 'pages' | 'media' | 'seo'>('blog')
  const [, setSelectedPost] = useState<BlogPost | null>(null)
  const [, setSelectedPage] = useState<PageContent | null>(null)
  const [, setIsEditing] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'draft' | 'published' | 'archived'>('all')

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
      seoTitle: 'Scalable SaaS Applications Guide | LitxTech',
      seoDescription: 'Complete guide to building scalable SaaS applications'
    }
  ])

  const [pages] = useState<PageContent[]>([
    {
      id: '1',
      title: 'Homepage',
      slug: '/',
      content: 'Homepage content...',
      type: 'homepage',
      status: 'active',
      updatedAt: '2025-01-15',
      seoTitle: 'LitxTech - AI-Powered Software Solutions',
      seoDescription: 'Transform your business with AI-driven software solutions'
    },
    {
      id: '2',
      title: 'About Us',
      slug: '/about',
      content: 'About us content...',
      type: 'about',
      status: 'active',
      updatedAt: '2025-01-14',
      seoTitle: 'About LitxTech - Our Story',
      seoDescription: 'Learn about LitxTech\'s mission and team'
    }
  ])

  const [mediaFiles] = useState<MediaFile[]>([
    {
      id: '1',
      name: 'hero-image.jpg',
      url: '/images/hero-image.jpg',
      type: 'image',
      size: 2048000,
      uploadedAt: '2025-01-15',
      alt: 'Hero section background image'
    },
    {
      id: '2',
      name: 'company-logo.png',
      url: '/images/logo.png',
      type: 'image',
      size: 512000,
      uploadedAt: '2025-01-14',
      alt: 'LitxTech company logo'
    }
  ])

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || post.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'draft':
        return 'bg-yellow-100 text-yellow-800'
      case 'archived':
      case 'inactive':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-blue-100 text-blue-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published':
      case 'active':
        return <CheckCircle className="w-4 h-4" />
      case 'draft':
        return <Clock className="w-4 h-4" />
      case 'archived':
      case 'inactive':
        return <AlertCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center">
                <FileText className="w-8 h-8 mr-3 text-blue-400" />
                Content Management System
              </h1>
              <p className="text-gray-300 mt-2">Manage your website content, blog posts, and media files</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>New Content</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-2 mb-8">
          <div className="flex space-x-2">
            {[
              { id: 'blog', label: 'Blog Posts', icon: FileText, count: blogPosts.length },
              { id: 'pages', label: 'Pages', icon: Settings, count: pages.length },
              { id: 'media', label: 'Media', icon: Image, count: mediaFiles.length },
              { id: 'seo', label: 'SEO', icon: Search, count: 0 }
            ].map(tab => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                    {tab.count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search content..."
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
            <button className="flex items-center space-x-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
          {activeTab === 'blog' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Blog Posts</h2>
                <button className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>New Post</span>
                </button>
              </div>

              <div className="grid gap-6">
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
                        <div className="flex items-center space-x-6 text-sm text-gray-400">
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
                        </div>
                        <div className="flex items-center space-x-2 mt-3">
                          {post.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <button 
                          onClick={() => setSelectedPost(post)}
                          className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => {setSelectedPost(post); setIsEditing(true)}}
                          className="p-2 text-gray-400 hover:text-green-400 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-400 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'pages' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Pages</h2>
                <button className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>New Page</span>
                </button>
              </div>

              <div className="grid gap-6">
                {pages.map(page => (
                  <div key={page.id} className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h3 className="text-xl font-semibold text-white">{page.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(page.status)}`}>
                            {getStatusIcon(page.status)}
                            <span className="capitalize">{page.status}</span>
                          </span>
                          <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs">
                            {page.type}
                          </span>
                        </div>
                        <p className="text-gray-400 mb-2">Slug: {page.slug}</p>
                        <div className="flex items-center space-x-6 text-sm text-gray-400">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>Updated: {page.updatedAt}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <button 
                          onClick={() => setSelectedPage(page)}
                          className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => {setSelectedPage(page); setIsEditing(true)}}
                          className="p-2 text-gray-400 hover:text-green-400 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-400 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'media' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Media Library</h2>
                <button className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 flex items-center space-x-2">
                  <Upload className="w-4 h-4" />
                  <span>Upload Media</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mediaFiles.map(file => (
                  <div key={file.id} className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
                    <div className="aspect-square bg-white/10 rounded-lg mb-4 flex items-center justify-center">
                      {file.type === 'image' ? (
                        <Image className="w-12 h-12 text-gray-400" />
                      ) : (
                        <FileText className="w-12 h-12 text-gray-400" />
                      )}
                    </div>
                    <h3 className="text-white font-medium mb-2 truncate">{file.name}</h3>
                    <p className="text-gray-400 text-sm mb-3">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-xs">{file.uploadedAt}</span>
                      <div className="flex items-center space-x-2">
                        <button className="p-1 text-gray-400 hover:text-blue-400 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-green-400 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-red-400 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'seo' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">SEO Management</h2>
                <button className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 flex items-center space-x-2">
                  <BarChart3 className="w-4 h-4" />
                  <span>SEO Analytics</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Search className="w-6 h-6 text-blue-400" />
                    <h3 className="text-lg font-semibold text-white">Meta Tags</h3>
                  </div>
                  <p className="text-gray-300 text-sm">Manage meta titles and descriptions for all pages</p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <BarChart3 className="w-6 h-6 text-green-400" />
                    <h3 className="text-lg font-semibold text-white">Analytics</h3>
                  </div>
                  <p className="text-gray-300 text-sm">Track SEO performance and rankings</p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Tag className="w-6 h-6 text-purple-400" />
                    <h3 className="text-lg font-semibold text-white">Keywords</h3>
                  </div>
                  <p className="text-gray-300 text-sm">Manage target keywords and content optimization</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
