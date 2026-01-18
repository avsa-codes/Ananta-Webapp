import { ReactNode } from "react"
import Link from "next/link"

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside
        style={{
          width: 220,
          padding: "1rem",
          borderRight: "1px solid #ddd",
        }}
      >
        <h3>Ananta Admin</h3>

        <nav style={{ marginTop: "1rem" }}>
          <p>
            <Link href="/admin/dashboard">Dashboard</Link>
          </p>

          <p>
            <Link href="/admin/products">Products</Link>
          </p>

          <p>
            <Link href="/admin/orders">Orders</Link>
          </p>

          <hr style={{ margin: "1rem 0" }} />

          <p>
            <Link href="/admin/profiles">Profiles</Link>
          </p>

          <p>
            <Link href="/admin/profiles/new">Add Profile</Link>
          </p>
        </nav>
      </aside>

      <main style={{ flex: 1, padding: "2rem" }}>
        {children}
      </main>
    </div>
  )
}
