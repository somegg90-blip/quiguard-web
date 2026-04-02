"use client"

import { useEffect, useState, useCallback } from "react"
import {
  Key,
  Plus,
  Trash2,
  Copy,
  Check,
  Shield,
  Crown,
  Zap,
  Users,
  Building2,
  Server,
  RefreshCw,
  AlertTriangle,
  Eye,
  EyeOff,
  ExternalLink,
  Clock,
  Activity,
} from "lucide-react"
import { Button } from "@/components/ui/Button"
import Link from "next/link"

// ============================================================
// Types
// ============================================================

interface Subscription {
  plan: string
  status: string
  monthly_request_count: number
  monthly_request_limit: number | null
  max_seats: number
  max_api_keys: number
  log_retention_days: number
  current_period_start: string | null
  current_period_end: string | null
  trial_ends_at: string | null
  created_at: string
  error?: string
}

interface APIKey {
  id: number
  name: string
  key_prefix: string
  is_active: boolean
  last_used_at: string | null
  request_count: number
  created_at: string
}

// ============================================================
// Plan config
// ============================================================

const planConfig: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
  community: { label: "Community", icon: <Server className="w-4 h-4" />, color: "text-platinum/60" },
  starter: { label: "Starter", icon: <Zap className="w-4 h-4" />, color: "text-electric" },
  pro: { label: "Pro", icon: <Crown className="w-4 h-4" />, color: "text-electric" },
  enterprise: { label: "Enterprise", icon: <Building2 className="w-4 h-4" />, color: "text-gold" },
}

// ============================================================
// Settings Page
// ============================================================

