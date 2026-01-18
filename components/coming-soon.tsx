import { Clock } from "lucide-react"

export function ComingSoon({ title }: { title: string }) {
  return (
    <div className="border rounded-lg p-12 text-center bg-muted/30">
      <Clock className="w-8 h-8 mx-auto mb-4 text-muted-foreground" />
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">
        This feature is coming soon.
      </p>
    </div>
  )
}
