import { env } from "@/env.mjs"
import { Entitlement, entitlementsByPlan, Plan } from "./constants"
import { base64Decode } from "@/lib/utils";
import { z } from "zod";
import { SOURCEBOT_SUPPORT_EMAIL } from "@/lib/constants";

const eeLicenseKeyPrefix = "sourcebot_ee_";

const eeLicenseKeyPayloadSchema = z.object({
    id: z.string(),
    // ISO 8601 date string
    expiryDate: z.string().datetime().optional(),
});

const decodeLicenseKeyPayload = (payload: string) => {
    const decodedPayload = base64Decode(payload);
    const payloadJson = JSON.parse(decodedPayload);
    return eeLicenseKeyPayloadSchema.parse(payloadJson);
}

export const getPlan = (): Plan => {
    if (env.NEXT_PUBLIC_SOURCEBOT_CLOUD_ENVIRONMENT) {
        return "cloud:team";
    }

    const licenseKey = env.SOURCEBOT_EE_LICENSE_KEY;
    if (licenseKey && licenseKey.startsWith(eeLicenseKeyPrefix)) {
        const payload = licenseKey.substring(eeLicenseKeyPrefix.length);

        try {
            const { expiryDate } = decodeLicenseKeyPayload(payload);

            if (expiryDate && new Date(expiryDate).getTime() < new Date().getTime()) {
                console.error(`The provided license key has expired. Falling back to oss plan. Please contact ${SOURCEBOT_SUPPORT_EMAIL} for support.`);
                return "oss";
            }

            return "self-hosted:enterprise";
        } catch (error) {
            console.error(`Failed to decode license key payload with error: ${error}`);
            console.info('Falling back to oss plan.');
            return "oss";
        }
    }

    return "oss";
}

export const hasEntitlement = (entitlement: Entitlement) => {
    const plan = getPlan();
    const entitlements = entitlementsByPlan[plan];
    return entitlements.includes(entitlement);
}
