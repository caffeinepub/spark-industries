import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  BarChart3,
  CheckCircle2,
  Copy,
  FileText,
  Loader2,
  LogOut,
  ShieldAlert,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { ContactRequest } from "../backend";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  ServiceType,
  useAllRequests,
  useClaimFirstAdmin,
  useIsAdmin,
  useIsAdminClaimed,
} from "../hooks/useQueries";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function serviceLabel(type: ServiceType): string {
  switch (type) {
    case ServiceType.laserCutting:
      return "Laser Cutting";
    case ServiceType.pressBrake:
      return "Press Brake";
    case ServiceType.both:
      return "Both Services";
    default:
      return type;
  }
}

function formatTimestamp(ts: bigint): string {
  return new Date(Number(ts / 1_000_000n)).toLocaleString();
}

function truncateMessage(msg: string, max = 80): string {
  return msg.length > max ? `${msg.slice(0, max)}\u2026` : msg;
}

function serviceBadgeClass(type: ServiceType): string {
  switch (type) {
    case ServiceType.laserCutting:
      return "bg-blue-500/15 text-blue-300 border-blue-500/30";
    case ServiceType.pressBrake:
      return "bg-emerald-500/15 text-emerald-300 border-emerald-500/30";
    case ServiceType.both:
      return "bg-pf-orange/15 text-pf-orange border-pf-orange/30";
    default:
      return "";
  }
}

type FilterTab = ServiceType | "all";

