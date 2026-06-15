// Android Digital Asset Links for app links (cheevo.events -> attendee app).
// Set ANDROID_CERT_SHA256 to the SHA-256 fingerprint(s) in the web-panel env.
// Comma-separate to list both the upload key and the Play App Signing cert.
const FINGERPRINTS = (process.env.ANDROID_CERT_SHA256 ?? "")
  .split(",")
  .map((fingerprint) => fingerprint.trim())
  .filter(Boolean);

export function GET() {
  return Response.json(
    FINGERPRINTS.length
      ? [
          {
            relation: ["delegate_permission/common.handle_all_urls"],
            target: {
              namespace: "android_app",
              package_name: "events.cheevo.app",
              sha256_cert_fingerprints: FINGERPRINTS,
            },
          },
        ]
      : [],
  );
}
