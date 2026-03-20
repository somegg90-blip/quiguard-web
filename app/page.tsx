import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Shield, Zap, Lock, ArrowRight, Github, Database, Ban } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen grid-bg relative">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-electric/10 rounded-full blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-deep/10 rounded-full blur-3xl opacity-30 pointer-events-none" />

      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xl font-bold">
            <Shield className="w-6 h-6 text-electric" />
            <span>IronLayer</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-platinum/70">
            <Link href="/features" className="hover:text-platinum transition-colors">Features</Link>
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

        <div className="mt-20 relative w-full max-w-5xl mx-auto h-80 rounded-xl border border-white/10 glass-card overflow-hidden">
             <div className="absolute inset-0 flex items-center justify-center opacity-50">
                <div className="w-32 h-32 border border-electric/50 rounded-full animate-spin flex items-center justify-center" style={{animationDuration: "3s"}}>
                    <Shield className="w-12 h-12 text-electric" />
                </div>
             </div>
             <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric to-transparent" />
        </div>
      </section>

      <section className="py-24 px-6">
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