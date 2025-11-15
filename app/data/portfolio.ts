export const portfolioData = {
  personal: {
    name: "Abhishek Panda",
    title: "Software Development Engineer - Cloud & DevOps",
    location: "India",
    email: "abhishek.panda0620@gmail.com",
    linkedin: "https://www.linkedin.com/in/abhishek-panda1999/",
    github: "https://github.com/abhishekpanda0620",
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
      name: "Multi-AZ 3-Tier Deployment on EKS",
      description:
        "A highly available and scalable three-tier architecture deployed on Amazon EKS across multiple availability zones",
      technologies: [
        "Terraform",
        "Kubernetes",
        "AWS EKS",
        "HCL",
        "Docker",
      ],
      github: "https://github.com/abhishekpanda0620/multi-az-3tier-deployment-on-eks",
      highlights: [
        "High availability across multiple AZs",
        "Infrastructure as Code with Terraform",
        "Scalable Kubernetes deployment",
        "Secure network architecture",
      ],
      live:"",
      status: "Production",
    },
    {
      id: "2",
      name: "Cloud Cleaner Dashboard",
      description:
        "A dashboard for monitoring and optimizing cloud resources to reduce costs and improve efficiency",
      technologies: [
        "Python",
        "AWS SDK",
        "React",
        "Data Visualization",
        "REST API",
      ],
      github: "https://github.com/abhishekpanda0620/cloud-cleaner-dashboard",
      highlights: [
        "Identifies unused resources to reduce cloud costs",
        "Real-time monitoring of cloud usage",
        "Automated recommendations for optimization",
        "Interactive visualization of cloud spending",
      ],
      live:"",
      status: "Production",
    },
    {
      id: "3",
      name: "CloudSpy - Multi-Cloud Cost Monitoring",
      description:
        "A multi-cloud cost monitoring and resource visualization tool for AWS, GCP, and Azure",
      technologies: [
        "TypeScript",
        "Cloud APIs",
        "Data Visualization",
        "Cost Management",
        "React",
      ],
      github: "https://github.com/abhishekpanda0620/cloudspy",
      highlights: [
        "Unified dashboard for multiple cloud providers",
        "Cost anomaly detection",
        "Resource utilization insights",
        "Budget alerts and forecasting",
      ],
      live:"",
      status: "Active Development",
    },
    {
      id: "4",
      name: "URL Shortener Service",
      description:
        "A microservice for creating and managing shortened URLs with analytics",
      technologies: [
        "PHP",
        "RESTful API",
        "Redis",
        "MySQL",
        "Docker",
      ],
      github: "https://github.com/abhishekpanda0620/url-shortner",
      highlights: [
        "High-performance URL redirection",
        "Click analytics and tracking",
        "Custom short URL creation",
        "API for integration with other services",
      ],
      live:"",
      status: "Production",
    },

    {
      id: "5",
      name: "Jenkins Terraform Ansible Integration",
      description:
        "A comprehensive DevOps pipeline integrating Jenkins, Terraform, and Ansible for infrastructure automation",
      technologies: [
        "Jenkins",
        "Terraform",
        "Ansible",
        "CI/CD",
        "Infrastructure as Code",
      ],
      github: "https://github.com/abhishekpanda0620/jenkins-terraform-ansible",
      highlights: [
        "Automated infrastructure provisioning with Terraform",
        "Configuration management with Ansible",
        "Continuous integration and deployment with Jenkins",
        "Infrastructure as Code best practices",
      ],
      live:"",
      status: "Production",
    },
    {
      id: "6",
      name: "MediLabX",
      description:
        "A healthcare platform for managing medical laboratory tests and results",
      technologies: [
        "React",
        "Node.js",
        "MongoDB",
        "Express",
        "RESTful API",
      ],
      github: "https://github.com/abhishekpanda0620/MediLabX",
      highlights: [
        "Secure patient data management",
        "Real-time test results and notifications",
        "Laboratory workflow optimization",
        "Responsive design for multiple devices",
      ],
      live:"",
      status: "Production",
    },
    {
      id: "7",
      name: "Kubernetes React Application",
      description:
        "A React application deployed on Kubernetes with scalability and high availability",
      technologies: [
        "Kubernetes",
        "React",
        "Docker",
        "CI/CD",
        "Helm",
      ],
      github: "https://github.com/abhishekpanda0620/k8s-react-app",
      highlights: [
        "Containerized React application with Docker",
        "Kubernetes deployment with auto-scaling",
        "High availability configuration",
        "Helm charts for easy deployment",
      ],
      live:"",
      status: "Production",
    },
    {
      id: "8",
      name: "GitHub Actions Node.js Deployment",
      description:
        "Automated deployment pipeline for Node.js applications using GitHub Actions",
      technologies: [
        "GitHub Actions",
        "Node.js",
        "AWS",
        "CI/CD",
        "Docker",
      ],
      github: "https://github.com/abhishekpanda0620/github-actions-node-app-deployment",
      highlights: [
        "Automated testing and deployment",
        "Environment-specific configurations",
        "Rollback capabilities",
        "Deployment to multiple cloud providers",
      ],
      live:"",
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
