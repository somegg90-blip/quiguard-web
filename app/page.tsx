import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DemoSandbox } from "@/components/DemoSandbox";
import {
  Shield, Zap, Lock, ArrowRight, Github, Database, Cpu, CheckCircle,
  AlertTriangle, Sliders, Key, Eye, Server, Globe, BarChart3, Users,
  Crown, FileSearch, RefreshCw, ChevronRight, Play, Sparkles
} from "lucide-react";
import Link from "next/link";
import Head from "next/head";

// ============================================================
// FAQ Data — AEO Optimized with Schema-Ready Structure
// ============================================================

const faqs = [
  {
    question: "What is QuiGuard and how does it protect AI agents?",
    answer: "QuiGuard is a production-grade AI Security Gateway that sits between your autonomous AI agents and LLM providers like OpenAI, Anthropic, and Google. It intercepts every request and response, automatically detecting and redacting personally identifiable information (PII) including names, emails, Social Security numbers, credit card details, and custom patterns. Unlike simple API wrappers, QuiGuard uses Microsoft Presidio NER with spaCy language models for context-aware entity recognition, deterministic hash-based placeholders for lossless round-trip restoration, and recursive JSON traversal that secures nested tool calls and function arguments."
  },
  {
    question: "How does QuiGuard's PII detection and redaction work?",
    answer: "QuiGuard employs a multi-layered detection pipeline. First, it uses Microsoft Presidio's Named Entity Recognition (NER) engine powered by spaCy's en_core_web_lg language model (400MB) to identify 19+ PII categories including personal identifiers, financial data, government IDs, healthcare records, and technical secrets. Second, it applies custom regex patterns for organization-specific identifiers like employee IDs, internal document references, and proprietary API key formats. Each detected entity is replaced with a deterministic hash-based placeholder (e.g., <EMAIL_ADDRESS_abc123>) that preserves uniqueness, enabling accurate LLM responses while ensuring no raw PII reaches external providers. The system handles overlapping detections, supports configurable confidence thresholds, and offers multiple action modes: redact, mask, fake, block, or warn."
  },
  {
    question: "Is QuiGuard compliant with GDPR, HIPAA, and SOC 2 requirements?",
    answer: "Yes. QuiGuard is specifically designed to help organizations meet GDPR, HIPAA, SOC 2, and similar regulatory frameworks. For GDPR compliance, QuiGuard prevents personal data from being transferred to third-party LLM providers by redacting PII at the network edge before data leaves your infrastructure. For HIPAA, the healthcare entity detection category identifies medical license numbers, patient references, and protected health information patterns. For SOC 2, the Secure Ledger Dashboard provides real-time audit trails with event-level logging, risk detection tracking, entity-level forensic analysis, and exportable compliance reports. All audit logs include timestamps, event types, blocked entity classifications, sanitized content, and user attribution through Supabase Row-Level Security."
  },
  {
    question: "Can I use QuiGuard with OpenAI, Anthropic, and other LLM providers?",
    answer: "Absolutely. QuiGuard is completely provider-agnostic and works as a transparent reverse proxy with any OpenAI-compatible API. It currently routes through OpenRouter, giving you access to over 100 models including GPT-4, Claude, Gemini, Llama, Mistral, and open-source alternatives. The proxy intercepts traffic at the HTTP level, so your application only needs to change its API endpoint to point to QuiGuard. No SDK changes, no library updates, and no code modifications to your existing AI agent logic. Smart model routing automatically selects the optimal model based on intent classification: reasoning tasks use specialized models while coding and creative requests are routed to fast-response models."
  },
  {
    question: "How do I deploy QuiGuard and how long does it take?",
    answer: "QuiGuard deploys in under 5 minutes using Docker. For production, the recommended stack is Railway for the backend (auto-deploys from Git, no cold starts, up to 4GB RAM) and Vercel for the management dashboard. The Docker image includes all dependencies: FastAPI, Microsoft Presidio, spaCy language models, and Gunicorn for production serving. Configuration is managed through a single policy.yaml file or the web-based No-Code Policy Editor. Environment variables for API keys, Supabase credentials, and provider settings are the only required configuration. Railway auto-detects the Dockerfile and handles SSL, scaling, and health monitoring automatically."
  },
  {
    question: "What is the No-Code Policy Editor and how does it work?",
    answer: "The No-Code Policy Editor is a web-based interface that allows you to customize your security rules without editing YAML files. It provides five configuration sections: Global Settings (confidence threshold slider, action mode selector), PII Detection (toggle 19+ entity types on/off by category), Custom Patterns (add organization-specific regex patterns with confidence scoring), Agent Security (manage blocked domains, prompt injection defenses, and tool restrictions), and Model Routing (configure intent-to-model mappings). Changes take effect immediately for new requests and are stored as per-user overrides in Supabase, with the server computing only the diff from defaults for efficient storage."
  },
  {
    question: "How does QuiGuard handle multi-tenancy and API key management?",
    answer: "QuiGuard implements a complete multi-tenancy system with SHA-256 hashed API keys, subscription-based access control, and per-user rate limiting. Each API key is prefixed with 'qg_sk_' for identification and hashed before storage, meaning raw keys are never persisted and shown only once at creation time. The system enforces plan-based limits: Community (1 API key, basic PII), Starter ($49/mo, 3 keys, extended PII), Pro ($149/mo, 10 keys, full PII with agent security), and Enterprise (unlimited keys, custom configuration). Monthly request counting tracks usage against plan limits with automatic 429 responses when thresholds are exceeded. All data isolation is enforced through Supabase Row-Level Security policies."
  },
  {
    question: "What types of PII does QuiGuard detect and protect against?",
    answer: "QuiGuard detects 19+ PII categories across five domains. Personal identifiers include person names, email addresses, phone numbers, physical locations, and date/time values. Financial data covers credit card numbers, IBAN codes, US bank account numbers, and cryptocurrency wallet addresses. Government and legal IDs encompass US Social Security Numbers, US passports, driver licenses, US ITINs, UK National Insurance numbers, and Singapore NRIC. Healthcare identifiers include medical license numbers and HIPAA-relevant patterns. Technical secrets cover IP addresses, URLs, domain names, and API key formats. Additionally, users can create unlimited custom regex patterns for organization-specific identifiers like employee IDs (EMP-123456), confidential document references (Conf-SAL-2024), and internal API key formats."
  }
];

