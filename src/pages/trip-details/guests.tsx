import { CheckCircle2, CircleDashed, UserCog } from 'lucide-react'
import { Button } from '../../components/button'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { api } from '../../lib/axios'

interface IGuest {
  id: string
  name: string | null
  email: string
  is_confirmed: boolean
}

export default function Guests() {
  const { tripId } = useParams()

  const [participants, setParticipants] = useState<IGuest[]>([])

  useEffect(() => {
    api.get(`/trips/${tripId}/participants`).then((res) => {
      setParticipants(res.data.participants)
    })
  }, [tripId])
  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Convidados</h2>

      {participants &&
        participants.map((participant, index) => {
          return (
            <div key={participant.id} className="space-y-5">
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <span className="block font-medium text-zinc-100">
                    {participant.name ?? `Convidado ${index}`}
                  </span>

                  <span className="block text-sm text-zinc-400 truncate">
                    {participant.email}
                  </span>
                </div>
                {participant.is_confirmed ? (
                  <CheckCircle2 className="size-5 shrink-0 text-green-400" />
                ) : (
                  <CircleDashed className="text-zinc-400 size-5 shrink-0" />
                )}
              </div>
            </div>
          )
        })}

      <Button variant="secondary" size="full">
        <UserCog className="size-5" />
        Gerenciar convidados
      </Button>
    </div>
  )
}
