import { Link } from "lucide-react";

export const portfolioData = {
  personal: {
    name: "Abhishek Panda",
    title: "Software Development Engineer - Cloud & DevOps",
    location: "India",
    email: "abhishekpanda1999@gmail.com",
    linkedin: "https://www.linkedin.com/in/abhishek-panda1999/",
    github: "https://github.com/abhishekpanda1999",
    experience: "3+ years",
    bio: "Experienced Software Development Engineer specializing in cloud-native applications, microservices architecture, and full-stack development with Multi-cloud expertise.",
  },

  skills: {
    languages: ["JavaScript", "TypeScript", "Python", "PHP"],
    frontend: ["React", "Next.js", "Tailwind CSS"],
    backend: ["Node.js", "NestJS", "FastAPI", "Django", "Laravel"],
    cloud: [
      "AWS (EC2, Lambda, S3, CloudFormation, RDS, EKS, Bedrock and more)",
      "Docker",
      "Bash/Shell Scripting",
      "GCP (Compute Engine, Cloud Functions, GKE, Cloud Run, Gemini)",
      "Azure (VMs, Functions, Blob Storage)",
      "Kubernetes",
    ],
    databases: ["PostgreSQL", "Redis", "MySQL"],
    tools: ["Git", "CI/CD", "Jenkins", "GitHub Actions", "Terraform"],
  },

  projects: [
    {
      id: "1",
      name: "Cloud-Native E-Commerce Platform",
      description:
        "Scalable microservices-based e-commerce platform deployed on AWS with auto-scaling capabilities",
      technologies: [
        "React",
        "Node.js",
        "AWS Lambda",
        "DynamoDB",
        "API Gateway",
      ],
      github: "https://github.com/abhishekpanda1999/ecommerce-platform",
      live: "https://demo.ecommerce.com",
      highlights: [
        "Handles 10K+ concurrent users",
        "99.9% uptime with auto-scaling",
        "Serverless architecture reducing costs by 40%",
      ],
      status: "Production",
    },
    {
      id: "2",
      name: "Real-time Analytics Dashboard",
      description:
        "Real-time data visualization dashboard for monitoring application metrics and user behavior",
      technologies: [
        "Next.js",
        "TypeScript",
        "AWS CloudWatch",
        "WebSocket",
        "D3.js",
      ],
      github: "https://github.com/abhishekpanda1999/analytics-dashboard",
      live: "https://analytics.demo.com",
      highlights: [
        "Real-time data processing",
        "Custom visualization components",
        "Multi-tenant architecture",
      ],
      status: "Production",
    },
    {
      id: "3",
      name: "DevOps Automation Suite",
      description:
        "Automated CI/CD pipeline and infrastructure provisioning tool for rapid deployment",
      technologies: [
        "Python",
        "Terraform",
        "Docker",
        "Kubernetes",
        "GitHub Actions",
      ],
      github: "https://github.com/abhishekpanda1999/devops-suite",
      highlights: [
        "Reduced deployment time by 70%",
        "Infrastructure as Code",
        "Automated testing and rollback",
      ],
      status: "Active Development",
    },
    {
      id: "4",
      name: "Serverless API Gateway",
      description:
        "High-performance API gateway built with AWS Lambda and API Gateway for microservices",
      technologies: [
        "Node.js",
        "AWS Lambda",
        "API Gateway",
        "DynamoDB",
        "CloudFormation",
      ],
      github: "https://github.com/abhishekpanda1999/api-gateway",
      highlights: [
        "Sub-100ms response time",
        "Rate limiting and caching",
        "JWT authentication",
      ],
      status: "Production",
    },
  ],

  certifications: [
    {
      name: "AWS Certified Solutions Architect – Associate",
      issuer: "Amazon Web Services",
      date: "Feb 2024",
      credentialId: "248a3b43-a5f7-4e36-813f-a13c25458b62",
      icon: "FaAws",
      Link:"https://www.credly.com/badges/248a3b43-a5f7-4e36-813f-a13c25458b62/public_url",
    },
    {
      name: "Google Cloud Professional Cloud Architect",
      issuer: "Google Cloud",
      date: "Sept 2025",
      credentialId: "63ac8733-9c18-41c2-8060-474ae7bc6bac",
      icon: "SiGooglecloud",
      Link: "https://www.credly.com/badges/63ac8733-9c18-41c2-8060-474ae7bc6bac/public_url",
    },
    {
      name: "Google Cloud Associate Cloud Engineer",
      issuer: "Google Cloud",
      date: "Dec 2024",
      credentialId: "5b85f9f8-5291-41aa-b315-5f944136b81c",
      icon: "SiGooglecloud",
      Link: "https://www.credly.com/badges/5b85f9f8-5291-41aa-b315-5f944136b81c/public_url",
    },
    {
      name: "Microsoft Certified: Azure Fundamentals",
      issuer: "Microsoft",
      date: "Jun 2025",
      credentialId: "EB90B013FAA01CDA",
      icon: "SiMicrosoftazure",
      Link:"https://learn.microsoft.com/api/credentials/share/en-us/AbhishekPanda-6086/EB90B013FAA01CDA?sharingId=E82D31577B8D79D2",
    },
    {
      name: "Microsoft Certified: Azure AI Fundamentals",
      issuer: "Microsoft",
      date: "Jun 2024",
      credentialId: "C0ED524F40C4D5D",
      icon: "SiMicrosoftazure",
      Link: "https://learn.microsoft.com/api/credentials/share/en-us/AbhishekPanda-6086/C0ED524F40C4D5D?sharingId=E82D31577B8D79D2",
    },
  ],

  experience: [
    {
      company: "Hyscaler ",
      position: "Software Development Engineer (Cloud & Devops)",
      duration: "2024 - Present",
      location: "Bhubaneswar, India",
      responsibilities: [
        "Architected and deployed cloud-native applications on AWS",
        "Led migration of monolithic applications to microservices",
        "Implemented CI/CD pipelines reducing deployment time by 60%",
        "Mentored junior developers on best practices",
      ],
    },
    {
      company: "Hyscaler ",
      position: "Software Developer Engineer",
      duration: "2022 - 2024",
      location: "Bhubaneswar, India",
      responsibilities: [
        "Developed RESTful APIs using Node.js and Express",
        "Built responsive web applications with React",
        "Optimized database queries improving performance by 40%",
        "Collaborated with cross-functional teams",
      ],
    },
  ],

  education: [
    {
      degree: "Master in Computer Applications",
      institution: "Gangadhar Meher University, Odisha",
      year: "2022",
      grade: "",
    },
    {
      degree: "Bachelor in Computer Applications",
      institution: "Imperial College, Odisha",
      year: "2019",
      grade: "",
    },
  ],

  achievements: [
    "Developed and deployed CI/CD pipelines with GitLab CI, Amazon EKS, and Helm, reducing manual efforts by 90%.",
    "Built an AI-powered feedback bot with Amazon Lex and Bedrock, improving response rates by 25%.",
    "Upgraded the EKS cluster to bring out it from the extended support and saved 40% of cost along with nodegroups and addons",
    "Optimized docker image in CI/CD to reduce its size and optimize the performance by 60% using multi stage build and reducing the layers",
  ],

  blog: [
    {
      title: "Terraform with AWS: The IAC Magic 🪄💻",
      date: "2025-01",
      url: "https://medium.com/@abhishek.panda_69251/terraform-with-aws-the-iac-magic-90bb4d090b9d",
      views: "",
    },
    {
      title: "Deploying an EC2 Instance ASAP !",
      date: "2024-08",
      url: "https://medium.com/aws-tip/deploying-an-ec2-instance-asap-a7d25f7b3a97",
      views: "",
    },
    {
      title:
        "Launch Your First Website on AWS EC2 with Your Own Subdomain & HTTPS - The Beginner Friendly Way! 🌐🔒",
      date: "2025-09",
      url: "https://medium.com/@abhishek.panda0620/launch-your-first-website-on-aws-ec2-with-your-own-subdomain-https-the-beginner-friendly-1159e4aa1556",
      views: "",
    },
  ],
};

export type PortfolioData = typeof portfolioData;
