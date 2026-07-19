import { describe, expect, it } from 'vitest'
import { convertApiResponseToChatRoomEntity } from './chat-mapper'

describe('convertApiResponseToChatRoomEntity', () => {
  it('normalizes member ids from a JSON response', () => {
    const room = convertApiResponseToChatRoomEntity({
      id: 'room-1',
      name: '채팅방',
      type: 'direct',
      memberIds: ['4', '7'],
      memberProfiles: [
        { userId: '4', nickname: '나', image: 'me.png' },
        { userId: '7', nickname: '상대방', image: 'target.png' },
      ],
      createdAt: '2026-07-19',
      updatedAt: '2026-07-19',
    })

    expect(room.memberIds).toEqual([4, 7])
    expect(room.memberProfiles?.map((profile) => profile.userId)).toEqual([
      4, 7,
    ])
  })
})
