import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Types
interface Module {
  id: number;
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  topics: string[];
  content: {
    overview: string;
    keyPoints: string[];
    practicalExample: string;
  };
  completed: boolean;
}

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface CodeExample {
  title: string;
  code: string;
}

// Learning modules data with comprehensive content
const learningModules: Module[] = [
  {
    id: 1,
    title: "Understanding MCP and FastMCP Fundamentals",
    description: "Learn the core concepts of Model Context Protocol and FastMCP's role in the AI ecosystem",
    duration: "45 min",
    difficulty: "Beginner",
    topics: [
      "What is the Model Context Protocol (MCP) and why it matters",
      "How FastMCP simplifies MCP server development", 
      "Understanding the three pillars: tools, resources, and prompts",
      "MCP architecture and communication patterns",
      "Benefits of using FastMCP over traditional approaches",
      "Real-world applications and use cases"
    ],
    content: {
      overview: `The Model Context Protocol (MCP) represents a revolutionary approach to connecting AI models with external data sources and tools. Often described as "the HTTP of AI," MCP provides a standardized way for AI applications to securely access and interact with various data sources, APIs, and tools in a controlled manner.

FastMCP is a Python framework that dramatically simplifies the process of building MCP servers. While the core MCP specification provides the foundation for AI-tool communication, implementing MCP servers from scratch can be complex and time-consuming. FastMCP abstracts away much of this complexity, allowing developers to focus on building functionality rather than managing protocol details.

Think of FastMCP as the Express.js of the MCP world - it provides a simple, intuitive API for creating powerful MCP servers with minimal boilerplate code.`,
      
      keyPoints: [
        "MCP is a standardized protocol for AI-tool communication, often called 'the HTTP of AI'",
        "FastMCP simplifies MCP server development by abstracting protocol complexity",
        "The three pillars of MCP are tools (actions), resources (data), and prompts (templates)",
        "FastMCP 2.0 represents a mature, production-ready framework integrated with the official MCP ecosystem",
        "The framework enables rapid development of powerful AI integrations with minimal boilerplate code"
      ],
      
      practicalExample: `Understanding MCP is like understanding how web browsers communicate with web servers. Just as HTTP provides a standard way for browsers to request web pages, MCP provides a standard way for AI models to request tools and data from external systems safely and efficiently.

When you use an AI assistant that can check your calendar, send emails, or look up information in databases, it's likely using something similar to MCP to communicate with those external systems safely and efficiently.`
    },
    completed: false
  },
  {
    id: 2,
    title: "Installation and Environment Setup",
    description: "Set up your development environment and install FastMCP with best practices",
    duration: "30 min",
    difficulty: "Beginner",
    topics: [
      "Python environment requirements and setup",
      "Virtual environment creation and management",
      "Installing FastMCP and dependencies",
      "Project structure and organization best practices",
      "Development tools and editor configuration",
      "Troubleshooting common installation issues"
    ],
    content: {
      overview: `Setting up a proper development environment is crucial for successful FastMCP development. This module covers everything from Python installation to project organization, ensuring you have a solid foundation for building FastMCP servers.

A clean, isolated Python environment prevents conflicts between different projects and ensures reproducible installations across different machines. We'll walk through creating virtual environments, installing FastMCP, and setting up a project structure that scales with your development needs.`,
      
      keyPoints: [
        "FastMCP requires Python 3.8+ and works best with virtual environments",
        "Installation is straightforward using pip, with optional development dependencies available",
        "Good project structure and configuration management are essential for maintainable code",
        "Testing your installation early helps identify and resolve issues quickly",
        "Establishing good development practices from the beginning saves time and prevents problems"
      ],
      
      practicalExample: `Think of setting up your FastMCP environment like preparing a kitchen for cooking. You need the right tools (Python, pip, editor), a clean workspace (virtual environment), and organized ingredients (project structure). Just as a well-organized kitchen makes cooking more efficient, a properly configured development environment makes FastMCP development smoother and more productive.`
    },
    completed: false
  },
  {
    id: 3,
    title: "Creating Your First FastMCP Server",
    description: "Build and test your first functional FastMCP server with basic tools and resources",
    duration: "60 min",
    difficulty: "Beginner",
    topics: [
      "Understanding the FastMCP server lifecycle and execution model",
      "Creating your first server with tools, resources, and prompts",
      "Implementing proper type hints and documentation",
      "Testing and debugging your FastMCP server",
      "Error handling and robustness patterns",
      "Advanced tool patterns and best practices"
    ],
    content: {
      overview: `In this hands-on module, you'll create your first complete FastMCP server from scratch. We'll implement tools for actions, resources for data access, and prompts for standardized interactions. You'll learn the patterns and practices that make FastMCP servers robust and maintainable.

By the end of this module, you'll have a working server that demonstrates all the core FastMCP concepts and serves as a foundation for more complex implementations.`,
      
      keyPoints: [
        "FastMCP servers are built around tools (actions), resources (data), and prompts (templates)",
        "Type hints and documentation are crucial for proper MCP integration",
        "Error handling and input validation are essential for robust servers",
        "Testing should cover normal operation, edge cases, and error conditions",
        "Good design patterns make servers more maintainable and extensible"
      ],
      
      practicalExample: `Building your first FastMCP server is like constructing a Swiss Army knife for AI models. Each tool you create is like adding a new blade or function - a screwdriver for data manipulation, scissors for text processing, or a magnifying glass for information lookup. The server itself is the handle that holds everything together and makes it easy for AI models to access and use these capabilities.`
    },
    completed: false
  },
  {
    id: 4,
    title: "Mastering Tools - The Core Building Blocks",
    description: "Deep dive into creating sophisticated tools with advanced parameter types",
    duration: "90 min",
    difficulty: "Intermediate",
    topics: [
      "Advanced tool patterns and parameter handling",
      "Async tools and performance optimization", 
      "Complex data types and validation",
      "Tool composition and reusability",
      "Integration with external APIs and services",
      "Security considerations and best practices"
    ],
    content: {
      overview: `Tools are the fundamental building blocks of FastMCP servers, representing the actions or capabilities that an AI model can invoke. This module provides a deep dive into creating sophisticated tools with advanced parameter types, error handling, and best practices for performance and security.

Mastering tool creation is essential for building powerful FastMCP applications. We'll cover everything from handling complex data structures and asynchronous operations to implementing proper validation and security measures.`,
      
      keyPoints: [
        "Advanced parameter handling with complex data types and Pydantic models",
        "Asynchronous tools for non-blocking operations and better performance",
        "Robust error handling and input validation strategies",
        "Tool composition patterns for building reusable components",
        "Security best practices for tool development and external integrations"
      ],
      
      practicalExample: `Imagine building an AI assistant for an online store. You'd create tools like get_product_details() for fetching product info, update_inventory() for stock management, and process_refund() for handling returns. Each tool needs proper validation, error handling, and potentially async operations for API calls.`
    },
    completed: false
  },
  {
    id: 5,
    title: "Working with Resources and Templates",
    description: "Learn to expose data sources and create dynamic content generators",
    duration: "75 min",
    difficulty: "Intermediate",
    topics: [
      "Resource patterns and data access strategies",
      "Dynamic resource generation",
      "Template systems and content generation",
      "Caching and performance optimization",
      "Database integration patterns",
      "File system and external data sources"
    ],
    content: {
      overview: `Resources in FastMCP represent data sources or stateful information that tools can access or that can be directly queried by an AI model. Templates allow for dynamic content generation, often used for creating structured prompts or formatted outputs.

You'll learn various patterns for exposing data, from simple in-memory stores to integrations with databases and external file systems. We'll also cover how to build powerful template systems for generating dynamic, context-aware content.`,
      
      keyPoints: [
        "Resource definition using @mcp.resource decorator",
        "Data access patterns from in-memory to database-backed resources",
        "Dynamic resource generation and caching strategies",
        "Template systems for structured content generation",
        "Integration with databases and external data sources"
      ],
      
      practicalExample: `Consider an AI travel assistant that uses resources like available_destinations (from a database) and user_preferences (user-specific data), plus templates for generating personalized trip recommendations and formatting search results into user-friendly summaries.`
    },
    completed: false
  },
  {
    id: 6,
    title: "Creating Effective Prompts",
    description: "Design reusable message templates that guide LLM interactions",
    duration: "60 min",
    difficulty: "Intermediate",
    topics: [
      "Prompt design principles and best practices",
      "Dynamic prompt generation",
      "Context-aware prompting strategies",
      "Prompt templates and reusability",
      "Testing and optimizing prompts",
      "Integration with tools and resources"
    ],
    content: {
      overview: `In the context of MCP and FastMCP, prompts are reusable message templates that guide LLM interactions. They provide a standardized way to structure communication between your MCP server and AI models.

You'll learn the principles of prompt engineering within the MCP context, how to create dynamic prompts that adapt to different scenarios, and how to test and optimize prompts for better performance.`,
      
      keyPoints: [
        "Prompt design principles for clarity, specificity, and effectiveness",
        "MCP prompt structure and protocol integration",
        "Dynamic prompt generation with parameters and context",
        "Testing and optimization strategies for prompt effectiveness",
        "Integration patterns between prompts, tools, and resources"
      ],
      
      practicalExample: `A customer service AI system might use prompts like Support Ticket Analysis (categorizing issues), Product Recommendation (personalized suggestions), and Escalation Decision (determining when human intervention is needed), each carefully crafted with the right context and instructions.`
    },
    completed: false
  },
  {
    id: 7,
    title: "Advanced Features and Integration",
    description: "Explore FastMCP 2.0's advanced capabilities and platform integrations",
    duration: "120 min",
    difficulty: "Advanced",
    topics: [
      "FastMCP 2.0 advanced features",
      "Platform integrations and deployment",
      "Scaling and performance optimization",
      "Monitoring and observability",
      "Security and authentication",
      "Custom transport layers"
    ],
    content: {
      overview: `FastMCP 2.0 introduces a range of advanced features that enable sophisticated AI applications and seamless integration with various platforms and services. This module explores these cutting-edge capabilities.

You'll learn how to leverage FastMCP's most powerful features to build production-ready applications that can handle complex workflows, integrate with existing infrastructure, and scale to meet enterprise demands.`,
      
      keyPoints: [
        "FastMCP 2.0 architecture and enhanced capabilities",
        "Custom transport layers beyond stdio (HTTP, WebSocket)",
        "Platform integrations with Claude Desktop, VS Code, and other environments",
        "Middleware implementation for logging, authentication, and rate limiting",
        "Advanced monitoring and observability features"
      ],
      
      practicalExample: `An enterprise AI platform might use custom HTTP transport for web integration, authentication middleware for security, rate limiting for fair usage, distributed tracing for monitoring, and dynamic configuration for runtime adjustments without restarts.`
    },
    completed: false
  },
  {
    id: 8,
    title: "Testing and Deployment",
    description: "Learn comprehensive testing strategies and deployment best practices",
    duration: "90 min",
    difficulty: "Advanced",
    topics: [
      "Unit testing FastMCP servers",
      "Integration testing strategies",
      "Performance testing and benchmarking",
      "Deployment patterns and environments",
      "CI/CD pipeline setup",
      "Production monitoring and maintenance"
    ],
    content: {
      overview: `Robust testing and reliable deployment are essential for production FastMCP applications. This module covers comprehensive testing strategies, from unit tests for individual tools to integration tests for complete server functionality.

You'll learn deployment best practices, including containerization, environment management, and continuous integration/continuous deployment (CI/CD) pipelines.`,
      
      keyPoints: [
        "Unit testing strategies for tools, resources, and prompts",
        "Integration testing and MCP protocol compliance",
        "Mocking external dependencies and async operations",
        "Performance testing and load simulation",
        "Deployment strategies from simple scripts to containerized solutions"
      ],
      
      practicalExample: `A financial services FastMCP server would need unit tests for calculation accuracy, integration tests for complete workflows, performance tests for trading volume, security tests for data protection, and a deployment pipeline with zero-downtime updates.`
    },
    completed: false
  },
  {
    id: 9,
    title: "Production Best Practices and Troubleshooting",
    description: "Master production deployment, monitoring, and troubleshooting techniques",
    duration: "105 min",
    difficulty: "Advanced",
    topics: [
      "Production deployment strategies",
      "Monitoring and alerting setup",
      "Performance optimization techniques",
      "Common issues and troubleshooting",
      "Scaling and load management",
      "Security hardening and compliance"
    ],
    content: {
      overview: `Running FastMCP servers in production requires careful attention to reliability, security, performance, and maintainability. This final module covers the essential practices for operating FastMCP applications at scale.

You'll learn how to identify and resolve common issues, implement robust logging and alerting systems, and establish processes for maintaining and updating production FastMCP servers.`,
      
      keyPoints: [
        "Production architecture for high availability and fault tolerance",
        "Security hardening with access controls and encryption",
        "Performance optimization and resource management",
        "Comprehensive monitoring and incident response procedures",
        "Maintenance strategies and update procedures"
      ],
      
      practicalExample: `A large e-commerce platform using FastMCP for AI customer service would implement high availability deployment, comprehensive monitoring, automated scaling, security measures, incident response procedures, and regular security audits for compliance.`
    },
    completed: false
  }
];

