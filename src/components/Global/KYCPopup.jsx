import React, { useEffect, useState } from "react";
import {
  AlertCircle,
  Clock3,
  BadgeCheck,
  ArrowRight,
  X,
  Loader2,
  Loader2Icon,
} from "lucide-react";

const KYCPopup = ({ onAction, className = "" }) => {
  const [kyc, setKyc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const fetchKyc = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/kyc`, {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();

        if (data?.success) {
          setKyc(data?.kyc);
        }
      } catch (error) {
        console.log("KYC fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchKyc();
  }, []);

  if (loading) {
    return (
      <div className={`w-full rounded-2xl border border-zinc-800 bg-zinc-900/80 px-4 py-4 ${className}`}>
        <div className="flex items-center gap-3 text-zinc-300">
          <Loader2Icon className="h-5 w-5 animate-spin" />
          {/* <span className="text-sm">Checking KYC status...</span> */}
        </div>
      </div>
    );
  }

  if (!kyc || hidden || kyc.status === "APPROVED") return null;

  const isPending = kyc.status === "PENDING";
  const isRejected = kyc.status === "REJECTED";

  const title = isPending
    ? "KYC Pending"
    : isRejected
    ? "KYC Rejected"
    : "Complete your KYC";

  const message = isPending
    ? "Your identity verification is under review by the admin."
    : isRejected
    ? kyc.rejectionReason || "Your KYC was rejected. Please try again."
    : "Verify your identity to unlock all platform features.";

  const icon = isPending ? (
    <Clock3 className="h-5 w-5 text-yellow-400" />
  ) : isRejected ? (
    <AlertCircle className="h-5 w-5 text-red-400" />
  ) : (
    <BadgeCheck className="h-5 w-5 text-violet-400" />
  );

  const wrapperColor = isPending
    ? "border-yellow-500/20 bg-yellow-500/10"
    : isRejected
    ? "border-red-500/20 bg-red-500/10"
    : "border-violet-500/20 bg-violet-500/10";

  const titleColor = isPending
    ? "text-yellow-300"
    : isRejected
    ? "text-red-300"
    : "text-violet-300";

  const buttonColor = isPending
    ? "bg-yellow-500 text-black hover:bg-yellow-400"
    : isRejected
    ? "bg-red-500 text-white hover:bg-red-400"
    : "bg-violet-600 text-white hover:bg-violet-500";

  return (
    <div
      className={`w-full rounded-2xl border px-4 py-4 shadow-lg backdrop-blur-md ${wrapperColor} ${className}`}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5">{icon}</div>

        <div className="min-w-0 flex-1">
          <div className={`text-sm font-semibold ${titleColor}`}>{title}</div>
          <p className="mt-1 text-sm text-zinc-300">{message}</p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onAction}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition ${buttonColor}`}
            >
              {isRejected ? "Try again" : isPending ? "View status" : "Complete now"}
              <ArrowRight size={16} />
            </button>

            <span className="text-xs text-zinc-400">
              {kyc.submittedAt
                ? `Submitted: ${new Date(kyc.submittedAt).toLocaleDateString()}`
                : ""}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setHidden(true)}
          className="rounded-lg p-1 text-zinc-400 transition hover:bg-white/5 hover:text-white"
          aria-label="Close"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default KYCPopup;