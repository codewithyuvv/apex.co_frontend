import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  BadgeCheck,
  Ban,
  Clock3,
  FileWarning,
  ImageOff,
} from "lucide-react";
import Spinner from "../../assets/Spinner";
import Back from "../Global/Back";

const STATUS_META = {
  PENDING: {
    label: "Pending",
    icon: Clock3,
    classes: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  },
  APPROVED: {
    label: "Approved",
    icon: BadgeCheck,
    classes: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  },
  REJECTED: {
    label: "Rejected",
    icon: Ban,
    classes: "text-rose-400 bg-rose-400/10 border-rose-400/20",
  },
};

function formatDate(value) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function Field({ label, value }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wider text-zinc-500">{label}</p>
      <p className="mt-1 text-zinc-100 font-medium wrap-break-words">
        {value || <span className="text-zinc-600 font-normal">Not provided</span>}
      </p>
    </div>
  );
}

function DocCard({ label, url }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wider text-zinc-500 mb-2">{label}</p>
      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-xl overflow-hidden border border-zinc-700 hover:border-violet-500 transition-colors"
        >
          <img
            src={url}
            alt={label}
            className="w-full h-48 object-cover bg-zinc-800"
          />
        </a>
      ) : (
        <div className="w-full h-48 rounded-xl border border-dashed border-zinc-700 bg-zinc-950 flex flex-col items-center justify-center text-zinc-600 gap-2">
          <ImageOff className="w-6 h-6" />
          <span className="text-xs">No document uploaded</span>
        </div>
      )}
    </div>
  );
}

function KYCvalidation() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [kyc, setKyc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showRejectBox, setShowRejectBox] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [status, setStatus] = useState("PENDING")

  useEffect(() => {
    const getKYC = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/user/admin-panel/kyc/${userId}`,
          { withCredentials: true }
        );
        setKyc(res?.data?.kyc || res?.data || null);
      } catch (error) {
        console.log("ERROR: ", error);
        toast.error(error?.response?.data?.message || "Failed to load KYC details");
      } finally {
        setLoading(false);
      }
    };
    getKYC();
  }, [userId]);

  const handleApprove = async () => {
    if (!window.confirm("Approve this volunteer's KYC?")) return;
    setSubmitting(true);
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/user/admin-panel/kyc/${userId}/approve`,
        {status: "APPROVED"},
        { withCredentials: true }
      );
      toast.success(res?.data?.message || "KYC approved");
      setKyc((prev) => ({ ...prev, status: "APPROVED", rejectionReason: null }));
    } catch (error) {
      console.log("ERROR: ", error);
      toast.error(error?.response?.data?.message || "Failed to approve KYC");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      toast.error("Please provide a reason for rejection");
      return;
    }
    setSubmitting(true);
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/user/admin-panel/kyc/${userId}/reject`,
        { rejectionReason },
        {status: "REJECTED"},
        { withCredentials: true }
      );
      toast.success(res?.data?.message || "KYC rejected");
      setKyc((prev) => ({ ...prev, status: "REJECTED", rejectionReason }));
      setShowRejectBox(false);
      setRejectionReason("");
    } catch (error) {
      console.log("ERROR: ", error);
      toast.error(error?.response?.data?.message || "Failed to reject KYC");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!kyc) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center gap-3 text-zinc-400">
      <Back />  
        <FileWarning className="w-10 h-10 text-zinc-600" />
        <p>No KYC submission found for this user.</p>
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-violet-400 hover:text-violet-300"
        >
          Go back
        </button>
      </div>
    );
  }

  const statusMeta = STATUS_META[kyc.status] || STATUS_META.PENDING;
  const StatusIcon = statusMeta.icon;
  const isPending = kyc.status === "PENDING";

  return (
    <div className="min-h-screen bg-zinc-950 flex justify-center px-5 py-10">
      <div className="w-full max-w-3xl bg-zinc-900 rounded-2xl border border-zinc-800 p-8 shadow-2xl space-y-6">

        <div className="flex items-start justify-between gap-4">
          <div>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors mb-3 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to users
            </button>
            <h1 className="text-3xl font-bold text-white">Volunteer KYC Review</h1>
            <p className="text-zinc-400 mt-2">
              Review the submitted documents and details before approving this volunteer.
            </p>
          </div>

          <span
            className={`shrink-0 inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold ${statusMeta.classes}`}
          >
            <StatusIcon className="w-3.5 h-3.5" />
            {statusMeta.label}
          </span>
        </div>

        {kyc.status === "REJECTED" && kyc.rejectionReason && (
          <div className="rounded-xl border border-rose-400/20 bg-rose-400/5 px-4 py-3">
            <p className="text-xs uppercase tracking-wider text-rose-400 mb-1">Rejection reason</p>
            <p className="text-sm text-zinc-300">{kyc.rejectionReason}</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-5 border-t border-zinc-800 pt-6">
          <Field label="Full Name" value={kyc.fullName} />
          <Field label="Date of Birth" value={formatDate(kyc.dob)} />
          <Field label="Aadhaar Number" value={kyc.aadhar} />
          <Field label="Address" value={kyc.address} />
          <Field label="Emergency Contact" value={kyc.emergencyContact?.name} />
          <Field label="Emergency Phone" value={kyc.emergencyContact?.phone} />
        </div>

        <div className="border-t border-zinc-800 pt-6">
          <div className="grid md:grid-cols-2 gap-5">
            <DocCard label="Aadhaar Front" url={kyc.documents?.front} />
            <DocCard label="Aadhaar Back" url={kyc.documents?.back} />
          </div>
        </div>

        {isPending && (
          <div className="border-t border-zinc-800 pt-6 space-y-4">
            {!showRejectBox ? (
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleApprove}
                  disabled={submitting}
                  className="flex-1 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 transition font-semibold flex justify-center items-center cursor-pointer disabled:opacity-50"
                >
                  {submitting ? <Spinner size="md" /> : "Approve"}
                </button>
                <button
                  onClick={() => setShowRejectBox(true)}
                  disabled={submitting}
                  className="flex-1 py-3 rounded-lg border border-rose-500/40 text-rose-400 hover:bg-rose-500/10 transition font-semibold flex justify-center items-center cursor-pointer disabled:opacity-50"
                >
                  Reject
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <label className="text-zinc-300 text-sm">Reason for rejection</label>
                <textarea
                  rows="3"
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="e.g. Aadhaar image is blurry, please re-upload"
                  className="w-full rounded-lg bg-zinc-950 border border-zinc-700 px-4 py-3 outline-none focus:border-rose-500 resize-none"
                />
                <div className="flex gap-3">
                  <button
                    onClick={handleReject}
                    disabled={submitting}
                    className="flex-1 py-3 rounded-lg bg-rose-600 hover:bg-rose-500 transition font-semibold flex justify-center items-center cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? <Spinner size="md" /> : "Confirm Rejection"}
                  </button>
                  <button
                    onClick={() => {
                      setShowRejectBox(false);
                      setRejectionReason("");
                    }}
                    disabled={submitting}
                    className="px-5 py-3 rounded-lg border border-zinc-700 text-zinc-300 hover:bg-zinc-800 transition font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default KYCvalidation;