// Quiz questions for each module
const quizQuestions: Record<number, QuizQuestion[]> = {
  1: [
    {
      id: 1,
      question: "What is the primary purpose of the Model Context Protocol (MCP)?",
      options: [
        "To replace HTTP for web communication",
        "To provide a standardized way for AI models to access external tools and data",
        "To create faster AI models",
        "To manage database connections"
      ],
      correct: 1,
      explanation: "MCP provides a standardized protocol for AI models to securely access and interact with external data sources, APIs, and tools."
    },
    {
      id: 2,
      question: "What are the three core pillars of MCP?",
      options: [
        "Servers, Clients, and Protocols",
        "Input, Processing, and Output",
        "Tools, Resources, and Prompts",
        "Authentication, Authorization, and Accounting"
      ],
      correct: 2,
      explanation: "The three core pillars of MCP are Tools (actions), Resources (data), and Prompts (templates)."
    },
    {
      id: 3,
      question: "How is FastMCP best described in relation to MCP?",
      options: [
        "A replacement for MCP",
        "A Python framework that simplifies building MCP servers",
        "A client for connecting to MCP servers",
        "A database for storing MCP data"
      ],
      correct: 1,
      explanation: "FastMCP is a Python framework that dramatically simplifies the process of building MCP servers by abstracting away protocol complexity."
    }
  ],
  2: [
    {
      id: 1,
      question: "What is the minimum Python version required for FastMCP?",
      options: [
        "Python 3.6",
        "Python 3.7",
        "Python 3.8",
        "Python 3.9"
      ],
      correct: 2,
      explanation: "FastMCP requires Python 3.8 or higher, with Python 3.9+ recommended for the best experience."
    },
    {
      id: 2,
      question: "What is the recommended way to install FastMCP?",
      options: [
        "Download from GitHub and compile",
        "Use pip in a virtual environment",
        "Install globally with sudo",
        "Use conda only"
      ],
      correct: 1,
      explanation: "The recommended approach is to use pip within a virtual environment to avoid conflicts and ensure clean installations."
    }
  ],
  3: [
    {
      id: 1,
      question: "What decorator is used to register a function as a FastMCP tool?",
      options: [
        "@tool",
        "@mcp.tool",
        "@fastmcp.tool",
        "@register_tool"
      ],
      correct: 1,
      explanation: "The @mcp.tool decorator is used to register Python functions as MCP tools that can be invoked by AI models."
    },
    {
      id: 2,
      question: "What information does FastMCP automatically extract from a tool function?",
      options: [
        "Only the function name",
        "Function name and parameters",
        "Function name, docstring, and type annotations",
        "Only the docstring"
      ],
      correct: 2,
      explanation: "FastMCP automatically uses the function name as the tool name, the docstring as description, and type annotations for schema generation."
    }
  ]
};

