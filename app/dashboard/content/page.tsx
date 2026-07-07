import { PageHeader } from "@/components/layout/page-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PagesTable } from "@/features/admin/content/components/pages-table"
import { WelcomeForm } from "@/features/admin/content/components/welcome-form"

export default function ContentPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Content"
        description="Static pages and the welcome screen."
      />
      <Tabs defaultValue="pages">
        <TabsList>
          <TabsTrigger value="pages">Pages</TabsTrigger>
          <TabsTrigger value="welcome">Welcome screen</TabsTrigger>
        </TabsList>
        <TabsContent value="pages" className="pt-4">
          <PagesTable />
        </TabsContent>
        <TabsContent value="welcome" className="pt-4">
          <WelcomeForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}