export default function SettingsPage() {
  // State
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [keys, setKeys] = useState<APIKey[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [revoking, setRevoking] = useState<number | null>(null)

  // New key modal
  const [showNewKeyModal, setShowNewKeyModal] = useState(false)
  const [newKeyName, setNewKeyName] = useState("")
  const [newKeyResult, setNewKeyResult] = useState<{ key: string; key_prefix: string } | null>(null)
  const [copied, setCopied] = useState(false)

  // ============================================================
  // Data fetching
  // ============================================================

  async function fetchSubscription() {
    try {
      const res = await fetch("/api/subscription", { cache: "no-store" })
      const data = await res.json()
      if (!data.error) setSubscription(data)
    } catch (e) {
      console.error("Failed to fetch subscription:", e)
    }
  }

  async function fetchKeys() {
    try {
      const res = await fetch("/api/keys", { cache: "no-store" })
      const data = await res.json()
      setKeys(data.keys || [])
    } catch (e) {
      console.error("Failed to fetch keys:", e)
    }
  }

  async function loadData() {
    setLoading(true)
    await Promise.all([fetchSubscription(), fetchKeys()])
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  // ============================================================
  // Actions
  // ============================================================

  async function handleCreateKey() {
    setCreating(true)
    try {
      const res = await fetch("/api/keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newKeyName || "Default Key" }),
      })
      const data = await res.json()

      if (data.error) {
        alert(data.error)
        return
      }

      setNewKeyResult({ key: data.key, key_prefix: data.key_prefix })
      setNewKeyName("")
      setShowNewKeyModal(true)
      await fetchKeys()
    } catch (e) {
      alert("Failed to create API key")
    } finally {
      setCreating(false)
    }
  }

  async function handleRevokeKey(keyId: number) {
    if (!confirm("Are you sure? This will immediately disable this API key. Any agents using it will get 401 errors.")) return

    setRevoking(keyId)
    try {
      const res = await fetch(`/api/keys/${keyId}`, { method: "DELETE" })
      const data = await res.json()

      if (data.error) {
        alert(data.error)
        return
      }

      await fetchKeys()
    } catch (e) {
      alert("Failed to revoke key")
    } finally {
      setRevoking(null)
    }
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // ============================================================
  // Render helpers
  // ============================================================

  function getUsagePercentage() {
    if (!subscription || !subscription.monthly_request_limit) return null
    return Math.round((subscription.monthly_request_count / subscription.monthly_request_limit) * 100)
  }

  function getUsageColor(pct: number | null) {
    if (pct === null) return "bg-electric"
    if (pct >= 90) return "bg-red-400"
    if (pct >= 70) return "bg-yellow-400"
    return "bg-electric"
  }

  // ============================================================
  // Render
  // ============================================================

  return (
    <main className="min-h-screen grid-bg pt-24 px-4 sm:px-6 pb-12">
      <div className="max-w-4xl mx-auto">
        {/* ---- Header ---- */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold gradient-text flex items-center gap-3">
              <Shield className="w-8 h-8 text-electric" />
              Settings
            </h1>
            <p className="text-platinum/50 text-sm mt-1">
              Manage your subscription, API keys, and account.
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={loadData}>
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <RefreshCw className="w-6 h-6 text-electric/50 animate-spin" />
          </div>
        ) : (
          <div className="space-y-6">
            {/* ============================================================ */}
            {/* Subscription & Usage */}
            {/* ============================================================ */}
            <div className="glass-card p-6 rounded-xl border border-white/10">
              <h2 className="text-lg font-semibold text-platinum mb-4 flex items-center gap-2">
                <Crown className="w-5 h-5 text-electric/70" />
                Subscription &amp; Usage
              </h2>

              {subscription && !subscription.error ? (
                <div>
                  {/* Plan badge + status */}
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-obsidian border border-white/5">
                      {planConfig[subscription.plan]?.icon}
                      <span className={`text-sm font-semibold ${planConfig[subscription.plan]?.color}`}>
                        {planConfig[subscription.plan]?.label || subscription.plan}
                      </span>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-medium ${
                      subscription.status === "active"
                        ? "bg-green-500/15 text-green-400 border border-green-500/20"
                        : subscription.status === "trialing"
                        ? "bg-yellow-500/15 text-yellow-400 border border-yellow-500/20"
                        : "bg-red-500/15 text-red-400 border border-red-500/20"
                    }`}>
                      {subscription.status}
                    </span>
                    {subscription.plan === "community" && (
                      <Link href="/pricing" className="text-electric text-xs hover:underline flex items-center gap-1">
                        Upgrade plan <ExternalLink className="w-3 h-3" />
                      </Link>
                    )}
                  </div>

                  {/* Usage stats grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {/* Requests */}
                    <div className="p-4 rounded-lg bg-obsidian border border-white/5">
                      <span className="text-platinum/40 text-[10px] uppercase tracking-wider block mb-1">Requests</span>
                      <p className="text-xl font-bold text-platinum">
                        {subscription.monthly_request_limit
                          ? `${subscription.monthly_request_count.toLocaleString()}`
                          : subscription.monthly_request_count.toLocaleString()}
                      </p>
                      <p className="text-platinum/30 text-[10px]">
                        {subscription.monthly_request_limit
                          ? `/ ${subscription.monthly_request_limit.toLocaleString()} /mo`
                          : "Unlimited"}
                      </p>
                    </div>

                    {/* Seats */}
                    <div className="p-4 rounded-lg bg-obsidian border border-white/5">
                      <span className="text-platinum/40 text-[10px] uppercase tracking-wider block mb-1">Team Seats</span>
                      <p className="text-xl font-bold text-platinum">{subscription.max_seats}</p>
                      <p className="text-platinum/30 text-[10px]">included</p>
                    </div>

                    {/* API Keys */}
                    <div className="p-4 rounded-lg bg-obsidian border border-white/5">
                      <span className="text-platinum/40 text-[10px] uppercase tracking-wider block mb-1">API Keys</span>
                      <p className="text-xl font-bold text-platinum">{subscription.max_api_keys}</p>
                      <p className="text-platinum/30 text-[10px]">max allowed</p>
                    </div>

                    {/* Log Retention */}
                    <div className="p-4 rounded-lg bg-obsidian border border-white/5">
                      <span className="text-platinum/40 text-[10px] uppercase tracking-wider block mb-1">Log Retention</span>
                      <p className="text-xl font-bold text-platinum">{subscription.log_retention_days}</p>
                      <p className="text-platinum/30 text-[10px]">days</p>
                    </div>
                  </div>

                  {/* Usage bar */}
                  {subscription.monthly_request_limit && (
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-platinum/40 text-xs">Monthly usage</span>
                        <span className="text-platinum/40 text-xs">{getUsagePercentage()}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${getUsageColor(getUsagePercentage())}`}
                          style={{ width: `${Math.min(getUsagePercentage() || 0, 100)}%` }}
                        />
                      </div>
                      {getUsagePercentage() !== null && getUsagePercentage()! >= 80 && (
                        <div className="flex items-center gap-1.5 mt-2">
                          <AlertTriangle className="w-3 h-3 text-yellow-400" />
                          <span className="text-yellow-400/70 text-[10px]">
                            {getUsagePercentage()! >= 90
                              ? "Approaching limit — upgrade to avoid service interruption."
                              : "Usage is high — consider upgrading your plan."}
                          </span>
                          <Link href="/pricing" className="text-electric text-[10px] hover:underline ml-auto">
                            Upgrade
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-platinum/40 text-sm text-center py-8">
                  Could not load subscription info.
                </div>
              )}
            </div>

            {/* ============================================================ */}
            {/* API Keys */}
            {/* ============================================================ */}
            <div className="glass-card p-6 rounded-xl border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-platinum flex items-center gap-2">
                  <Key className="w-5 h-5 text-electric/70" />
                  API Keys
                  <span className="text-platinum/30 text-xs font-normal">({keys.length} / {subscription?.max_api_keys || "?"})</span>
                </h2>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setShowNewKeyModal(true)}
                  disabled={keys.filter(k => k.is_active).length >= (subscription?.max_api_keys || 0)}
                >
                  <Plus className="w-3.5 h-3.5" />
                  Create Key
                </Button>
              </div>

              {/* Key list */}
              {keys.length === 0 ? (
                <div className="text-center py-10">
                  <Key className="w-8 h-8 text-platinum/10 mx-auto mb-3" />
                  <p className="text-platinum/40 text-sm mb-1">No API keys yet</p>
                  <p className="text-platinum/25 text-xs mb-4">Create a key to start routing traffic through QuiGuard.</p>
                  <Button variant="secondary" size="sm" onClick={() => setShowNewKeyModal(true)}>
                    <Plus className="w-3.5 h-3.5" />
                    Create Your First Key
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {keys.map((key) => (
                    <div
                      key={key.id}
                      className={`p-4 rounded-lg border ${
                        key.is_active
                          ? "bg-obsidian border-white/5"
                          : "bg-obsidian/50 border-white/5 opacity-50"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                            key.is_active
                              ? "bg-electric/10 border border-electric/20"
                              : "bg-white/5 border border-white/5"
                          }`}>
                            <Key className={`w-4 h-4 ${key.is_active ? "text-electric" : "text-platinum/30"}`} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium text-platinum">{key.name}</p>
                              <span className={`px-1.5 py-0.5 rounded text-[9px] font-medium ${
                                key.is_active
                                  ? "bg-green-500/10 text-green-400 border border-green-500/15"
                                  : "bg-red-500/10 text-red-400 border border-red-500/15"
                              }`}>
                                {key.is_active ? "Active" : "Revoked"}
                              </span>
                            </div>
                            <p className="text-platinum/30 text-[11px] font-mono mt-0.5">{key.key_prefix}...</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 sm:gap-6">
                          <div className="text-right">
                            <p className="text-platinum/40 text-[10px]">Requests</p>
                            <p className="text-platinum/60 text-xs font-mono">{key.request_count}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-platinum/40 text-[10px]">Last Used</p>
                            <p className="text-platinum/60 text-xs">
                              {key.last_used_at
                                ? new Date(key.last_used_at).toLocaleDateString()
                                : "Never"}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-platinum/40 text-[10px]">Created</p>
                            <p className="text-platinum/60 text-xs">
                              {new Date(key.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          {key.is_active && (
                            <button
                              onClick={() => handleRevokeKey(key.id)}
                              disabled={revoking === key.id}
                              className="p-2 rounded-lg border border-red-500/10 text-red-400/60 hover:bg-red-500/10 hover:text-red-400 transition-colors disabled:opacity-30 cursor-pointer"
                              title="Revoke key"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Warning */}
              {keys.length > 0 && (
                <div className="mt-4 px-4 py-3 bg-yellow-500/5 border border-yellow-500/10 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-yellow-400 shrink-0 mt-0.5" />
                    <p className="text-yellow-400/60 text-xs leading-relaxed">
                      API keys are shown once when created. If you lose a key, revoke it and create a new one.
                      Never share your keys or commit them to version control.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* ---- Quick Links ---- */}
            <div className="glass-card p-6 rounded-xl border border-white/10">
              <h2 className="text-lg font-semibold text-platinum mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-electric/70" />
                Quick Links
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Link href="/dashboard" className="p-4 rounded-lg bg-obsidian border border-white/5 hover:border-electric/20 transition-colors group">
                  <div className="flex items-center gap-2 mb-1">
                    <Shield className="w-4 h-4 text-platinum/40 group-hover:text-electric transition-colors" />
                    <span className="text-sm font-medium text-platinum/70 group-hover:text-platinum transition-colors">Compliance Ledger</span>
                  </div>
                  <p className="text-platinum/30 text-[10px]">View audit logs &amp; security events</p>
                </Link>
                <Link href="/pricing" className="p-4 rounded-lg bg-obsidian border border-white/5 hover:border-electric/20 transition-colors group">
                  <div className="flex items-center gap-2 mb-1">
                    <Crown className="w-4 h-4 text-platinum/40 group-hover:text-electric transition-colors" />
                    <span className="text-sm font-medium text-platinum/70 group-hover:text-platinum transition-colors">Pricing</span>
                  </div>
                  <p className="text-platinum/30 text-[10px]">Change plan or view features</p>
                </Link>
                <Link href="/docs" className="p-4 rounded-lg bg-obsidian border border-white/5 hover:border-electric/20 transition-colors group">
                  <div className="flex items-center gap-2 mb-1">
                    <ExternalLink className="w-4 h-4 text-platinum/40 group-hover:text-electric transition-colors" />
                    <span className="text-sm font-medium text-platinum/70 group-hover:text-platinum transition-colors">Documentation</span>
                  </div>
                  <p className="text-platinum/30 text-[10px]">Integration guides &amp; API docs</p>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ---- Footer ---- */}
        <div className="mt-8 text-center">
          <p className="text-platinum/20 text-xs">
            Settings changes take effect immediately.
          </p>
        </div>
      </div>

      {/* ============================================================ */}
      {/* Create Key Modal */}
      {/* ============================================================ */}
      {showNewKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => { setShowNewKeyModal(false); setNewKeyResult(null) }} />
          <div className="relative glass-card p-6 rounded-xl max-w-md w-full border border-electric/20 bg-obsidian">
            <h3 className="text-lg font-bold text-platinum mb-4 flex items-center gap-2">
              <Key className="w-5 h-5 text-electric" />
              Create API Key
            </h3>

            {!newKeyResult ? (
              <>
                <div className="mb-4">
                  <label className="text-platinum/50 text-xs block mb-1.5">Key Name</label>
                  <input
                    type="text"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    placeholder="e.g., Production, Staging"
                    className="w-full bg-smoke/50 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-platinum placeholder:text-platinum/30 focus:outline-none focus:border-electric/50"
                    autoFocus
                  />
                </div>
                <div className="flex gap-3">
                  <Button variant="secondary" className="flex-1" onClick={() => setShowNewKeyModal(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" className="flex-1" onClick={handleCreateKey} disabled={creating}>
                    {creating ? (
                      <><RefreshCw className="w-3.5 h-3.5 animate-spin" /> Creating...</>
                    ) : (
                      <><Plus className="w-3.5 h-3.5" /> Create Key</>
                    )}
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/15 mb-4">
                  <p className="text-green-400 text-xs font-medium mb-2">API key created! Save it now — it won't be shown again.</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-[11px] text-platinum/80 bg-obsidian rounded-lg px-3 py-2 font-mono break-all select-all">
                      {newKeyResult.key}
                    </code>
                    <button
                      onClick={() => copyToClipboard(newKeyResult.key)}
                      className="p-2 rounded-lg border border-white/10 hover:bg-white/5 transition-colors cursor-pointer shrink-0"
                    >
                      {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-platinum/50" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-3 py-2 bg-obsidian rounded-lg mb-4">
                  <Shield className="w-3.5 h-3.5 text-electric/50" />
                  <span className="text-platinum/40 text-xs">Use this key in your Authorization header:</span>
                </div>
                <div className="bg-obsidian rounded-lg px-3 py-2 mb-4">
                  <code className="text-[11px] text-platinum/50 font-mono">
                    Authorization: Bearer {newKeyResult.key}
                  </code>
                </div>

                <Button variant="primary" className="w-full" onClick={() => { setShowNewKeyModal(false); setNewKeyResult(null) }}>
                  Done — I&apos;ve saved my key
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  )
}