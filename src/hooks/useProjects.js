import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export const useProjects = (limit) => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    const fetchProjects = async () => {
      setLoading(true)
      setError(null)

      let query = supabase
        .from('projects')
        .select('*')
        .eq('is_published', true)
        .order('sort_order', { ascending: true })

      if (limit) {
        query = query.limit(limit)
      }

      try {
        const { data, error: fetchError } = await query
        if (!isMounted) return

        if (fetchError) {
          setError(fetchError.message)
        } else {
          setProjects(data ?? [])
        }
      } catch (err) {
        if (!isMounted) return
        setError(err.message)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchProjects()

    return () => {
      isMounted = false
    }
  }, [limit])

  return { projects, loading, error }
}
