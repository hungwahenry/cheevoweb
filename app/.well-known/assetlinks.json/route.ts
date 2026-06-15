// Android Digital Asset Links for app links (cheevo.events -> attendee app).
// Set ANDROID_CERT_SHA256 to the Play App Signing SHA-256 fingerprint in the web-panel env.
const SHA256 = process.env.ANDROID_CERT_SHA256 ?? "";

export function GET() {
  return Response.json(
    SHA256
      ? [
          {
            relation: ["delegate_permission/common.handle_all_urls"],
            target: {
              namespace: "android_app",
              package_name: "events.cheevo.app",
              sha256_cert_fingerprints: [SHA256],
            },
          },
        ]
      : [],
  );
}
