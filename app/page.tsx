import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Shield, Zap, Lock, ArrowRight, Github, Database, Cpu } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen grid-bg relative">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-electric/10 rounded-full blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-deep/10 rounded-full blur-3xl opacity-30 pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xl font-bold">
            <Shield className="w-6 h-6 text-electric" />
            <span>IronLayer</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-platinum/70">
            <Link href="#features" className="hover:text-platinum transition-colors">Features</Link>
            <Link href="#architecture" className="hover:text-platinum transition-colors">Architecture</Link>
            <Link href="/pricing" className="hover:text-platinum transition-colors">Pricing</Link>
            <Link href="/docs" className="hover:text-platinum transition-colors">Docs</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="https://github.com/somegg90-blip/ironlayer-gateway" target="_blank">
              <Button variant="ghost" className="p-2"><Github className="w-5 h-5" /></Button>
            </Link>
            <Link href="/contact"><Button variant="secondary">Contact Sales</Button></Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-electric/20 bg-electric/5 text-electric text-xs font-medium mb-8 animate-pulse-slow">
            <span className="w-2 h-2 rounded-full bg-electric animate-ping" />
            V1.0 Launched: Agent Tool Scrubbing & Audit Logs
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
            The Safety Layer <br/>
            <span className="gradient-text">For AI Agents.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-platinum/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            The self-hosted security proxy that scrubs PII from prompts, responses, and tool calls. Protect your data before it leaves your network.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="https://github.com/somegg90-blip/ironlayer-gateway" target="_blank">
              <Button variant="primary" className="w-full sm:w-auto px-8 py-4 text-base group">
                Deploy in 5 Mins
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/book-demo">
              <Button variant="secondary" className="w-full sm:w-auto px-8 py-4 text-base">
                Book a Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Security Infrastructure for the AI Era</h2>
            <p className="text-platinum/60 max-w-xl mx-auto">
              Built for developers. Ready for enterprise compliance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card 
              icon={<Lock className="w-6 h-6" />}
              title="Prompt & Tool Scrubbing"
              description="Redacts PII in user prompts AND Agent tool arguments. The only solution that secures the entire loop."
            />
            <Card 
              icon={<Shield className="w-6 h-6" />}
              title="Agent Guardrails"
              description="Enforce hard boundaries. Block dangerous actions (DROP TABLE) and prevent data exfiltration to unauthorized domains."
            />
            <Card 
              icon={<Database className="w-6 h-6" />}
              title="Audit Logs & Modes"
              description="Generate compliance-ready audit trails. Switch between Mask, Warn, or Block modes to fit your risk tolerance."
            />
          </div>
        </div>
      </section>

      {/* Architecture / Whitepaper Section (Integrated Here) */}
      <section id="architecture" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Security Architecture</h2>
            <p className="text-platinum/60 text-lg">How IronLayer protects your data without seeing it.</p>
          </div>

          {/* The Core Concept */}
          <div className="glass-card p-8 rounded-xl mb-8">
            <h3 className="text-xl font-semibold mb-4 text-platinum">The "Zero-Trust" Proxy</h3>
            <p className="text-platinum/70 leading-relaxed">
              IronLayer operates as a <strong className="text-platinum">reverse proxy</strong>. This means it sits in the middle of your conversation with the AI. It acts as a gatekeeper, ensuring that no sensitive data leaves your controlled environment.
            </p>
          </div>

          {/* Data Flow Diagram */}
          <div className="glass-card p-8 rounded-xl mb-8">
            <h3 className="text-xl font-semibold mb-6 text-center text-platinum">Data Flow</h3>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
              {/* Step 1 */}
              <div className="flex flex-col items-center p-4 w-full md:w-1/4">
                <div className="w-12 h-12 rounded-full bg-electric/10 border border-electric/20 flex items-center justify-center mb-3 text-electric">
                  <Database className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-platinum">User Prompt</h4>
                <p className="text-xs text-platinum/50 mt-1">"My email is john@secret.com"</p>
              </div>

              <ArrowRight className="hidden md:block text-platinum/20 rotate-90 md:rotate-0" />

              {/* Step 2 */}
              <div className="flex flex-col items-center p-4 w-full md:w-1/4 border-x border-white/5">
                <div className="w-12 h-12 rounded-full bg-electric/10 border border-electric/20 flex items-center justify-center mb-3 text-electric">
                  <Lock className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-platinum">IronLayer</h4>
                <p className="text-xs text-platinum/50 mt-1"><strong className="text-electric">SCRUBS:</strong> "My email is &lt;EMAIL_1&gt;"</p>
              </div>

              <ArrowRight className="hidden md:block text-platinum/20 rotate-90 md:rotate-0" />

              {/* Step 3 */}
              <div className="flex flex-col items-center p-4 w-full md:w-1/4">
                <div className="w-12 h-12 rounded-full bg-electric/10 border border-electric/20 flex items-center justify-center mb-3 text-electric">
                  <Cpu className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-platinum">LLM Provider</h4>
                <p className="text-xs text-platinum/50 mt-1">Processes clean data only.</p>
              </div>
            </div>

            <div className="mt-8 p-4 bg-obsidian rounded-lg border border-white/5">
              <p className="text-center text-sm text-platinum/60">
                <strong className="text-electric">The Return Trip:</strong> The AI replies with the placeholder. IronLayer restores the real email before you see it.
              </p>
            </div>
          </div>

          {/* Data Retention Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-card p-6 rounded-xl">
              <h4 className="text-lg font-semibold mb-3 text-platinum">Self-Hosted (Docker)</h4>
              <ul className="space-y-2 text-sm text-platinum/60">
                <li className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-green-400 mt-0.5 shrink-0" /> 
                  <span><strong className="text-platinum">Zero Access:</strong> IronLayer developers cannot see your traffic.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-green-400 mt-0.5 shrink-0" /> 
                  <span><strong className="text-platinum">Local Logs:</strong> Audit logs are stored on your local disk only.</span>
                </li>
              </ul>
            </div>

            <div className="glass-card p-6 rounded-xl">
              <h4 className="text-lg font-semibold mb-3 text-platinum">Cloud (SaaS)</h4>
              <ul className="space-y-2 text-sm text-platinum/60">
                <li className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" /> 
                  <span><strong className="text-platinum">In-Memory Only:</strong> Prompts are processed in RAM and discarded.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" /> 
                  <span><strong className="text-platinum">Masked Logs:</strong> We log events (e.g., "Email Detected") but never the raw email itself.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center glass-card p-12 rounded-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-electric/10 to-transparent pointer-events-none" />
          <h2 className="text-3xl font-bold mb-4">Ready to secure your AI stack?</h2>
          <p className="text-platinum/60 mb-8">Get started with the open-source core or schedule a pilot for your team.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/pricing"><Button variant="primary" className="px-8">View Pricing</Button></Link>
            <Link href="/contact"><Button variant="ghost" className="px-8">Contact Us</Button></Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-platinum/40 text-sm">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Shield className="w-4 h-4 text-electric" /> 
            <span>© 2026 IronLayer. All rights reserved.</span>
          </div>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-platinum transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-platinum transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}