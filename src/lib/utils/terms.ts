import fs from 'fs'
import path from 'path'

export interface TermsContent {
  content: string
  lastModified: string
}

export const getTermsOfService = async (): Promise<TermsContent> => {
  try {
    const filePath = path.join(process.cwd(), 'src/data/terms-of-service.md')
    const content = fs.readFileSync(filePath, 'utf8')
    const stats = fs.statSync(filePath)

    return {
      content,
      lastModified: stats.mtime.toISOString(),
    }
  } catch (error) {
    console.error('Error reading terms of service:', error)
    return {
      content: '이용약관을 불러올 수 없습니다.',
      lastModified: new Date().toISOString(),
    }
  }
}

export const getPrivacyPolicy = async (): Promise<TermsContent> => {
  try {
    const filePath = path.join(process.cwd(), 'src/data/privacy-policy.md')
    const content = fs.readFileSync(filePath, 'utf8')
    const stats = fs.statSync(filePath)

    return {
      content,
      lastModified: stats.mtime.toISOString(),
    }
  } catch (error) {
    console.error('Error reading privacy policy:', error)
    return {
      content: '개인정보 처리방침을 불러올 수 없습니다.',
      lastModified: new Date().toISOString(),
    }
  }
}