// ============================================================
// Structured Data Schemas
// ============================================================

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "QuiGuard",
  "applicationCategory": "SecurityApplication",
  "operatingSystem": "Linux, macOS, Windows (via Docker)",
  "offers": [
    {
      "@type": "Offer",
      "name": "Community",
      "price": "0",
      "priceCurrency": "USD",
      "description": "Free open-source plan with basic PII detection"
    },
    {
      "@type": "Offer",
      "name": "Starter",
      "price": "49",
      "priceCurrency": "USD"
    },
    {
      "@type": "Offer",
      "name": "Pro",
      "price": "149",
      "priceCurrency": "USD"
    }
  ],
  "description": "AI Security Gateway that protects autonomous agents by scrubbing PII from prompts, responses, and tool calls. Multi-tenant with API key auth, policy editor, and compliance dashboard.",
  "featureList": [
    "PII scrubbing with Microsoft Presidio NER",
    "Agent guardrails and prompt injection defense",
    "No-code policy editor for security rules",
    "Multi-tenant API key authentication",
    "Compliance-ready audit ledger dashboard",
    "Self-hosted Docker deployment",
    "Provider-agnostic LLM proxy",
    "Deterministic placeholder round-trip restoration"
  ],
  "softwareVersion": "2.0",
  "downloadUrl": "https://github.com/somegg90-blip/quiguard-gateway",
  "license": "MIT"
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "QuiGuard",
  "url": "https://quiguard.dev",
  "logo": "https://quiguard.dev/logo.png",
  "sameAs": [
    "https://github.com/somegg90-blip/quiguard-gateway"
  ]
};

// ============================================================
// Stats Data
// ============================================================

const stats = [
  { value: "19+", label: "PII Entity Types" },
  { value: "100+", label: "LLM Models Supported" },
  { value: "5", label: "Action Modes" },
  { value: "<5min", label: "Deploy Time" },
]

// ============================================================
// Landing Page Component
// ============================================================

