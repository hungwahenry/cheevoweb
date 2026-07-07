// Apple App Site Association for iOS universal links (cheevo.events -> attendee app).
// Set APPLE_APP_ID to "<AppleTeamID>.events.cheevo.app" in the web-panel env.
const APP_ID = process.env.APPLE_APP_ID ?? ""

export function GET() {
  return Response.json({
    applinks: {
      apps: [],
      details: APP_ID ? [{ appID: APP_ID, paths: ["/events/*"] }] : [],
    },
  })
}
