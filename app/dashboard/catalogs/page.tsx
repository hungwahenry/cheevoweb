import { PageHeader } from "@/components/admin/layout/page-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReportReasonsCatalog } from "@/features/admin/catalogs/components/report-reasons-catalog"
import { SimpleCatalog } from "@/features/admin/catalogs/components/simple-catalog"

export default function CatalogsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Catalogs"
        description="Reference data that powers the apps — interests, categories, platforms and report reasons."
      />
      <Tabs defaultValue="interests">
        <TabsList>
          <TabsTrigger value="interests">Interests</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="platforms">Social platforms</TabsTrigger>
          <TabsTrigger value="reasons">Report reasons</TabsTrigger>
        </TabsList>
        <TabsContent value="interests" className="pt-4">
          <SimpleCatalog resource="interests" singular="Interest" />
        </TabsContent>
        <TabsContent value="categories" className="pt-4">
          <SimpleCatalog
            resource="organisation-categories"
            singular="Category"
          />
        </TabsContent>
        <TabsContent value="platforms" className="pt-4">
          <SimpleCatalog
            resource="social-platforms"
            singular="Platform"
            hasBaseUrl
          />
        </TabsContent>
        <TabsContent value="reasons" className="pt-4">
          <ReportReasonsCatalog />
        </TabsContent>
      </Tabs>
    </div>
  )
}
