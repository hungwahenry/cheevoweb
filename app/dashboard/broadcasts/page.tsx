import { PageHeader } from "@/components/layout/page-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BroadcastsTable } from "@/features/admin/broadcasts/components/broadcasts-table"
import { SuppressionsTable } from "@/features/admin/broadcasts/components/suppressions/suppressions-table"

export default function BroadcastsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Broadcasts"
        description="Organiser email broadcasts and the suppression list."
      />
      <Tabs defaultValue="broadcasts">
        <TabsList>
          <TabsTrigger value="broadcasts">Broadcasts</TabsTrigger>
          <TabsTrigger value="suppressions">Suppressions</TabsTrigger>
        </TabsList>
        <TabsContent value="broadcasts" className="pt-4">
          <BroadcastsTable />
        </TabsContent>
        <TabsContent value="suppressions" className="pt-4">
          <SuppressionsTable />
        </TabsContent>
      </Tabs>
    </div>
  )
}
