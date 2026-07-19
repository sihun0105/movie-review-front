import { describe, expect, it } from 'vitest'
import {
  findChatCounterpart,
  findChatMemberProfile,
  getChatRoomDisplayName,
} from './chat-profile'

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

  it('excludes the current user when response ids use different types', () => {
    const counterpart = findChatCounterpart(
      {
        chatRoomId: 'room-1',
        roomName: '채팅방',
        type: 'direct',
        memberIds: ['4', '7'],
        memberProfiles: [
          { userId: '4', nickname: '나', image: 'me.png' },
          { userId: '7', nickname: '상대방', image: 'target.png' },
        ],
        createdAt: '2026-07-19',
        updatedAt: '2026-07-19',
      } as any,
      4,
    )

    expect(counterpart).toEqual({
      userId: 7,
      profile: { userId: '7', nickname: '상대방', image: 'target.png' },
    })
  })

  it('uses the counterpart nickname as a direct room display name', () => {
    const name = getChatRoomDisplayName(
      {
        chatRoomId: 'room-1',
        roomName: '내 닉네임과의 채팅',
        type: 'direct',
        memberIds: [4, 7],
        memberProfiles: [
          { userId: 4, nickname: '나', image: 'me.png' },
          { userId: 7, nickname: '상대방', image: 'target.png' },
        ],
        matchTitle: '영화 매칭',
        createdAt: '2026-07-19',
        updatedAt: '2026-07-19',
      },
      4,
    )

    expect(name).toBe('상대방')
  })
})