// Code examples for different modules
const codeExamples: Record<number, CodeExample> = {
  1: {
    title: "Basic FastMCP Server Structure",
    code: `from fastmcp import FastMCP

# Create a new FastMCP server instance
mcp = FastMCP(
    name="My First Server",
    description="A simple FastMCP server for learning"
)

@mcp.tool
def greet(name: str) -> str:
    """Generate a personalized greeting."""
    return f"Hello, {name}! Welcome to FastMCP!"

if __name__ == "__main__":
    mcp.run()`
  },
  2: {
    title: "Installation Commands",
    code: `# Create virtual environment
python -m venv fastmcp-env

# Activate virtual environment (Windows)
fastmcp-env\\Scripts\\activate

# Activate virtual environment (macOS/Linux)
source fastmcp-env/bin/activate

# Install FastMCP
pip install fastmcp

# Verify installation
python -c "import fastmcp; print(fastmcp.__version__)"`
  },
  3: {
    title: "Complete First Server Example",
    code: `from fastmcp import FastMCP
import time

# Create the FastMCP server instance
mcp = FastMCP(
    name="My First Server",
    description="A simple FastMCP server for learning"
)

start_time = time.time()

@mcp.tool
def greet(name: str) -> str:
    """Generate a personalized greeting."""
    return f"Hello, {name}! Welcome to FastMCP!"

@mcp.tool
def calculate(expression: str) -> str:
    """Safely evaluate a mathematical expression."""
    try:
        # Only allow safe mathematical operations
        allowed_chars = set('0123456789+-*/().')
        if not all(c in allowed_chars or c.isspace() for c in expression):
            return "Error: Only basic mathematical operations are allowed"
        
        result = eval(expression)
        return f"{expression} = {result}"
    except Exception as e:
        return f"Error calculating {expression}: {str(e)}"

@mcp.resource("server-info")
def get_server_info() -> dict:
    """Get information about this FastMCP server."""
    uptime = time.time() - start_time
    return {
        "name": "My First Server",
        "version": "1.0.0",
        "uptime_seconds": round(uptime, 2),
        "tools_count": 2,
        "resources_count": 1
    }

if __name__ == "__main__":
    mcp.run()`
  },
  4: {
    title: "Advanced Tools with Async Operations",
    code: `from fastmcp import FastMCP
from pydantic import BaseModel
from typing import List, Optional
import asyncio
import aiohttp

mcp = FastMCP(name="Advanced Tools Server")

class ProductInfo(BaseModel):
    id: str
    name: str
    price: float
    stock: int
    description: Optional[str] = None

@mcp.tool
async def get_product_details(product_id: str) -> ProductInfo:
    """Fetch product information from external API."""
    async with aiohttp.ClientSession() as session:
        async with session.get(f"https://api.example.com/products/{product_id}") as response:
            if response.status == 200:
                data = await response.json()
                return ProductInfo(**data)
            else:
                raise Exception(f"Product not found: {product_id}")

@mcp.tool
def update_inventory(product_id: str, new_stock: int, reason: str) -> dict:
    """Update product inventory with validation."""
    if new_stock < 0:
        raise ValueError("Stock level cannot be negative")
    
    return {
        "success": True,
        "product_id": product_id,
        "old_stock": 50,
        "new_stock": new_stock,
        "reason": reason,
        "updated_at": "2024-01-01T12:00:00Z"
    }

if __name__ == "__main__":
    mcp.run()`
  },
  5: {
    title: "Resources and Templates",
    code: `from fastmcp import FastMCP
import json
from datetime import datetime

mcp = FastMCP(name="Resources Server")

# In-memory data store
destinations_data = [
    {"name": "Bali", "type": "beach", "avg_cost": 3000},
    {"name": "Rome", "type": "culture", "avg_cost": 4000},
    {"name": "Bangkok", "type": "food", "avg_cost": 2500}
]

@mcp.resource("available-destinations")
def get_destinations() -> dict:
    """Get list of available travel destinations."""
    return {
        "destinations": destinations_data,
        "last_updated": datetime.now().isoformat()
    }

@mcp.tool
def generate_trip_recommendation(budget: int, interests: list) -> str:
    """Generate personalized trip recommendations."""
    suitable_destinations = [
        dest for dest in destinations_data
        if dest["avg_cost"] <= budget and dest["type"] in interests
    ]
    
    if not suitable_destinations:
        return "No suitable destinations found within your criteria."
    
    recommendations = []
    for dest in suitable_destinations[:3]:
        recommendations.append(
            f"- {dest['name']}: Perfect for {dest['type']} lovers, "
            f"estimated cost ${dest['avg_cost']}"
        )
    
    return "Based on your preferences:\\n" + "\\n".join(recommendations)

if __name__ == "__main__":
    mcp.run()`
  },
  6: {
    title: "Effective Prompts",
    code: `from fastmcp import FastMCP
from typing import Dict, List

mcp = FastMCP(name="Prompt Templates Server")

@mcp.prompt("customer-support-analysis")
def customer_support_prompt(
    customer_message: str,
    customer_history: List[Dict] = None,
    urgency_indicators: List[str] = None
) -> str:
    """Generate a prompt for analyzing customer support tickets."""
    
    base_prompt = f"""
Analyze the following customer message and provide a structured response:

Customer Message: "{customer_message}"
"""
    
    if customer_history:
        base_prompt += f"\\nCustomer History: {len(customer_history)} previous interactions"
    
    if urgency_indicators:
        base_prompt += f"\\nUrgency Indicators: {', '.join(urgency_indicators)}"
    
    base_prompt += """

Please provide:
1. Issue Category (Technical, Billing, General Inquiry, Complaint)
2. Urgency Level (Low, Medium, High, Critical)
3. Suggested Response Strategy
4. Required Follow-up Actions
5. Escalation Recommendation (Yes/No with reasoning)
"""
    
    return base_prompt

if __name__ == "__main__":
    mcp.run()`
  },
  7: {
    title: "Advanced Features with Middleware",
    code: `from fastmcp import FastMCP
from fastmcp.middleware import RateLimitMiddleware, AuthMiddleware
import asyncio
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

mcp = FastMCP(
    name="Advanced Features Server",
    description="Demonstrating FastMCP 2.0 advanced capabilities"
)

# Add middleware
mcp.add_middleware(RateLimitMiddleware(requests_per_minute=100))
mcp.add_middleware(AuthMiddleware(require_auth=True))

@mcp.tool
async def process_large_dataset(dataset_url: str, processing_type: str = "analysis") -> dict:
    """Process large datasets with progress tracking."""
    logger.info(f"Starting {processing_type} for dataset: {dataset_url}")
    
    # Simulate processing with progress updates
    for step in range(10):
        await asyncio.sleep(0.1)
        progress = (step + 1) / 10 * 100
        logger.info(f"Processing progress: {progress:.1f}%")
    
    return {
        "status": "completed",
        "processing_type": processing_type,
        "records_processed": 10000,
        "processing_time_seconds": 1.0
    }

if __name__ == "__main__":
    mcp.run(transport="http", host="0.0.0.0", port=8000)`
  },
  8: {
    title: "Testing FastMCP Servers",
    code: `import pytest
import asyncio
from unittest.mock import Mock, patch
from fastmcp import FastMCP

@pytest.fixture
def test_server():
    mcp = FastMCP(name="Test Server")
    
    @mcp.tool
    def add_numbers(a: int, b: int) -> int:
        """Add two numbers together."""
        return a + b
    
    @mcp.tool
    async def fetch_data(url: str) -> dict:
        """Fetch data from a URL."""
        return {"url": url, "status": "success"}
    
    return mcp

class TestFastMCPServer:
    def test_add_numbers_tool(self, test_server):
        """Test the add_numbers tool."""
        tool = test_server.get_tool("add_numbers")
        result = tool(5, 3)
        assert result == 8
    
    @pytest.mark.asyncio
    async def test_fetch_data_tool(self, test_server):
        """Test the async fetch_data tool."""
        tool = test_server.get_tool("fetch_data")
        result = await tool("https://api.example.com/data")
        assert result["status"] == "success"
    
    def test_server_configuration(self, test_server):
        """Test server configuration."""
        assert test_server.name == "Test Server"
        assert len(test_server.tools) == 2`
  },
  9: {
    title: "Production Server Configuration",
    code: `from fastmcp import FastMCP
from fastmcp.middleware import (
    LoggingMiddleware, MetricsMiddleware, SecurityMiddleware
)
import os
import logging
from datetime import datetime

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

mcp = FastMCP(
    name="Production FastMCP Server",
    description="Production-ready FastMCP server",
    version=os.getenv("APP_VERSION", "1.0.0")
)

# Add production middleware
mcp.add_middleware(SecurityMiddleware(api_key_required=True))
mcp.add_middleware(LoggingMiddleware(log_requests=True))
mcp.add_middleware(MetricsMiddleware(enable_prometheus=True))

@mcp.tool
def health_check() -> dict:
    """Comprehensive health check for monitoring."""
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "version": mcp.version,
        "uptime_seconds": 86400
    }

@mcp.tool
def get_production_metrics() -> dict:
    """Get detailed production metrics."""
    return {
        "performance": {
            "requests_per_second": 125.5,
            "average_response_time_ms": 85,
            "error_rate_percent": 0.05
        },
        "business_metrics": {
            "active_users": 1250,
            "transactions_per_hour": 450
        }
    }

if __name__ == "__main__":
    mcp.run(
        transport="http",
        host="0.0.0.0",
        port=int(os.getenv("PORT", "8000")),
        enable_cors=True,
        enable_metrics=True
    )`
  }
};