export default function Home() {
  return (
    <>
      <Head>
        {/* Primary SEO Meta Tags */}
        <title>QuiGuard | AI Security Gateway - PII Redaction, Agent Guardrails & Compliance Audit</title>
        <meta name="description" content="QuiGuard is the production-grade AI Security Gateway for autonomous agents. Automatically scrub PII from prompts, responses, and tool calls using Microsoft Presidio NER. Multi-tenant API key auth, no-code policy editor, compliance dashboard. GDPR, HIPAA, SOC 2 ready. Deploy in 5 minutes." />
        <meta name="keywords" content="AI security gateway, PII redaction, AI proxy, agent guardrails, enterprise AI compliance, self-hosted AI security, LLM security, data privacy proxy, GDPR AI compliance, HIPAA AI, SOC 2 audit, AI agent protection, prompt injection defense, API key authentication, no-code security policy editor, Presidio NER, AI data loss prevention" />

        {/* Open Graph */}
        <meta property="og:title" content="QuiGuard | AI Security Gateway for Autonomous Agents" />
        <meta property="og:description" content="Production-grade security proxy that scrubs PII, enforces guardrails, and provides compliance audit trails for AI agents. Multi-tenant, self-hosted, provider-agnostic." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://quiguard.dev" />
        <meta property="og:image" content="https://quiguard.dev/og-image.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="QuiGuard | AI Security Gateway" />
        <meta name="twitter:description" content="Protect AI agents with PII scrubbing, guardrails, and compliance audit. Multi-tenant, self-hosted, 5-min deploy." />

        {/* Canonical */}
        <link rel="canonical" href="https://quiguard.dev" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />

        {/* Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </Head>

      <main className="min-h-screen grid-bg relative" itemScope itemType="https://schema.org/SoftwareApplication">
        <meta itemProp="name" content="QuiGuard" />
        <meta itemProp="applicationCategory" content="SecurityApplication" />
        <meta itemProp="description" content="AI Security Gateway that scrubs PII, enforces guardrails, and provides compliance audit trails for autonomous agents" />

        {/* Background Effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-electric/10 rounded-full blur-3xl opacity-20 pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/6 w-80 h-80 bg-indigo-deep/10 rounded-full blur-3xl opacity-20 pointer-events-none" />

        {/* ============================================================ */}
        {/* HERO SECTION */}
        {/* ============================================================ */}
        <section className="pt-36 pb-20 px-6 relative overflow-hidden" aria-labelledby="hero-heading">
          <div className="max-w-5xl mx-auto text-center relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-electric/20 bg-electric/5 text-electric text-xs font-medium mb-8">
              <Sparkles className="w-3.5 h-3.5" />
              v2.0 Released: Multi-Tenancy, Policy Editor & Compliance Dashboard
            </div>

            <h1 id="hero-heading" className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
              The AI Security Gateway<br />
              <span className="gradient-text">Autonomous Agents Deserve.</span>
            </h1>

            <p className="text-lg md:text-xl text-platinum/60 max-w-3xl mx-auto mb-10 leading-relaxed">
              QuiGuard is a reverse proxy that sits between your AI agents and LLM providers, automatically{" "}
              <strong className="text-platinum/80">scrubbing PII with Microsoft Presidio NER</strong>, enforcing agent guardrails, 
              and generating compliance-ready audit trails.{" "}
              <strong className="text-platinum/80">Zero code changes to your existing AI stack.</strong>
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link href="/pricing">
                <Button variant="primary" className="w-full sm:w-auto px-8 py-4 text-base group">
                  Get Started Free
                  <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="https://github.com/somegg90-blip/quiguard-gateway" target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" className="w-full sm:w-auto px-8 py-4 text-base group">
                  <Github className="w-4 h-4 mr-1.5" />
                  View on GitHub
                  <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-platinum/50">
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-400" /> GDPR Ready</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-400" /> HIPAA Compatible</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-400" /> SOC 2 Aligned</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-400" /> Zero Data Retention</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-400" /> MIT Licensed</span>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* STATS BAR */}
        {/* ============================================================ */}
        <section className="py-10 px-6 border-y border-white/5 bg-smoke/20">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl md:text-4xl font-bold gradient-text">{stat.value}</p>
                <p className="text-platinum/40 text-xs mt-1 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/* CORE CAPABILITIES */}
        {/* ============================================================ */}
        <section id="features" className="py-24 px-6" aria-labelledby="features-heading">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-electric text-xs font-medium uppercase tracking-widest mb-3">Core Capabilities</p>
              <h2 id="features-heading" className="text-3xl md:text-4xl font-bold mb-4">
                End-to-End AI Security in a Single Proxy
              </h2>
              <p className="text-platinum/60 max-w-2xl mx-auto">
                QuiGuard covers the entire AI security lifecycle: from data protection at the edge to compliance reporting in your dashboard. Every feature is production-tested and battle-ready.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card
                icon={<Eye className="w-6 h-6" />}
                title="PII Detection & Redaction"
                description="Microsoft Presidio NER with spaCy en_core_web_lg detects 19+ entity types across personal, financial, government, healthcare, and technical categories. Deterministic hash placeholders enable lossless round-trip restoration for accurate LLM responses."
              />
              <Card
                icon={<Shield className="w-6 h-6" />}
                title="Agent Guardrails"
                description="Block data exfiltration to competitor domains, prevent prompt injection attacks, restrict dangerous tool operations (DROP TABLE, rm -rf), and enforce URL sanitization rules. Protects the full agent loop including tool arguments and function responses."
              />
              <Card
                icon={<FileSearch className="w-6 h-6" />}
                title="Compliance Audit Ledger"
                description="Real-time dashboard with summary cards, timeline charts, and entity-level forensic analysis. Filter by event type, risk level, time range, and search terms. All logs isolated per-user via Supabase Row-Level Security. Export-ready for SOC 2, GDPR, and HIPAA reviews."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card
                icon={<Sliders className="w-6 h-6" />}
                title="No-Code Policy Editor"
                description="Customize security rules from the browser. Toggle PII entity types, adjust confidence thresholds, add custom regex patterns, manage blocked domains and prompt injection defenses, and configure model routing. Changes take effect immediately."
              />
              <Card
                icon={<Key className="w-6 h-6" />}
                title="Multi-Tenant API Keys"
                description="SHA-256 hashed API keys with plan-based access control. Community (free), Starter ($49/mo), Pro ($149/mo), and Enterprise plans with automatic rate limiting, monthly usage tracking, and subscription management through the dashboard."
              />
              <Card
                icon={<Globe className="w-6 h-6" />}
                title="Provider-Agnostic Proxy"
                description="Works with any OpenAI-compatible API through OpenRouter routing. Access 100+ models including GPT-4, Claude, Gemini, Llama, and Mistral. Smart intent-based routing selects the optimal model for reasoning, coding, or creative tasks automatically."
              />
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* HOW IT WORKS */}
        {/* ============================================================ */}
        <section id="how-it-works" className="py-24 px-6 border-t border-white/5" aria-labelledby="how-heading">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-electric text-xs font-medium uppercase tracking-widest mb-3">Architecture</p>
              <h2 id="how-heading" className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
                How QuiGuard Protects Your AI Traffic
              </h2>
              <p className="text-platinum/60 text-lg max-w-2xl mx-auto">
                A zero-trust reverse proxy architecture that secures data without storing raw information. Your AI agents send requests to QuiGuard instead of directly to LLM providers.
              </p>
            </div>

            {/* Data Flow */}
            <div className="glass-card p-8 rounded-xl mb-10">
              <h3 className="text-xl font-semibold mb-8 text-center text-platinum">Request Lifecycle: From Prompt to Response</h3>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
                {/* Step 1 */}
                <div className="flex flex-col items-center text-center p-4">
                  <div className="w-14 h-14 rounded-full bg-electric/10 border border-electric/20 flex items-center justify-center mb-3 text-electric">
                    <Users className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] text-electric font-bold mb-1">STEP 1</span>
                  <h4 className="font-semibold text-platinum text-sm">AI Agent Sends Prompt</h4>
                  <p className="text-[11px] text-platinum/40 mt-1">&quot;Send email to john@company.com about SSN 123-45-6789&quot;</p>
                </div>

                <div className="hidden md:flex items-center justify-center pt-8">
                  <ChevronRight className="w-5 h-5 text-platinum/20" />
                </div>

                {/* Step 2 */}
                <div className="flex flex-col items-center text-center p-4 rounded-xl bg-electric/5 border border-electric/10">
                  <div className="w-14 h-14 rounded-full bg-electric/20 border border-electric/30 flex items-center justify-center mb-3 text-electric">
                    <Lock className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] text-electric font-bold mb-1">STEP 2</span>
                  <h4 className="font-semibold text-platinum text-sm">QuiGuard Scrubs PII</h4>
                  <p className="text-[11px] text-platinum/40 mt-1">Detects email + SSN via NER, replaces with hash-based placeholders</p>
                </div>

                <div className="hidden md:flex items-center justify-center pt-8">
                  <ChevronRight className="w-5 h-5 text-platinum/20" />
                </div>

                {/* Step 3 */}
                <div className="flex flex-col items-center text-center p-4">
                  <div className="w-14 h-14 rounded-full bg-electric/10 border border-electric/20 flex items-center justify-center mb-3 text-electric">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] text-electric font-bold mb-1">STEP 3</span>
                  <h4 className="font-semibold text-platinum text-sm">LLM Processes Clean Data</h4>
                  <p className="text-[11px] text-platinum/40 mt-1">Receives sanitized prompt, generates response with placeholders intact</p>
                </div>
              </div>

              <div className="mt-8 p-4 bg-obsidian rounded-lg border border-white/5">
                <div className="flex items-start gap-3">
                  <RefreshCw className="w-5 h-5 text-electric shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-platinum/70 font-medium">Return Trip: Desanitization</p>
                    <p className="text-xs text-platinum/40 mt-1">QuiGuard restores original values from the in-memory placeholder store before delivering the response to your agent. The LLM never sees raw PII, and your agent receives a natural, accurate response.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Deployment Options */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-card p-6 rounded-xl">
                <div className="flex items-center gap-2 mb-4">
                  <Server className="w-5 h-5 text-electric" />
                  <h4 className="text-lg font-semibold text-platinum">Self-Hosted Deployment</h4>
                </div>
                <p className="text-sm text-platinum/50 mb-4">Deploy on your infrastructure with full data sovereignty. Recommended for enterprise and regulated industries.</p>
                <ul className="space-y-2.5 text-sm text-platinum/60">
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" /><span><strong className="text-platinum/80">Docker container</strong> with Gunicorn + Uvicorn workers</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" /><span><strong className="text-platinum/80">Railway integration</strong> with auto-deploy from Git</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" /><span><strong className="text-platinum/80">All logs stay</strong> in your Supabase instance</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" /><span><strong className="text-platinum/80">Full control</strong> over models, policies, and retention</span></li>
                </ul>
              </div>

              <div className="glass-card p-6 rounded-xl">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="w-5 h-5 text-electric" />
                  <h4 className="text-lg font-semibold text-platinum">Management Dashboard</h4>
                </div>
                <p className="text-sm text-platinum/50 mb-4">Web-based dashboard on Vercel for real-time monitoring, policy management, and team administration.</p>
                <ul className="space-y-2.5 text-sm text-platinum/60">
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" /><span><strong className="text-platinum/80">Compliance Ledger</strong> with live audit event charts</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" /><span><strong className="text-platinum/80">No-Code Policy Editor</strong> for security rule customization</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" /><span><strong className="text-platinum/80">API Key management</strong> with usage tracking and limits</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" /><span><strong className="text-platinum/80">Subscription management</strong> with plan-based features</span></li>
                </ul>
              </div>
            </div>

            {/* Demo Sandbox */}
            <div className="mt-12">
              <DemoSandbox />
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* PII CATEGORIES SHOWCASE */}
        {/* ============================================================ */}
        <section id="pii-categories" className="py-24 px-6 border-t border-white/5">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-electric text-xs font-medium uppercase tracking-widest mb-3">Detection Coverage</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                19+ PII Entity Types Protected
              </h2>
              <p className="text-platinum/60 max-w-2xl mx-auto">
                Powered by Microsoft Presidio NER with spaCy's large English model. Add unlimited custom regex patterns for organization-specific identifiers.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { cat: "Personal", items: ["Person Names", "Email Addresses", "Phone Numbers", "Physical Locations", "Dates & Times"], icon: <Users className="w-4 h-4" /> },
                { cat: "Financial", items: ["Credit Card Numbers", "IBAN Codes", "US Bank Accounts", "Crypto Wallets"], icon: <Database className="w-4 h-4" /> },
                { cat: "Government", items: ["US SSN", "US Passports", "Driver Licenses", "US ITIN", "UK NINO", "Singapore NRIC"], icon: <Shield className="w-4 h-4" /> },
                { cat: "Healthcare", items: ["Medical Licenses", "HIPAA Patterns", "Patient References"], icon: <Lock className="w-4 h-4" /> },
                { cat: "Technical", items: ["IP Addresses", "URLs", "Domain Names", "API Key Formats"], icon: <Cpu className="w-4 h-4" /> },
                { cat: "Custom", items: ["Employee IDs", "Document Refs", "Internal Patterns", "Unlimited Regex"], icon: <Sliders className="w-4 h-4" /> },
              ].map((group) => (
                <div key={group.cat} className="glass-card p-5 rounded-xl">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-md bg-electric/10 border border-electric/20 flex items-center justify-center text-electric">
                      {group.icon}
                    </div>
                    <h4 className="text-sm font-semibold text-platinum">{group.cat}</h4>
                  </div>
                  <ul className="space-y-1.5">
                    {group.items.map((item) => (
                      <li key={item} className="text-xs text-platinum/50 flex items-center gap-1.5">
                        <CheckCircle className="w-3 h-3 text-electric/50 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* PRICING PREVIEW */}
        {/* ============================================================ */}
        <section id="pricing-preview" className="py-24 px-6 border-t border-white/5">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-electric text-xs font-medium uppercase tracking-widest mb-3">Pricing</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Start Free. Scale When Ready.
            </h2>
            <p className="text-platinum/60 max-w-xl mx-auto mb-12">
              From open-source community edition to enterprise-grade security. Every plan includes core PII protection and audit logging.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { name: "Community", price: "Free", desc: "Basic PII detection, 1 API key, community support", highlight: false },
                { name: "Starter", price: "$49", desc: "Extended PII, 3 API keys, priority support", highlight: false },
                { name: "Pro", price: "$149", desc: "Full PII + agent security, 10 keys, 90-day retention", highlight: true },
                { name: "Enterprise", price: "Custom", desc: "Data residency, SSO, unlimited keys, dedicated support", highlight: false },
              ].map((plan) => (
                <div key={plan.name} className={`p-5 rounded-xl border ${plan.highlight ? "bg-electric/5 border-electric/30" : "glass-card"}`}>
                  {plan.highlight && <span className="text-[10px] font-bold text-electric uppercase tracking-wider">Most Popular</span>}
                  <h4 className="text-lg font-bold text-platinum mt-1">{plan.name}</h4>
                  <p className="text-2xl font-bold gradient-text my-2">{plan.price}<span className="text-sm text-platinum/40">{plan.price !== "Free" && plan.price !== "Custom" ? "/mo" : ""}</span></p>
                  <p className="text-xs text-platinum/40">{plan.desc}</p>
                </div>
              ))}
            </div>

            <Link href="/pricing">
              <Button variant="primary" className="px-8 group">
                View Full Pricing Comparison
                <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </section>

        {/* ============================================================ */}
        {/* BEFORE vs AFTER */}
        {/* ============================================================ */}
        <section className="py-24 px-6 border-t border-white/5">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Security Teams Choose QuiGuard
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-card p-6 rounded-xl border-red-500/10">
                <h4 className="text-lg font-semibold mb-4 flex items-center gap-2 text-red-400/70">
                  <AlertTriangle className="w-5 h-5" /> Without QuiGuard
                </h4>
                <ul className="space-y-3 text-sm text-platinum/50">
                  <li className="flex items-start gap-2"><AlertTriangle className="w-4 h-4 text-red-400/50 mt-0.5 shrink-0" /><span>PII (emails, SSNs, credit cards) leaks through AI prompts to third-party LLM providers</span></li>
                  <li className="flex items-start gap-2"><AlertTriangle className="w-4 h-4 text-red-400/50 mt-0.5 shrink-0" /><span>No visibility into what data autonomous agents send in tool calls and function arguments</span></li>
                  <li className="flex items-start gap-2"><AlertTriangle className="w-4 h-4 text-red-400/50 mt-0.5 shrink-0" /><span>Prompt injection attacks can bypass agent instructions and access restricted data</span></li>
                  <li className="flex items-start gap-2"><AlertTriangle className="w-4 h-4 text-red-400/50 mt-0.5 shrink-0" /><span>Manual compliance reviews slow AI adoption and create audit liabilities</span></li>
                  <li className="flex items-start gap-2"><AlertTriangle className="w-4 h-4 text-red-400/50 mt-0.5 shrink-0" /><span>No per-user rate limiting or API key management for multi-tenant environments</span></li>
                </ul>
              </div>

              <div className="glass-card p-6 rounded-xl border-green-500/10">
                <h4 className="text-lg font-semibold mb-4 flex items-center gap-2 text-green-400/70">
                  <CheckCircle className="w-5 h-5" /> With QuiGuard
                </h4>
                <ul className="space-y-3 text-sm text-platinum/50">
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" /><span>Automatic PII redaction at the network edge using Microsoft Presidio NER with 19+ entity types</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" /><span>Recursive JSON traversal secures prompts, tool arguments, AND tool response payloads</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" /><span>Built-in prompt injection defense blocks dangerous patterns and unauthorized domain access</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" /><span>Real-time compliance dashboard with audit trails, entity tracking, and forensic analysis</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" /><span>Multi-tenant API keys with SHA-256 hashing, plan-based limits, and monthly usage tracking</span></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* FAQ */}
        {/* ============================================================ */}
        <section id="faq" className="py-24 px-6 border-t border-white/5" aria-labelledby="faq-heading">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-electric text-xs font-medium uppercase tracking-widest mb-3">Knowledge Base</p>
              <h2 id="faq-heading" className="text-3xl md:text-4xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-platinum/60">
                Direct answers to common questions about AI security, PII protection, and enterprise compliance with QuiGuard.
              </p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <details
                  key={index}
                  className="glass-card p-6 rounded-xl group"
                  itemScope
                  itemType="https://schema.org/Question"
                >
                  <summary className="flex items-center justify-between cursor-pointer list-none">
                    <h3 className="text-base font-semibold text-platinum pr-4" itemProp="name">
                      {faq.question}
                    </h3>
                    <ArrowRight className="w-5 h-5 text-platinum/30 transition-transform group-open:rotate-90 shrink-0" />
                  </summary>
                  <div className="mt-4 text-platinum/60 leading-relaxed text-sm" itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                    <p itemProp="text">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* CTA */}
        {/* ============================================================ */}
        <section className="py-24 px-6 border-t border-white/5">
          <div className="max-w-4xl mx-auto text-center glass-card p-12 rounded-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-electric/10 to-indigo-deep/5 pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Secure Your AI Stack Today
              </h2>
              <p className="text-platinum/60 mb-8 max-w-xl mx-auto">
                Join teams using QuiGuard to deploy AI agents with confidence. Start free with the Community plan, or get started with a 14-day Pro trial for full PII protection and agent guardrails.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/signup">
                  <Button variant="primary" className="px-8 py-4 text-base group">
                    Get Started Free
                    <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button variant="secondary" className="px-8 py-4 text-base">
                    View Pricing
                  </Button>
                </Link>
                <Link href="https://github.com/somegg90-blip/quiguard-gateway" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" className="px-8 py-4 text-base">
                    <Github className="w-4 h-4 mr-1.5" />
                    Star on GitHub
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* FOOTER */}
        {/* ============================================================ */}
        <footer className="py-12 px-6 border-t border-white/5" role="contentinfo">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-platinum/40 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-electric" />
                <span>&copy; 2026 QuiGuard. All rights reserved.</span>
              </div>
              <div className="flex flex-wrap justify-center gap-6">
                <Link href="/pricing" className="hover:text-platinum transition-colors">Pricing</Link>
                <Link href="/docs" className="hover:text-platinum transition-colors">Docs</Link>
                <Link href="/privacy" className="hover:text-platinum transition-colors">Privacy</Link>
                <Link href="/terms" className="hover:text-platinum transition-colors">Terms</Link>
                <Link href="https://github.com/somegg90-blip/quiguard-gateway" target="_blank" rel="noopener noreferrer" className="hover:text-platinum transition-colors">GitHub</Link>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}