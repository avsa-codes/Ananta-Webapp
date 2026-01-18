'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useEffect } from 'react'


const fieldStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  marginBottom: '16px'
}

const inputStyle: React.CSSProperties = {
  padding: '10px',
  border: '2px solid #ccc',
  borderRadius: '6px',
  fontSize: '14px'
}

export default function NewProductPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [isActive, setIsActive] = useState(true)

  const [artisans, setArtisans] = useState<any[]>([])
const [ngos, setNgos] = useState<any[]>([])
const [cultures, setCultures] = useState<any[]>([])

const [artisanId, setArtisanId] = useState('')
const [ngoId, setNgoId] = useState('')
const [cultureId, setCultureId] = useState('')


useEffect(() => {
  const fetchProfiles = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, name, type')
      .eq('is_active', true)

    if (error) {
      console.error('Error fetching profiles', error)
      return
    }

    setArtisans(data.filter(p => p.type === 'artisan'))
    setNgos(data.filter(p => p.type === 'ngo'))
    setCultures(data.filter(p => p.type === 'culture'))
  }

  fetchProfiles()
}, [])


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  if (!artisanId) {
    alert('Artisan is required')
    return
  }

  const { error } = await supabase.from('products').insert({
    title,
    description,
    price: Number(price),
    images: [imageUrl],

    artisan_id: artisanId,
    ngo_id: ngoId || null,
    culture_id: cultureId || null,
    is_active: isActive
  })

  if (error) {
    console.error(error)
    alert('Error saving product')
  } else {
    alert('Product saved')
  }
}



  return (
    <div style={{ maxWidth: 600 }}>
      <h1>Add Product</h1>

      <form onSubmit={handleSubmit}>

        <div style={fieldStyle}>
          <label>Title</label>
          <input
            style={inputStyle}
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>

        <div style={fieldStyle}>
          <label>Description</label>
          <textarea
            style={{ ...inputStyle, resize: 'vertical' }}
            rows={4}
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>

        <div style={fieldStyle}>
          <label>Price</label>
          <input
            style={inputStyle}
            type="number"
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
        </div>


        <div style={fieldStyle}>
  <label>Artisan *</label>
  <select
    style={inputStyle}
    value={artisanId}
    onChange={e => setArtisanId(e.target.value)}
    required
  >
    <option value="">Select artisan</option>
    {artisans.map(a => (
      <option key={a.id} value={a.id}>
        {a.name}
      </option>
    ))}
  </select>
</div>


<div style={fieldStyle}>
  <label>NGO (optional)</label>
  <select
    style={inputStyle}
    value={ngoId}
    onChange={e => setNgoId(e.target.value)}

  >
    <option value="">None</option>
    {ngos.map(n => (
      <option key={n.id} value={n.id}>
        {n.name}
      </option>
    ))}
  </select>
</div>

<div style={fieldStyle}>
  <label>Culture (optional)</label>
  <select
    style={inputStyle}
    value={cultureId}
    onChange={e => setCultureId(e.target.value)}
  >
    <option value="">None</option>
    {cultures.map(c => (
      <option key={c.id} value={c.id}>
        {c.name}
      </option>
    ))}
  </select>
</div>


        <div style={fieldStyle}>
          <label>Image URL</label>
          <input
            style={inputStyle}
            type="text"
            placeholder="https://..."
            value={imageUrl}
            onChange={e => setImageUrl(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label>
            <input
              type="checkbox"
              checked={isActive}
              onChange={e => setIsActive(e.target.checked)}
            />{' '}
            Active
          </label>
        </div>

        <button
          type="submit"
          style={{
            padding: '10px 16px',
            background: '#8B0000',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Save Product
        </button>
      </form>
    </div>
  )
}
