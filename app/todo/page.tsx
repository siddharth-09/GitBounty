// components/UserList.tsx
'use client'
/* eslint-disable  @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function UserList() {
  const [users, setUsers] = useState<any[]>([])

  useEffect(() => {
    const supabase = createClient()

    async function fetchUsers() {
      const { data, error } = await supabase.from('user').select('*')

      if (error) {
        console.error('Error fetching users:', error)
      } else {
        console.log('Fetched users:', data)
        setUsers(data)
      }
    }

    fetchUsers()
  }, [])

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          {user.name} - {user.userid}
        </li>
      ))}
    </ul>
  )
}
