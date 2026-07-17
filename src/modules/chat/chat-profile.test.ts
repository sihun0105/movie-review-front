import { describe, expect, it } from 'vitest'
import { findChatMemberProfile } from './chat-profile'

describe('findChatMemberProfile', () => {
  it('returns the requested member current profile', () => {
    const profile = findChatMemberProfile(
      {
        chatRoomId: 'room-1',
        roomName: '채팅방',
        type: 'direct',
        memberIds: [4, 7],
        memberProfiles: [
          { userId: 4, nickname: '나', image: 'me.png' },
          { userId: 7, nickname: '상대방', image: 'target.png' },
        ],
        createdAt: '2026-07-17',
        updatedAt: '2026-07-17',
      },
      7,
    )

    expect(profile).toEqual({
      userId: 7,
      nickname: '상대방',
      image: 'target.png',
    })
  })
})
