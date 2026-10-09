import type { MatchParticipant } from '@/lib/type'
import { MatchParticipantDataSource } from './match-participant-datasource'

export class MatchParticipantRepository {
  private readonly dataSource = new MatchParticipantDataSource()

  async getParticipants(matchId: string): Promise<MatchParticipant[]> {
    if (!matchId.trim()) throw new Error('매치 ID가 필요합니다.')

    const data = await this.dataSource.getParticipants(matchId)
    if (
      !data ||
      (data.participants !== undefined && !Array.isArray(data.participants))
    ) {
      throw new Error('Invalid match participants response')
    }
    return data.participants ?? []
  }
}
