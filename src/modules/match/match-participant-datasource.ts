import { AppBackEndApiEndpoint } from '@/config/app-backend-api-endpoint'
import type { MatchParticipant } from '@/lib/type'

interface MatchParticipantsEnvelope {
  participants?: MatchParticipant[]
}

export class MatchParticipantDataSource {
  async getParticipants(matchId: string): Promise<MatchParticipantsEnvelope> {
    const response = await fetch(
      `${AppBackEndApiEndpoint.getMatchPost(matchId)}/participants`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
      },
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch match participants: ${response.status}`)
    }
    return await response.json()
  }
}
