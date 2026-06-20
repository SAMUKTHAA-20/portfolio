"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Download,
  Code,
  Palette,
  Database,
  Globe,
  Smartphone,
  Server,
  MapPin,
  Calendar,
  Briefcase,
  Cpu,
  Wrench,
  Users,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import emailjs from "@emailjs/browser"

// EmailJS configuration
const EMAILJS_SERVICE_ID = "service_qx9ldes"
const EMAILJS_TEMPLATE_ID = "template_1dxisnw"         // Contact Us  → notification sent to Samukthaa
const EMAILJS_AUTO_REPLY_TEMPLATE_ID = "template_i4kp5r6" // Auto-Reply → thank-you sent to the sender
const EMAILJS_PUBLIC_KEY = "uqxcuqH4Uh8Do5Wop"
const OWNER_EMAIL = "samukthaavijayakumar20@gmail.com"
const OWNER_NAME = "Samukthaa Vijayakumar"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")

  // Contact form state
  const formRef = useRef<HTMLFormElement>(null)
  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    subject: "",
    message: "",
  })
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!formData.from_name.trim() || !formData.from_email.trim() || !formData.message.trim()) {
      setFormStatus("error")
      setErrorMsg("Please fill in all required fields.")
      return
    }

    setFormStatus("loading")
    setErrorMsg("")

    try {
      // ── 1. Notification email → delivered to Samukthaa (Contact Us template: template_1dxisnw)
      //    Template variables: {{name}}, {{email}}, {{title}}, {{time}}, {{message}}
      const notificationParams = {
        name: formData.from_name,          // {{name}}  → sender's name shown in email body
        email: formData.from_email,        // {{email}} → used as Reply-To in template
        title: formData.subject || "New Portfolio Contact", // {{title}} → email subject line
        time: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }), // {{time}} → when submitted
        message: formData.message,         // {{message}} → the message body
      }

      // ── 2. Auto-reply email → delivered to sender (Auto-Reply template: template_i4kp5r6)
      //    Template variables must match what template_i4kp5r6 uses.
      //    Common pattern: {{name}}, {{email}}, {{title}}, {{message}}
      const autoReplyParams = {
        name: formData.from_name,          // sender's name (greeting in auto-reply)
        email: formData.from_email,        // sender's email (To Email must be {{email}} in dashboard)
        title: `Re: ${formData.subject || "Your message"}`, // subject of auto-reply
        message: formData.message,         // echo back what they sent
        to_name: formData.from_name,       // extra: in case template uses {{to_name}}
        to_email: formData.from_email,     // extra: in case template uses {{to_email}}
        reply_to: OWNER_EMAIL,             // extra: reply-to header
        from_name: OWNER_NAME,             // extra: in case template uses {{from_name}}
      }

      // Send both in parallel
      await Promise.all([
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, notificationParams, EMAILJS_PUBLIC_KEY),
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_AUTO_REPLY_TEMPLATE_ID, autoReplyParams, EMAILJS_PUBLIC_KEY),
      ])

      setFormStatus("success")
      setFormData({ from_name: "", from_email: "", subject: "", message: "" })
      // Reset to idle after 6 seconds
      setTimeout(() => setFormStatus("idle"), 6000)
    } catch (error: any) {
      console.error("EmailJS error:", error)
      setFormStatus("error")
      setErrorMsg(error?.text || "Failed to send message. Please try again later.")
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "education", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const skills = [
    {
      name: "Programming Languages",
      icon: Code,
      technologies: ["C", "Python", "Java", "C++ (Basics)"],
    },
    {
      name: "Web Development",
      icon: Globe,
      technologies: ["HTML", "CSS", "JavaScript", "React.js", "Node.js", "Express.js"],
    },
    { name: "AI & Machine Learning", icon: Cpu, technologies: ["Machine Learning", "TensorFlow", "Keras", "PyTorch", "Scikit-learn"] },
    { name: "Database & Core Subjects", icon: Database, technologies: ["DBMS", "MongoDB", "Data Structures", "Operating Systems"] },
    { name: "Tools & Technologies", icon: Wrench, technologies: ["Git", "GitHub", "Next.js", "TypeScript", "Tailwind CSS"] },
    { name: "Soft Skills", icon: Users, technologies: ["Problem Solving", "Analytical Thinking", "Communication", "Collaboration", "Time Management"] },
  ]

  const projects = [
    {
      title: "AI-Powered Resume Analyzer & Career Assistant",
      description:
        "A smart web application that analyzes resumes against job descriptions, provides ATS scores, skill gap analysis, interview preparation guidance, and AI-powered career recommendations.",
      image: "AI-Powered resume.png?height=200&width=300",
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Gemini AI"],
      github: "https://github.com/SAMUKTHAA-20/ai-powered-resume-",
      live: "https://drive.google.com/file/d/1sFklQXF1_3iKrtdVnX8jTiwAX3seqCmy/view?usp=sharing",
    },
    {
      title: "Smart Health Monitoring & AI Assistant Platform",
      description: "A full-stack health monitoring platform that tracks user health data and provides real-time AI-powered health assistance with multilingual support.",
      image: "health.png?height=200&width=300",
      technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
      github: "https://github.com/SAMUKTHAA-20/smart-health-monitoring-career-assistant",
      live: "https://drive.google.com/file/d/1FbRQpBe09AuT-2nlEYV2B0ZNE7OFPgCB/view?usp=sharing",
    },
    {
      title: "Plant Disease Detection & Crop Advisory",
      description: "A machine learning-based system that detects crop diseases from leaf images and provides real-time farming recommendations for better crop management.",
      image: "plant.png?height=200&width=300",
      technologies: ["Python", "TensorFlow", "OpenCV", "Machine Learning", "JavaScript"],
      github: "https://github.com/SAMUKTHAA-20/plant-disease-detection-crop-advisory",
      live: "https://drive.google.com/file/d/18G3xiSNNj5egyx_8FWXSaVl5vivxv2Z1/view?usp=sharing",
    },
    {
      title: "Smart Waste Management & Real-Time Monitoring System",
      description: "A web-based platform for waste tracking, image-based reporting, and location monitoring to improve urban waste collection efficiency.",
      image: "waste.png?height=200&width=300",
      technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT"],
      github: "https://github.com/SAMUKTHAA-20/waste-managemt-system",
      live: "https://drive.google.com/file/d/1QqcErwa5amtxsuy2XylySeuR-Q6wzh4e/view?usp=sharing",
    },
  ]

  const education = [
    {
    title: "B.Tech Artificial Intelligence and Machine Learning",
    company: "Kongu Engineering College",
    period: "2024 - Present",
    location: "Perundurai, Tamil Nadu",
    description:
      "Currently pursuing B.Tech in Artificial Intelligence and Machine Learning with a CGPA of 8.52.",
  },
  {
    title: "Higher Secondary Education (HSC)",
    company: "Shri Swamy Matric Higher Secondary School",
    period: "2023 - 2024",
    location: "Attur, Tamil Nadu",
    description:
      "Completed Higher Secondary Education with 86.5%.",
  },
  {
    title: "Secondary School Education (SSLC)",
    company: "Shri Swamy Matric Higher Secondary School",
    period: "2021 - 2022",
    location: "Attur, Tamil Nadu",
    description:
      "Completed Secondary School Education with 90.8%.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold">Samukthaa Vijayakumar</div>
            <div className="hidden md:flex space-x-8">
              {["home", "about", "skills", "projects", "education", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-colors hover:text-primary ${
                    activeSection === section ? "text-primary font-medium" : "text-muted-foreground"
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
            <div className="flex space-x-4">
              <Link href="https://github.com/SAMUKTHAA-20" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="w-5 h-5" />
              </Link>
              <Link href="https://www.linkedin.com/in/samukthaa-v/" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link href="mailto:samukthaavijayakumar20@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  Aspiring Software Engineer
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Passionate about Full Stack Development and Artificial Intelligence, building innovative solutions that solve real-world problems.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" onClick={() => scrollToSection("projects")}>
                  View My Work
                </Button>
                <Button variant="outline" size="lg" className="gap-2 bg-transparent" asChild>
                 <a href="./resume.pdf" download>
                <Download className="w-4 h-4" />
                 Download Resume
                    </a>
                 </Button>
              </div>
              <div className="flex items-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Salem, Tamil Nadu, India
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Available for work
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative w-full max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-full blur-3xl" />
                <Image
                  src="coat pic.jpeg"
                  alt="Samukthaa Vijayakumar"
                  width={500}
                  height={400}
                  className="relative rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold">About Me</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  I'm Samukthaa V, a third-year Artificial Intelligence and Machine Learning student at Kongu Engineering College. I am passionate about web development, AI technologies, and building innovative software solutions. Currently, I am learning full stack development and working on improving my technical skills.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Apart from academics, I enjoy learning new technologies, improving my programming skills, and working on web development and AI/ML projects. I am always eager to gain practical experience and enhance my technical knowledge.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-primary">
                    <Briefcase className="w-5 h-5" />
                    <span className="font-semibold">Education</span>
                  </div>
                  <p className="text-2xl font-bold">3rd Year Student</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-primary">
                    <Code className="w-5 h-5" />
                    <span className="font-semibold">Projects</span>
                  </div>
                  <p className="text-2xl font-bold">7+ Projects</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="coat pic1.jpeg?height=400&width=500"
                alt="Working"
                width={500}
                height={400}
                className="rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">Skills & Technologies</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Skills & Technologies

Technical skills, tools, and technologies I use in AI/ML and Full Stack Development projects.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <skill.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{skill.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skill.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
<section id="projects" className="py-20 px-4 bg-muted/30">
  <div className="container mx-auto max-w-6xl">
    <div className="text-center space-y-4 mb-12">
      <h2 className="text-4xl font-bold">Featured Projects</h2>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        A collection of AI/ML and Full Stack Development projects.
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-6">
      {projects.map((project, index) => (
        <Card
          key={index}
          className="group overflow-hidden hover:shadow-xl transition-all duration-300"
        >
          {/* Project Image */}
          <div className="relative overflow-hidden">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              width={700}
              height={180}
              className="w-full h-36 object-contain bg-gray-50 p-2"
            />

            {/* Hover Buttons */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
              <Button size="sm" variant="secondary" asChild>
                <Link href={project.github} className="gap-2">
                  <Github className="w-4 h-4" />
                  Code
                </Link>
              </Button>

              <Button size="sm" asChild>
                <Link href={project.live} className="gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Demo
                </Link>
              </Button>
            </div>
          </div>

          {/* Project Details */}
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">
              {project.title}
            </CardTitle>

            <CardDescription className="text-sm line-clamp-2">
              {project.description}
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 4).map((tech, techIndex) => (
                <Badge
                  key={techIndex}
                  variant="outline"
                  className="text-[10px]"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
</section>

      {/* Education Section */}
      <section id="education" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">Education</h2>
            <p className="text-lg text-muted-foreground">My academic journey and educational achievements.</p>
          </div>
          <div className="space-y-8">
            {education.map((edu, index) => (
              <Card key={index} className="relative">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl">{edu.title}</CardTitle>
                      <CardDescription className="text-lg font-medium text-primary">{edu.company}</CardDescription>
                    </div>
                    <div className="flex flex-col md:items-end gap-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {edu.period}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        {edu.location}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{edu.description}</p>
                </CardContent>
                {index < education.length - 1 && <div className="absolute -bottom-4 left-8 w-px h-8 bg-border" />}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">Let's Work Together</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              I'm always interested in new opportunities and exciting projects. Let's discuss how we can bring your
              ideas to life.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <Link href="mailto:samukthaavijayakumar20@gmail.com"
  className="text-muted-foreground hover:text-primary"
>
  samukthaavijayakumar20@gmail.com
</Link>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Linkedin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">LinkedIn</h3>
                    <Link
  href="https://www.linkedin.com/in/samukthaa-v/"
  target="_blank"
  className="text-muted-foreground hover:text-primary"
>
  linkedin.com/in/samukthaa-v
</Link>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Github className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">GitHub</h3>
                    <Link
  href="https://github.com/SAMUKTHAA-20"
  target="_blank"
  className="text-muted-foreground hover:text-primary"
>
  github.com/SAMUKTHAA-20
</Link>
                  </div>
                </div>
              </div>
            </div>
            <Card className="p-8">
              {/* Success State */}
              {formStatus === "success" && (
                <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
                  <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-full">
                    <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-green-700 dark:text-green-400">Message Sent!</h3>
                  <p className="text-muted-foreground">
                    Thank you for reaching out! I'll get back to you as soon as possible.
                  </p>
                </div>
              )}

              {/* Form */}
              {formStatus !== "success" && (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="contact-name" className="text-sm font-medium">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="from_name"
                        value={formData.from_name}
                        onChange={handleInputChange}
                        required
                        suppressHydrationWarning
                        className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="contact-email" className="text-sm font-medium">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="from_email"
                        value={formData.from_email}
                        onChange={handleInputChange}
                        required
                        suppressHydrationWarning
                        className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contact-subject" className="text-sm font-medium">Subject</label>
                    <input
                      id="contact-subject"
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      suppressHydrationWarning
                      className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      placeholder="Project inquiry"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contact-message" className="text-sm font-medium">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      suppressHydrationWarning
                      className="w-full px-3 py-2 border border-input rounded-md bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  {/* Error message */}
                  {formStatus === "error" && (
                    <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-md">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full gap-2"
                    size="lg"
                    disabled={formStatus === "loading"}
                  >
                    {formStatus === "loading" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-muted-foreground">© {new Date().getFullYear()} Samukthaa Vijayakumar. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <Link href="https://github.com/SAMUKTHAA-20" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="w-5 h-5" />
              </Link>
              <Link href="https://www.linkedin.com/in/samukthaa-v/" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link href="mailto:samukthaavijayakumar20@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
