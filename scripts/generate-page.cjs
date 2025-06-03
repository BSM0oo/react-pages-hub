#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Convert kebab-case to PascalCase
 */
function toPascalCase(str) {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

/**
 * Convert kebab-case to Title Case
 */
function toTitleCase(str) {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Page templates
 */
const templates = {
  basic: (name) => `import React from 'react';

export default function ${toPascalCase(name)}() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          ${toTitleCase(name)}
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          This page was auto-generated. Add your content here!
        </p>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Getting Started
          </h2>
          <p className="text-gray-600">
            Start building your page by editing this component. 
            You can use Tailwind CSS classes for styling.
          </p>
        </div>
      </div>
    </div>
  );
}`,

  dashboard: (name) => `import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, DollarSign } from 'lucide-react';

export default function ${toPascalCase(name)}() {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { name: 'Total Revenue', value: '$45,231', icon: DollarSign, change: '+20.1%' },
    { name: 'Active Users', value: '2,345', icon: Users, change: '+15.3%' },
    { name: 'Growth Rate', value: '12.5%', icon: TrendingUp, change: '+2.4%' },
    { name: 'Analytics', value: '1,234', icon: BarChart3, change: '+8.2%' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            ${toTitleCase(name)}
          </h1>
          <p className="text-lg text-gray-600">
            Monitor your key metrics and performance indicators
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <stat.icon className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-green-600">{stat.change}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-600">{stat.name}</p>
            </div>
          ))}
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex space-x-1 mb-6">
            {['overview', 'analytics', 'reports'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={\`px-4 py-2 rounded-lg font-medium transition-colors \${
                  activeTab === tab
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }\`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="min-h-96">
            {activeTab === 'overview' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Overview</h3>
                <p className="text-gray-600">Add your overview content here.</p>
              </div>
            )}
            {activeTab === 'analytics' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Analytics</h3>
                <p className="text-gray-600">Add your analytics charts and data here.</p>
              </div>
            )}
            {activeTab === 'reports' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Reports</h3>
                <p className="text-gray-600">Add your reports and data exports here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}`,

  form: (name) => `import React, { useState } from 'react';
import { Send, User, Mail, MessageSquare } from 'lucide-react';

export default function ${toPascalCase(name)}() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Form submitted:', formData);
    alert('Form submitted successfully!');
    
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ${toTitleCase(name)}
          </h1>
          <p className="text-lg text-gray-600">
            Fill out the form below and we'll get back to you soon.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                <MessageSquare className="w-4 h-4 inline mr-2" />
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                placeholder="Enter your message"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}`,

  chart: (name) => `import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, BarChart3, PieChart } from 'lucide-react';

export default function ${toPascalCase(name)}() {
  const [chartType, setChartType] = useState('bar');

  const data = [
    { name: 'Jan', value: 400, growth: 240 },
    { name: 'Feb', value: 300, growth: 139 },
    { name: 'Mar', value: 200, growth: 980 },
    { name: 'Apr', value: 278, growth: 390 },
    { name: 'May', value: 189, growth: 480 },
    { name: 'Jun', value: 239, growth: 380 },
    { name: 'Jul', value: 349, growth: 430 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            ${toTitleCase(name)}
          </h1>
          <p className="text-lg text-gray-600">
            Interactive data visualization and analytics
          </p>
        </div>

        {/* Chart Type Selector */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Chart Type</h2>
          <div className="flex space-x-4">
            <button
              onClick={() => setChartType('bar')}
              className={\`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors \${
                chartType === 'bar'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }\`}
            >
              <BarChart3 className="w-4 h-4" />
              Bar Chart
            </button>
            <button
              onClick={() => setChartType('line')}
              className={\`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors \${
                chartType === 'line'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }\`}
            >
              <TrendingUp className="w-4 h-4" />
              Line Chart
            </button>
          </div>
        </div>

        {/* Chart Container */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Data Visualization</h2>
          
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === 'bar' ? (
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              ) : (
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="growth" 
                    stroke="#10B981" 
                    strokeWidth={3}
                    dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Data Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Value</h3>
            <p className="text-3xl font-bold text-blue-600">
              {data.reduce((sum, item) => sum + item.value, 0).toLocaleString()}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Average</h3>
            <p className="text-3xl font-bold text-green-600">
              {Math.round(data.reduce((sum, item) => sum + item.value, 0) / data.length).toLocaleString()}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Peak Value</h3>
            <p className="text-3xl font-bold text-purple-600">
              {Math.max(...data.map(item => item.value)).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}`
};

/**
 * Generate a new page
 */
function generatePage(pageName, template = 'basic') {
  const projectRoot = path.join(__dirname, '..');
  const pagesDir = path.join(projectRoot, 'src', 'pages');
  
  if (!fs.existsSync(pagesDir)) {
    console.error('❌ Pages directory not found!');
    process.exit(1);
  }
  
  if (!templates[template]) {
    console.error(`❌ Template "${template}" not found!`);
    console.log('Available templates:', Object.keys(templates).join(', '));
    process.exit(1);
  }
  
  const fileName = `${pageName}.tsx`;
  const filePath = path.join(pagesDir, fileName);
  
  if (fs.existsSync(filePath)) {
    console.error(`❌ File "${fileName}" already exists!`);
    process.exit(1);
  }
  
  const content = templates[template](pageName);
  
  try {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Generated page: ${fileName}`);
    console.log(`📁 Location: src/pages/${fileName}`);
    console.log(`🌐 URL: /${pageName}`);
    console.log(`📝 Title: ${toTitleCase(pageName)}`);
    
    // Check if dependencies are needed
    if (template === 'chart') {
      console.log('\n📦 This template requires recharts:');
      console.log('npm install recharts');
    }
    
  } catch (error) {
    console.error('❌ Failed to create page:', error.message);
    process.exit(1);
  }
}

/**
 * List available templates
 */
function listTemplates() {
  console.log('📋 Available page templates:\n');
  
  const templateInfo = {
    basic: 'Simple page with basic layout and styling',
    dashboard: 'Interactive dashboard with stats and tabs',
    form: 'Contact form with validation and submission',
    chart: 'Data visualization with interactive charts (requires recharts)'
  };
  
  Object.entries(templateInfo).forEach(([name, description]) => {
    console.log(`${name.padEnd(12)} - ${description}`);
  });
  
  console.log('\nUsage:');
  console.log('node generate-page.js my-page-name [template]');
  console.log('node generate-page.js my-dashboard dashboard');
}

// Main execution
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h') || args.length === 0) {
    console.log(`
Usage: node generate-page.js <page-name> [template]

Arguments:
  page-name    Name of the page (kebab-case recommended)
  template     Template to use (default: basic)

Options:
  --list, -l   List available templates
  --help, -h   Show this help message

Examples:
  node generate-page.js my-new-page
  node generate-page.js user-dashboard dashboard
  node generate-page.js contact-form form
  node generate-page.js sales-charts chart
`);
    process.exit(0);
  }
  
  if (args.includes('--list') || args.includes('-l')) {
    listTemplates();
    process.exit(0);
  }
  
  const pageName = args[0];
  const template = args[1] || 'basic';
  
  if (!pageName) {
    console.error('❌ Page name is required!');
    process.exit(1);
  }
  
  // Validate page name
  if (!/^[a-z0-9-]+$/.test(pageName)) {
    console.error('❌ Page name should only contain lowercase letters, numbers, and hyphens!');
    process.exit(1);
  }
  
  generatePage(pageName, template);
}

module.exports = { generatePage, templates, toPascalCase, toTitleCase };
