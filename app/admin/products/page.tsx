'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

type Product = {
  id: string
  title: string
  price: number
  is_active: boolean
  images: string[]
  artisan: {
    name: string
  } | null
}



export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
    

      const { data, error } = await supabase
  .from('products')
  .select(`
    id,
    title,
    price,
    is_active,
    images,
    artisan:profiles!fk_artisan (
      name
    )
  `)

        .order('created_at', { ascending: false })
        console.log('Supabase URL in App :', process.env.NEXT_PUBLIC_SUPABASE_URL)

      if (!error && data) {
  const normalized: Product[] = data.map((p: any) => ({
    id: p.id,
    title: p.title,
    price: p.price,
    is_active: p.is_active,
    images: p.images,
    artisan: p.artisan
      ? Array.isArray(p.artisan)
        ? p.artisan[0] ?? null
        : p.artisan
      : null
  }))

  setProducts(normalized)
}


      setLoading(false)
    }

    fetchProducts()
  }, [])

  if (loading) return <p>Loading...</p>

  return (
    <div>
      <h1>Products</h1>

      <a href="/admin/products/new">+ Add Product</a>

      {products.length === 0 && <p>No products found.</p>}

      <table style={{ marginTop: 20, width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th align="left">Image</th>
            <th align="left">Title</th>
            <th align="left">Artisan</th>
            <th align="left">Price</th>
            <th align="left">Active</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => {
  console.log('PRODUCT ROW:', p)
  return (
            <tr key={p.id}>
              <td>
                {p.images?.[0] && (
                  <img
                    src={p.images[0]}
                    alt={p.title}
                    style={{ width: 60, borderRadius: 6 }}
                  />
                )}
              </td>
              <td>{p.title}</td>
              <td>{p.artisan?.name ?? '—'}</td>


              <td>₹{p.price}</td>
              <td>{p.is_active ? 'Yes' : 'No'}</td>
            </tr>
            )
})}
        </tbody>
      </table>
    </div>
  )
}