// Main Component
const FastMCPLearningPlatform: React.FC = () => {
  const [currentModule, setCurrentModule] = useState<number | null>(null);
  const [currentQuiz, setCurrentQuiz] = useState<number | null>(null);
  const [completedModules, setCompletedModules] = useState<Set<number>>(new Set());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [studyTime, setStudyTime] = useState(0);
  const [isStudying, setIsStudying] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizResults, setQuizResults] = useState<any>(null);

  // Study timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isStudying) {
      interval = setInterval(() => {
        setStudyTime(time => time + 1);
      }, 1000);
    } else if (!isStudying && studyTime !== 0) {
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isStudying, studyTime]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startModule = (moduleId: number) => {
    setCurrentModule(moduleId);
    setCurrentQuiz(null);
    setSidebarOpen(false);
    if (!isStudying) setIsStudying(true);
  };

  const completeModule = (moduleId: number) => {
    setCompletedModules(prev => new Set([...prev, moduleId]));
    setCurrentModule(null);
  };

  const startQuiz = (moduleId: number) => {
    setCurrentQuiz(moduleId);
    setQuizAnswers({});
    setQuizResults(null);
  };

  const submitQuiz = () => {
    const questions = quizQuestions[currentQuiz!] || [];
    const results = questions.map(q => ({
      ...q,
      userAnswer: quizAnswers[q.id],
      correct: quizAnswers[q.id] === q.correct
    }));
    
    const correctCount = results.filter(r => r.correct).length;
    const percentage = Math.round((correctCount / questions.length) * 100);
    
    setQuizResults({
      results,
      correctCount,
      totalQuestions: questions.length,
      percentage
    });
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setQuizResults(null);
  };

  const overallProgress = (completedModules.size / learningModules.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
      {/* Mobile-First Header */}
      <header className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
        <div className="px-4 sm:px-6">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 lg:hidden rounded-md hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                {sidebarOpen ? '✕' : '☰'}
              </button>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs sm:text-sm font-bold">📚</span>
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">FastMCP</h1>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 hidden sm:block">Interactive Learning</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="hidden xs:flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                <span>🏆</span>
                <span>{completedModules.size}/{learningModules.length}</span>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                <span>{isStudying ? '⏸️' : '▶️'}</span>
                <span className="font-mono">{formatTime(studyTime)}</span>
              </div>
              <button
                onClick={() => setIsStudying(!isStudying)}
                className="text-xs px-2 py-1 sm:px-3 sm:py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {isStudying ? 'Pause' : 'Resume'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Mobile-First Sidebar */}
        <AnimatePresence>
          {(sidebarOpen || window.innerWidth >= 1024) && (
            <aside className="fixed inset-y-0 left-0 z-40 w-80 sm:w-96 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 lg:relative lg:translate-x-0 overflow-y-auto">
              <div className="p-4 sm:p-6 pt-20 lg:pt-6">
                <div className="mb-4 sm:mb-6">
                  <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white mb-2">
                    Learning Progress
                  </h2>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                      <span>{completedModules.size} of {learningModules.length} completed</span>
                      <span>{Math.round(overallProgress)}%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${overallProgress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {learningModules.map((module) => (
                    <div 
                      key={module.id} 
                      className={`cursor-pointer transition-all hover:shadow-md p-4 rounded-lg border ${
                        currentModule === module.id ? 'ring-2 ring-blue-500' : ''
                      } ${completedModules.has(module.id) ? 'bg-green-50 dark:bg-green-900/20 border-green-200' : 'bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600'}`}
                      onClick={() => startModule(module.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-sm text-slate-900 dark:text-white mb-1">
                            Module {module.id}: {module.title}
                          </h3>
                          <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                            {module.description}
                          </p>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-600 text-slate-700 dark:text-slate-300 rounded">
                              {module.difficulty}
                            </span>
                            <span className="text-xs text-slate-500">{module.duration}</span>
                          </div>
                        </div>
                        <div className="ml-2">
                          {completedModules.has(module.id) ? (
                            <span className="text-green-600 text-lg">✓</span>
                          ) : (
                            <span className="text-slate-400 text-lg">→</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          )}
        </AnimatePresence>

        {/* Mobile-First Main Content */}
        <main className="flex-1 p-3 sm:p-4 lg:p-6 min-h-screen">
          <AnimatePresence mode="wait">
            {!currentModule && !currentQuiz && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-4xl mx-auto text-center"
              >
                <div className="mb-8 sm:mb-12">
                  <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6">
                    Master FastMCP Development
                  </h1>
                  <p className="text-lg sm:text-xl lg:text-2xl text-slate-600 dark:text-slate-400 mb-6 sm:mb-8">
                    A comprehensive, interactive learning experience to become proficient in FastMCP
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
                    <div className="p-4 sm:p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
                      <div className="text-4xl mb-4">📚</div>
                      <h3 className="text-lg sm:text-xl font-semibold mb-2">9 Comprehensive Modules</h3>
                      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">From basics to advanced production deployment</p>
                    </div>
                    <div className="p-4 sm:p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
                      <div className="text-4xl mb-4">💻</div>
                      <h3 className="text-lg sm:text-xl font-semibold mb-2">Hands-on Practice</h3>
                      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">Real code examples and interactive exercises</p>
                    </div>
                    <div className="p-4 sm:p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
                      <div className="text-4xl mb-4">🏆</div>
                      <h3 className="text-lg sm:text-xl font-semibold mb-2">Certification Ready</h3>
                      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">Earn your FastMCP Mastery certificate</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => startModule(1)} 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors"
                  >
                    Begin Learning Journey
                  </button>
                  <p className="text-xs text-slate-500 text-center mt-4">
                    Estimated completion time: 20-25 hours
                  </p>
                </div>
              </motion.div>
            )}

            {currentModule && !currentQuiz && (
              <ModuleContent 
                module={learningModules.find(m => m.id === currentModule)!}
                onComplete={() => completeModule(currentModule)}
                onStartQuiz={() => startQuiz(currentModule)}
                onBack={() => setCurrentModule(null)}
              />
            )}

            {currentQuiz && (
              <QuizComponent
                moduleId={currentQuiz}
                questions={quizQuestions[currentQuiz] || []}
                answers={quizAnswers}
                onAnswerChange={setQuizAnswers}
                onSubmit={submitQuiz}
                onReset={resetQuiz}
                results={quizResults}
                onBack={() => setCurrentQuiz(null)}
              />
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

// Module Content Component
interface ModuleContentProps {
  module: Module;
  onComplete: () => void;
  onStartQuiz: () => void;
  onBack: () => void;
}

const ModuleContent: React.FC<ModuleContentProps> = ({ module, onComplete, onStartQuiz, onBack }) => {
  const [activeTab, setActiveTab] = useState("content");
  
  const codeExample = codeExamples[module.id];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto"
    >
      {/* Mobile-Optimized Header */}
      <div className="mb-4 sm:mb-6">
        <button 
          onClick={onBack} 
          className="mb-3 sm:mb-4 p-2 text-blue-600 hover:text-blue-800 flex items-center"
        >
          <span className="mr-2">←</span>
          <span className="hidden sm:inline">Back to Modules</span>
          <span className="sm:hidden">Back</span>
        </button>
        
        <div className="space-y-2 sm:space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">
              Module {module.id}: {module.title}
            </h1>
            <div className="flex items-center space-x-2">
              <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-600 text-slate-700 dark:text-slate-300 rounded">
                {module.difficulty}
              </span>
              <span className="text-sm text-slate-600 dark:text-slate-400">{module.duration}</span>
            </div>
          </div>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {module.description}
          </p>
        </div>
      </div>

      {/* Mobile-First Tabs */}
      <div className="w-full">
        <div className="flex border-b border-slate-200 dark:border-slate-700 mb-4 sm:mb-6">
          <button
            onClick={() => setActiveTab("content")}
            className={`flex-1 py-2 px-4 text-xs sm:text-sm font-medium border-b-2 transition-colors ${
              activeTab === "content"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            <span className="flex items-center justify-center">
              <span className="mr-1 sm:mr-2">📖</span>
              <span className="hidden xs:inline">Content</span>
            </span>
          </button>
          <button
            onClick={() => setActiveTab("examples")}
            className={`flex-1 py-2 px-4 text-xs sm:text-sm font-medium border-b-2 transition-colors ${
              activeTab === "examples"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            <span className="flex items-center justify-center">
              <span className="mr-1 sm:mr-2">💻</span>
              <span className="hidden xs:inline">Code</span>
            </span>
          </button>
          <button
            onClick={() => setActiveTab("practice")}
            className={`flex-1 py-2 px-4 text-xs sm:text-sm font-medium border-b-2 transition-colors ${
              activeTab === "practice"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            <span className="flex items-center justify-center">
              <span className="mr-1 sm:mr-2">🎯</span>
              <span className="hidden xs:inline">Practice</span>
            </span>
          </button>
        </div>

        {activeTab === "content" && (
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold mb-4">Module Overview</h2>
              
              {/* Overview Section */}
              <div className="space-y-3 mb-6">
                <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white">Overview</h3>
                <div className="prose prose-sm sm:prose max-w-none dark:prose-invert">
                  {module.content.overview.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Key Points Section */}
              <div className="space-y-3 mb-6">
                <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white">Key Learning Points</h3>
                <div className="space-y-2">
                  {module.content.keyPoints.map((point, index) => (
                    <div key={index} className="flex items-start space-x-2 sm:space-x-3">
                      <span className="text-green-600 mt-0.5 flex-shrink-0">✓</span>
                      <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300">{point}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Practical Example Section */}
              <div className="space-y-3 mb-6">
                <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white">Practical Example</h3>
                <div className="p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="flex items-start space-x-2">
                    <span className="text-blue-600 mt-0.5">💡</span>
                    <p className="text-sm sm:text-base text-blue-800 dark:text-blue-200">
                      {module.content.practicalExample}
                    </p>
                  </div>
                </div>
              </div>

              {/* Topics Covered */}
              <div className="space-y-3">
                <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white">Topics Covered</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {module.topics.map((topic, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 sm:p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                      <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                      <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "examples" && (
          <div className="space-y-4 sm:space-y-6">
            {codeExample && (
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold mb-4">{codeExample.title}</h2>
                <pre className="bg-slate-900 text-slate-100 p-3 sm:p-4 rounded-lg overflow-x-auto text-xs sm:text-sm">
                  <code>{codeExample.code}</code>
                </pre>
              </div>
            )}
          </div>
        )}

        {activeTab === "practice" && (
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold mb-4">Practice & Assessment</h2>
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 mb-4">
                Ready to test your knowledge? Take the module quiz to assess your understanding.
              </p>
              <button 
                onClick={onStartQuiz} 
                className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
              >
                <span className="mr-2">🎯</span>
                Take Module Quiz
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile-Optimized Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:justify-between mt-6">
        <button 
          onClick={onBack} 
          className="w-full sm:w-auto border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold py-2 px-4 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center"
        >
          <span className="mr-2">←</span>
          Back to Overview
        </button>
        <button 
          onClick={onComplete} 
          className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
        >
          <span className="mr-2">✓</span>
          Mark as Complete
        </button>
      </div>
    </motion.div>
  );
};

// Quiz Component
interface QuizComponentProps {
  moduleId: number;
  questions: QuizQuestion[];
  answers: Record<number, number>;
  onAnswerChange: (answers: Record<number, number>) => void;
  onSubmit: () => void;
  onReset: () => void;
  results: any;
  onBack: () => void;
}

const QuizComponent: React.FC<QuizComponentProps> = ({ 
  moduleId, 
  questions, 
  answers, 
  onAnswerChange, 
  onSubmit, 
  onReset, 
  results, 
  onBack 
}) => {
  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    onAnswerChange({
      ...answers,
      [questionId]: answerIndex
    });
  };

  const allAnswered = questions.every(q => answers[q.id] !== undefined);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto"
    >
      {/* Mobile-Optimized Header */}
      <div className="mb-4 sm:mb-6">
        <button 
          onClick={onBack} 
          className="mb-3 sm:mb-4 p-2 text-blue-600 hover:text-blue-800 flex items-center"
        >
          <span className="mr-2">←</span>
          <span className="text-sm">Back to Module</span>
        </button>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Module {moduleId} Quiz
        </h1>
        <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-400">
          Test your understanding of the module content
        </p>
      </div>

      {!results ? (
        <div className="space-y-4 sm:space-y-6">
          {questions.map((question, index) => (
            <div key={question.id} className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold mb-4">
                Question {index + 1}: {question.question}
              </h3>
              <div className="space-y-2 sm:space-y-3">
                {question.options.map((option, optionIndex) => (
                  <button
                    key={optionIndex}
                    onClick={() => handleAnswerSelect(question.id, optionIndex)}
                    className={`w-full p-3 sm:p-4 text-left rounded-lg border transition-colors text-sm sm:text-base ${
                      answers[question.id] === optionIndex
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    <span className="text-slate-700 dark:text-slate-300">{option}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:justify-between">
            <button 
              onClick={onBack} 
              className="w-full sm:w-auto border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold py-2 px-4 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center"
            >
              <span className="mr-2">←</span>
              Back to Module
            </button>
            <button 
              onClick={onSubmit} 
              disabled={!allAnswered}
              className={`w-full sm:w-auto font-semibold py-2 px-4 rounded-lg transition-colors ${
                allAnswered 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-slate-300 text-slate-500 cursor-not-allowed'
              }`}
            >
              Submit Quiz
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-6">
          <div className={`bg-white dark:bg-slate-800 rounded-lg shadow-md p-4 sm:p-6 border-2 ${
            results.percentage >= 80 ? 'border-green-500' : 'border-orange-500'
          }`}>
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Quiz Results</h2>
            <div className="text-center mb-4 sm:mb-6">
              <div className={`text-3xl sm:text-4xl font-bold mb-2 ${
                results.percentage >= 80 ? 'text-green-600' : 'text-orange-600'
              }`}>
                {results.percentage}%
              </div>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
                {results.correctCount} out of {results.totalQuestions} correct
              </p>
              <div className={`mt-3 sm:mt-4 p-3 sm:p-4 rounded-lg ${
                results.percentage >= 80 
                  ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200' 
                  : 'bg-orange-50 dark:bg-orange-900/20 text-orange-800 dark:text-orange-200'
              }`}>
                <p className="text-sm sm:text-base font-medium">
                  {results.percentage >= 80 
                    ? '🎉 Excellent work! You can proceed to the next module.' 
                    : '📚 Consider reviewing the material and retaking the quiz.'}
                </p>
              </div>
            </div>
          </div>

          {results.results.map((result: any, index: number) => (
            <div key={result.id} className={`bg-white dark:bg-slate-800 rounded-lg shadow-md p-4 sm:p-6 border ${
              result.correct ? 'border-green-200' : 'border-red-200'
            }`}>
              <h3 className={`text-base sm:text-lg font-semibold mb-4 ${
                result.correct ? 'text-green-800' : 'text-red-800'
              }`}>
                Question {index + 1}: {result.question}
                {result.correct ? ' ✓' : ' ✗'}
              </h3>
              <div className="space-y-2 mb-4">
                {result.options.map((option: string, optionIndex: number) => (
                  <div
                    key={optionIndex}
                    className={`p-2 sm:p-3 rounded border text-sm sm:text-base ${
                      optionIndex === result.correct
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                        : optionIndex === result.userAnswer && !result.correct
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                        : 'border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <span className="text-slate-700 dark:text-slate-300">{option}</span>
                    {optionIndex === result.correct && (
                      <span className="text-green-600 font-medium ml-2 text-xs sm:text-sm">✓ Correct</span>
                    )}
                    {optionIndex === result.userAnswer && !result.correct && (
                      <span className="text-red-600 font-medium ml-2 text-xs sm:text-sm">✗ Your answer</span>
                    )}
                  </div>
                ))}
              </div>
              <div className="p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 rounded">
                <p className="text-xs sm:text-sm text-blue-800 dark:text-blue-200">
                  <strong>Explanation:</strong> {result.explanation}
                </p>
              </div>
            </div>
          ))}

          {/* Mobile-Optimized Results Actions */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:justify-between pt-4">
            <button 
              onClick={onBack} 
              className="w-full sm:w-auto border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold py-2 px-4 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center"
            >
              <span className="mr-2">←</span>
              Back to Module
            </button>
            {results.percentage < 80 && (
              <button 
                onClick={onReset} 
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
              >
                <span className="mr-2">🔄</span>
                Retake Quiz
              </button>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default FastMCPLearningPlatform;