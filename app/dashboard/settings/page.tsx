import { PageHeader } from "@/components/admin/layout/page-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ConfigsTable } from "@/features/admin/settings/components/configs-table"
import { FlagsTable } from "@/features/admin/settings/components/flags-table"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Feature flags and platform configuration."
      />
      <Tabs defaultValue="flags">
        <TabsList>
          <TabsTrigger value="flags">Feature flags</TabsTrigger>
          <TabsTrigger value="configs">System config</TabsTrigger>
        </TabsList>
        <TabsContent value="flags" className="pt-4">
          <FlagsTable />
        </TabsContent>
        <TabsContent value="configs" className="pt-4">
          <ConfigsTable />
        </TabsContent>
      </Tabs>
    </div>
  )
}