const FILTER_TABS: { label: string; value: FilterTab }[] = [
  { label: "All", value: "all" },
  { label: "Laser Cutting", value: ServiceType.laserCutting },
  { label: "Press Brake", value: ServiceType.pressBrake },
  { label: "Both Services", value: ServiceType.both },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const { identity, login, clear, isInitializing, isLoggingIn } =
    useInternetIdentity();
  const { isAdmin, isLoading: adminLoading } = useIsAdmin();
  const { isClaimed, isLoading: isClaimedLoading } = useIsAdminClaimed();
  const claimAdmin = useClaimFirstAdmin();
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [copied, setCopied] = useState(false);
  const { data: allRequests = [], isLoading: requestsLoading } = useAllRequests(
    undefined,
    !!isAdmin,
  );
  const principal = identity?.getPrincipal().toString();

  const filteredRequests: ContactRequest[] =
    activeTab === "all"
      ? allRequests
      : allRequests.filter((r) => r.serviceType === activeTab);

  const handleClaimAdmin = () => {
    claimAdmin.mutate(undefined, {
      onSuccess: () =>
        toast.success(
          "Admin access claimed! Please refresh the page to continue.",
        ),
      onError: (error: Error) =>
        toast.error(error.message || "Failed to claim admin access."),
    });
  };

  const handleCopyPrincipal = () => {
    if (principal) {
      navigator.clipboard.writeText(principal);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // ── State 1: Initializing ──────────────────────────────────────────────────
  if (isInitializing) {
    return (
      <div className="min-h-screen bg-pf-navy flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-pf-orange" />
      </div>
    );
  }

  // ── State 2: Not logged in ─────────────────────────────────────────────────
  if (!identity) {
    return (
      <div className="min-h-screen bg-pf-navy flex items-center justify-center p-4">
        <Toaster richColors position="top-right" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <div
            className="bg-pf-card border border-border rounded-xl p-10 shadow-card-lift text-center"
            data-ocid="admin.login.card"
          >
            {/* Logo */}
            <div className="flex justify-center mb-7">
              <div className="flex items-center gap-3">
                <img
                  src="/assets/white_background_logo-removebg-preview-019d425b-8737-7589-bbc1-dd082960f2e0.png"
                  alt="Spark Industries Logo"
                  className="h-14 w-14 object-contain"
                />
                <div className="text-left">
                  <p className="text-white font-heading font-bold text-[15px] leading-tight tracking-wide uppercase">
                    Spark Industries
                  </p>
                  <p className="text-foreground/40 text-[11px] tracking-[0.15em] uppercase">
                    Manufacturing
                  </p>
                </div>
              </div>
            </div>

            <div className="w-10 h-px bg-pf-orange/30 mx-auto mb-6" />

            <h1 className="font-heading font-bold text-white text-2xl mb-2 tracking-tight">
              Admin Login
            </h1>
            <p className="text-foreground/55 text-sm mb-8 leading-relaxed">
              Log in to view customer quote requests
            </p>

            <Button
              onClick={login}
              disabled={isLoggingIn}
              className="w-full bg-pf-orange hover:bg-pf-orange/90 text-white font-semibold h-11 shadow-orange-glow hover:shadow-none transition-all duration-200"
              data-ocid="admin.login.button"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Authenticating…
                </>
              ) : (
                <>
                  <Zap className="mr-2 h-4 w-4 fill-white" />
                  Login with Internet Identity
                </>
              )}
            </Button>

            <p className="text-foreground/30 text-[11px] mt-5">
              Authorized personnel only
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  // ── State 3: Checking admin / claimed status ───────────────────────────────
  if (adminLoading || isClaimedLoading) {
    return (
      <div className="min-h-screen bg-pf-navy flex items-center justify-center gap-3">
        <Toaster richColors position="top-right" />
        <Loader2 className="h-5 w-5 animate-spin text-pf-orange" />
        <span className="text-foreground/60 text-sm">
          Verifying permissions…
        </span>
      </div>
    );
  }

  // ── State 4: Logged in but not admin ──────────────────────────────────────
  if (!isAdmin) {
    // Sub-case A: No admin claimed yet — let this user become admin
    if (!isClaimed) {
      return (
        <div className="min-h-screen bg-pf-navy flex items-center justify-center p-4">
          <Toaster richColors position="top-right" />
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-sm text-center"
            data-ocid="admin.claim.card"
          >
            <div className="bg-pf-card border border-border rounded-xl p-10 shadow-card-lift">
              <div className="flex justify-center mb-5">
                <div className="w-16 h-16 rounded-full bg-pf-orange/10 flex items-center justify-center border border-pf-orange/25">
                  <ShieldCheck className="h-8 w-8 text-pf-orange" />
                </div>
              </div>

              {claimAdmin.isSuccess ? (
                <>
                  <div className="flex justify-center mb-4">
                    <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                  </div>
                  <h2 className="font-heading font-bold text-white text-xl mb-2 tracking-tight">
                    Access Granted!
                  </h2>
                  <p className="text-foreground/55 text-sm mb-7 leading-relaxed">
                    You are now the admin. Please refresh the page to access the
                    dashboard.
                  </p>
                  <Button
                    onClick={() => window.location.reload()}
                    className="w-full bg-pf-orange hover:bg-pf-orange/90 text-white font-semibold h-11"
                    data-ocid="admin.claim.reload_button"
                  >
                    Refresh Page
                  </Button>
                </>
              ) : (
                <>
                  <h2 className="font-heading font-bold text-white text-xl mb-2 tracking-tight">
                    Set Up Admin Access
                  </h2>
                  <p className="text-foreground/55 text-sm mb-7 leading-relaxed">
                    No admin account has been set up yet. Click below to claim
                    admin access for this Internet Identity.
                  </p>
                  <Button
                    onClick={handleClaimAdmin}
                    disabled={claimAdmin.isPending}
                    className="w-full bg-pf-orange hover:bg-pf-orange/90 text-white font-semibold h-11 shadow-orange-glow hover:shadow-none transition-all duration-200 mb-3"
                    data-ocid="admin.claim.primary_button"
                  >
                    {claimAdmin.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Claiming…
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="mr-2 h-4 w-4" />
                        Claim Admin Access
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={clear}
                    variant="ghost"
                    className="w-full text-foreground/40 hover:text-foreground/70 hover:bg-white/5 text-sm"
                    data-ocid="admin.claim.logout_button"
                  >
                    <LogOut className="mr-2 h-3.5 w-3.5" />
                    Log Out
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        </div>
      );
    }

    // Sub-case B: Admin already claimed by someone else
    return (
      <div className="min-h-screen bg-pf-navy flex items-center justify-center p-4">
        <Toaster richColors position="top-right" />
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-sm text-center"
          data-ocid="admin.access_denied.card"
        >
          <div className="bg-pf-card border border-border rounded-xl p-10 shadow-card-lift">
            <div className="flex justify-center mb-5">
              <div className="w-16 h-16 rounded-full bg-destructive/15 flex items-center justify-center border border-destructive/25">
                <ShieldAlert className="h-8 w-8 text-destructive" />
              </div>
            </div>
            <h2 className="font-heading font-bold text-white text-xl mb-2 tracking-tight">
              Access Denied
            </h2>
            <p className="text-foreground/55 text-sm mb-7 leading-relaxed">
              This account does not have admin privileges.
            </p>
            <Button
              onClick={clear}
              variant="outline"
              className="border-border hover:bg-white/10 text-foreground/80 mb-6"
              data-ocid="admin.logout.button"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log Out
            </Button>

            {/* Principal ID section */}
            {principal && (
              <div className="border-t border-border/50 pt-6">
                <p className="text-foreground/35 text-[11px] uppercase tracking-widest mb-2">
                  Your Principal ID
                </p>
                <p className="text-foreground/40 text-[11px] mb-3 leading-relaxed">
                  Share this with the admin to request access.
                </p>
                <div className="flex items-center gap-2 bg-pf-navy/60 border border-border/60 rounded-lg px-3 py-2">
                  <code className="flex-1 text-[11px] text-foreground/55 font-mono break-all text-left leading-relaxed">
                    {principal}
                  </code>
                  <Button
                    onClick={handleCopyPrincipal}
                    variant="ghost"
                    size="sm"
                    className="shrink-0 h-7 w-7 p-0 hover:bg-white/10 text-foreground/40 hover:text-foreground/70"
                    data-ocid="admin.principal.copy_button"
                  >
                    {copied ? (
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  // ── State 5: Admin dashboard ───────────────────────────────────────────────
  const shortPrincipal = principal
    ? `${principal.slice(0, 5)}\u2026${principal.slice(-4)}`
    : "";

  const statCards = [
    {
      label: "Total Requests",
      value: allRequests.length,
      color: "text-pf-orange",
    },
    {
      label: "Laser Cutting",
      value: allRequests.filter(
        (r) => r.serviceType === ServiceType.laserCutting,
      ).length,
      color: "text-blue-400",
    },
    {
      label: "Press Brake",
      value: allRequests.filter((r) => r.serviceType === ServiceType.pressBrake)
        .length,
      color: "text-emerald-400",
    },
    {
      label: "Both Services",
      value: allRequests.filter((r) => r.serviceType === ServiceType.both)
        .length,
      color: "text-amber-400",
    },
  ];

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-pf-navy text-foreground flex flex-col">
        <Toaster richColors position="top-right" />

        {/* ── Top Bar ── */}
        <header className="bg-pf-footer border-b border-border sticky top-0 z-40 shrink-0">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/white_background_logo-removebg-preview-019d425b-8737-7589-bbc1-dd082960f2e0.png"
                alt="Spark Industries"
                className="h-9 w-9 object-contain shrink-0"
              />
              <div>
                <p className="text-white font-heading font-bold text-[14px] leading-tight tracking-wide uppercase">
                  Spark Industries
                </p>
                <p className="text-pf-orange text-[10px] tracking-[0.15em] uppercase font-semibold">
                  Admin Panel
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {shortPrincipal && (
                <div className="hidden sm:flex items-center gap-2 bg-pf-card rounded-md px-3 py-1.5 border border-border">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                  <span className="text-foreground/60 text-[12px] font-mono">
                    {shortPrincipal}
                  </span>
                </div>
              )}
              <Button
                onClick={clear}
                variant="outline"
                size="sm"
                className="border-border hover:bg-white/10 text-foreground/80 text-[13px] h-8"
                data-ocid="admin.logout.button"
              >
                <LogOut className="mr-1.5 h-3.5 w-3.5" />
                Logout
              </Button>
            </div>
          </div>
        </header>

        {/* ── Main ── */}
        <main className="flex-1 mx-auto w-full max-w-[1200px] px-4 sm:px-6 py-8">
          {/* Page Heading */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-1">
              <BarChart3 className="h-5 w-5 text-pf-orange" />
              <h1 className="font-heading font-bold text-white text-2xl sm:text-3xl tracking-tight">
                Quote Requests
              </h1>
            </div>
            <p className="text-foreground/45 text-sm">
              All customer quote submissions
            </p>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {statCards.map((stat, i) => (
              <div
                key={stat.label}
                className="bg-pf-card border border-border rounded-xl p-4"
                data-ocid={`admin.stats.card.${i + 1}`}
              >
                <p className="text-foreground/40 text-[11px] uppercase tracking-widest mb-2">
                  {stat.label}
                </p>
                {requestsLoading ? (
                  <Skeleton className="h-8 w-12" />
                ) : (
                  <p
                    className={`font-heading font-bold text-3xl ${stat.color}`}
                  >
                    {stat.value}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Filter Tabs */}
          <div className="mb-5">
            <Tabs
              value={activeTab}
              onValueChange={(v) => setActiveTab(v as FilterTab)}
            >
              <TabsList className="bg-pf-card border border-border h-10 gap-0.5">
                {FILTER_TABS.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="text-[13px] data-[state=active]:bg-pf-orange data-[state=active]:text-white data-[state=active]:shadow-none"
                    data-ocid="admin.filter.tab"
                  >
                    {tab.label}
                    {!requestsLoading && (
                      <span className="ml-1.5 text-[11px] opacity-60">
                        {tab.value === "all"
                          ? allRequests.length
                          : allRequests.filter(
                              (r) => r.serviceType === tab.value,
                            ).length}
                      </span>
                    )}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Content */}
          {requestsLoading ? (
            <div className="space-y-2" data-ocid="admin.requests.loading_state">
              {["sk-1", "sk-2", "sk-3", "sk-4", "sk-5"].map((id) => (
                <Skeleton
                  key={id}
                  className="h-14 w-full rounded-lg bg-pf-card/80"
                />
              ))}
            </div>
          ) : filteredRequests.length === 0 ? (
            <div
              className="bg-pf-card border border-border rounded-xl py-16 flex flex-col items-center gap-3"
              data-ocid="admin.requests.empty_state"
            >
              <FileText className="h-10 w-10 text-foreground/20" />
              <p className="text-foreground/45 text-sm">
                No quote requests yet.
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div
                className="hidden lg:block bg-pf-card border border-border rounded-xl overflow-hidden"
                data-ocid="admin.requests.table"
              >
                <Table>
                  <TableHeader>
                    <TableRow className="border-border hover:bg-transparent">
                      {[
                        "Customer",
                        "Email",
                        "Phone",
                        "Company",
                        "Service",
                        "Project Details",
                        "Submitted",
                      ].map((h) => (
                        <TableHead
                          key={h}
                          className="text-foreground/40 text-[11px] uppercase tracking-widest font-semibold py-3 whitespace-nowrap"
                        >
                          {h}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRequests.map((req, i) => (
                      <TableRow
                        key={`${req.timestamp}`}
                        className="border-border hover:bg-white/[0.04] transition-colors duration-100"
                        data-ocid={`admin.requests.row.${i + 1}`}
                      >
                        <TableCell className="font-medium text-white text-[14px] py-3.5">
                          {req.name}
                        </TableCell>
                        <TableCell className="text-foreground/65 text-[13px] py-3.5">
                          <a
                            href={`mailto:${req.email}`}
                            className="hover:text-pf-orange transition-colors"
                          >
                            {req.email}
                          </a>
                        </TableCell>
                        <TableCell className="text-foreground/65 text-[13px] py-3.5 whitespace-nowrap">
                          {req.phone}
                        </TableCell>
                        <TableCell className="text-foreground/65 text-[13px] py-3.5">
                          {req.company || "\u2014"}
                        </TableCell>
                        <TableCell className="py-3.5">
                          <Badge
                            variant="outline"
                            className={`text-[11px] font-medium whitespace-nowrap ${serviceBadgeClass(req.serviceType)}`}
                          >
                            {serviceLabel(req.serviceType)}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-[220px] py-3.5">
                          {req.message.length > 80 ? (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="text-foreground/60 text-[13px] cursor-help">
                                  {truncateMessage(req.message)}
                                </span>
                              </TooltipTrigger>
                              <TooltipContent
                                side="top"
                                className="max-w-xs bg-popover text-popover-foreground border-border"
                              >
                                <p className="text-[13px] leading-relaxed">
                                  {req.message}
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          ) : (
                            <span className="text-foreground/60 text-[13px]">
                              {req.message || "\u2014"}
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-foreground/45 text-[12px] py-3.5 whitespace-nowrap">
                          {formatTimestamp(req.timestamp)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Cards */}
              <div className="lg:hidden space-y-3">
                {filteredRequests.map((req, i) => (
                  <div
                    key={`${req.timestamp}`}
                    className="bg-pf-card border border-border rounded-xl p-5"
                    data-ocid={`admin.requests.item.${i + 1}`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <p className="font-semibold text-white text-[15px] leading-tight">
                          {req.name}
                        </p>
                        <p className="text-foreground/45 text-[12px] mt-0.5">
                          {req.company || "No company"}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-[11px] shrink-0 whitespace-nowrap ${serviceBadgeClass(req.serviceType)}`}
                      >
                        {serviceLabel(req.serviceType)}
                      </Badge>
                    </div>
                    <div className="space-y-1.5 text-[13px]">
                      <a
                        href={`mailto:${req.email}`}
                        className="block text-foreground/65 hover:text-pf-orange transition-colors"
                      >
                        {req.email}
                      </a>
                      <p className="text-foreground/65">{req.phone}</p>
                      {req.message && (
                        <p className="text-foreground/55 leading-relaxed pt-2 border-t border-border/50">
                          {req.message}
                        </p>
                      )}
                      <p className="text-foreground/35 text-[11px] pt-1">
                        {formatTimestamp(req.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </main>

        {/* ── Footer ── */}
        <footer className="border-t border-border shrink-0 mt-12">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
            <p className="text-foreground/30 text-[12px]">
              &copy; {new Date().getFullYear()} Spark Industries. Admin Portal.
            </p>
            <a
              href="/"
              className="text-foreground/30 hover:text-pf-orange transition-colors text-[12px]"
              data-ocid="admin.back.link"
            >
              ← Back to website
            </a>
          </div>
        </footer>
      </div>
    </TooltipProvider>
  );
}
