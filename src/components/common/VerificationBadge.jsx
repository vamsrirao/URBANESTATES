import { FiCheckCircle, FiAlertCircle } from 'react-icons/fi'
import { isPropertyVerified, getVerificationDetails } from '../../services/verificationService'

/**
 * VerificationBadge — Shows verified/not-verified status on property cards.
 * Green checkmark for verified, gray shield for unverified.
 */
export default function VerificationBadge({ propertyId, compact = false, className = '' }) {
    const verified = isPropertyVerified(propertyId)
    const details = verified ? getVerificationDetails(propertyId) : null

    if (compact) {
        return verified ? (
            <span
                className={`badge bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 shadow-sm ${className}`}
                title={details ? `Verified by ${details.lawyerName} on ${new Date(details.verifiedAt).toLocaleDateString()}` : 'Verified'}
            >
                <FiCheckCircle className="mr-1 text-xs" />
                Verified
            </span>
        ) : null
    }

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            {verified ? (
                <>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50">
                        <FiCheckCircle className="text-emerald-500 text-sm" />
                        <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                            Legally Verified
                        </span>
                    </div>
                    {details && (
                        <span className="text-[10px] text-surface-400 dark:text-surface-500">
                            by {details.lawyerName} · {new Date(details.verifiedAt).toLocaleDateString()}
                        </span>
                    )}
                </>
            ) : (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-100 dark:bg-surface-800 border border-surface-200 dark:border-surface-700">
                    <FiAlertCircle className="text-surface-400 text-sm" />
                    <span className="text-xs font-medium text-surface-500 dark:text-surface-400">
                        Not Verified
                    </span>
                </div>
            )}
        </div>
    )
}
