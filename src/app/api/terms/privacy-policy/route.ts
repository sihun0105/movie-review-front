import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(_request: NextRequest) {
  try {
    const filePath = path.join(process.cwd(), 'src/data/privacy-policy.md')
    const content = fs.readFileSync(filePath, 'utf8')

    return new NextResponse(content, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    })
  } catch (error) {
    console.error('Error reading privacy policy:', error)
    return new NextResponse('개인정보 처리방침을 불러올 수 없습니다.', {
      status: 500,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    })
  }
}
