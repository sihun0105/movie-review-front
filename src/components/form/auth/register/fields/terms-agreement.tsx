import { FunctionComponent, HTMLAttributes, useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ChevronDown, ChevronUp, FileText, Shield } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { ScrollArea } from '@/components/ui/scroll-area'

interface TermsAgreementProps extends HTMLAttributes<HTMLDivElement> {
  onAgreementChange: (isAgreed: boolean) => void
  isValid: boolean
}

interface TermsData {
  termsOfService: string
  privacyPolicy: string
}

const TermsAgreement: FunctionComponent<TermsAgreementProps> = ({
  className,
  onAgreementChange,
  isValid: _isValid,
  ...props
}) => {
  const [termsData, setTermsData] = useState<TermsData>({
    termsOfService: '',
    privacyPolicy: '',
  })
  const [isLoading, setIsLoading] = useState(true)
  const [agreements, setAgreements] = useState({
    termsOfService: false,
    privacyPolicy: false,
    marketing: false, // 선택 약관
  })
  const [expandedSections, setExpandedSections] = useState({
    termsOfService: false,
    privacyPolicy: false,
  })

  useEffect(() => {
    const loadTerms = async () => {
      try {
        // MD 파일을 동적으로 import
        const [termsResponse, privacyResponse] = await Promise.all([
          fetch('/api/terms/terms-of-service'),
          fetch('/api/terms/privacy-policy'),
        ])

        const termsData = await termsResponse.text()
        const privacyData = await privacyResponse.text()

        setTermsData({
          termsOfService: termsData,
          privacyPolicy: privacyData,
        })
      } catch (error) {
        console.error('Error loading terms:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadTerms()
  }, [])

  useEffect(() => {
    // 필수 약관 모두 동의했는지 확인
    const isAllRequiredAgreed =
      agreements.termsOfService && agreements.privacyPolicy
    onAgreementChange(isAllRequiredAgreed)
  }, [agreements, onAgreementChange])

  const handleAgreementChange = (
    type: keyof typeof agreements,
    checked: boolean,
  ) => {
    setAgreements((prev) => ({
      ...prev,
      [type]: checked,
    }))
  }

  const handleSelectAll = (checked: boolean) => {
    setAgreements({
      termsOfService: checked,
      privacyPolicy: checked,
      marketing: checked,
    })
  }

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const isAllSelected =
    agreements.termsOfService &&
    agreements.privacyPolicy &&
    agreements.marketing
  const isAllRequiredSelected =
    agreements.termsOfService && agreements.privacyPolicy

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className={cn('space-y-6', className)} {...props}>
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold text-gray-900">약관 동의</h2>
        <p className="text-gray-600">서비스 이용을 위해 약관에 동의해주세요.</p>
      </div>

      {/* 전체 동의 */}
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <div className="flex items-center space-x-3">
          <Checkbox
            id="select-all"
            checked={isAllSelected}
            onCheckedChange={handleSelectAll}
            className="h-5 w-5"
          />
          <label
            htmlFor="select-all"
            className="flex-1 cursor-pointer text-lg font-semibold text-gray-900"
          >
            전체 동의
          </label>
        </div>
        <p className="ml-8 mt-2 text-sm text-gray-600">
          서비스 이용약관, 개인정보 처리방침, 마케팅 정보 수신에 모두
          동의합니다.
        </p>
      </div>

      {/* 개별 약관 동의 */}
      <div className="space-y-4">
        {/* 서비스 이용약관 */}
        <div className="rounded-lg border border-gray-200">
          <div className="border-b border-gray-100 p-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-1 items-center space-x-3">
                <Checkbox
                  id="terms-of-service"
                  checked={agreements.termsOfService}
                  onCheckedChange={(checked: boolean) =>
                    handleAgreementChange('termsOfService', checked)
                  }
                  className="h-5 w-5"
                />
                <label
                  htmlFor="terms-of-service"
                  className="flex cursor-pointer items-center gap-2 font-medium text-gray-900"
                >
                  <FileText className="h-4 w-4" />
                  서비스 이용약관 동의
                  <span className="text-sm text-red-500">(필수)</span>
                </label>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleSection('termsOfService')}
                className="p-1"
              >
                {expandedSections.termsOfService ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          {expandedSections.termsOfService && (
            <div className="p-4">
              <ScrollArea className="h-64 w-full rounded border">
                <div className="p-4">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    className="prose prose-sm max-w-none"
                  >
                    {termsData.termsOfService}
                  </ReactMarkdown>
                </div>
              </ScrollArea>
            </div>
          )}
        </div>

        {/* 개인정보 처리방침 */}
        <div className="rounded-lg border border-gray-200">
          <div className="border-b border-gray-100 p-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-1 items-center space-x-3">
                <Checkbox
                  id="privacy-policy"
                  checked={agreements.privacyPolicy}
                  onCheckedChange={(checked: boolean) =>
                    handleAgreementChange('privacyPolicy', checked)
                  }
                  className="h-5 w-5"
                />
                <label
                  htmlFor="privacy-policy"
                  className="flex cursor-pointer items-center gap-2 font-medium text-gray-900"
                >
                  <Shield className="h-4 w-4" />
                  개인정보 처리방침 동의
                  <span className="text-sm text-red-500">(필수)</span>
                </label>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleSection('privacyPolicy')}
                className="p-1"
              >
                {expandedSections.privacyPolicy ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          {expandedSections.privacyPolicy && (
            <div className="p-4">
              <ScrollArea className="h-64 w-full rounded border">
                <div className="p-4">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    className="prose prose-sm max-w-none"
                  >
                    {termsData.privacyPolicy}
                  </ReactMarkdown>
                </div>
              </ScrollArea>
            </div>
          )}
        </div>

        {/* 마케팅 정보 수신 동의 (선택) */}
        <div className="rounded-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <Checkbox
              id="marketing"
              checked={agreements.marketing}
              onCheckedChange={(checked: boolean) =>
                handleAgreementChange('marketing', checked)
              }
              className="h-5 w-5"
            />
            <label
              htmlFor="marketing"
              className="flex cursor-pointer items-center gap-2 font-medium text-gray-900"
            >
              마케팅 정보 수신 동의
              <span className="text-sm text-gray-500">(선택)</span>
            </label>
          </div>
          <p className="ml-8 mt-2 text-sm text-gray-600">
            서비스 관련 이벤트, 프로모션, 새로운 기능 안내 등의 마케팅 정보를
            이메일로 받아보실 수 있습니다.
          </p>
        </div>
      </div>

      {/* 필수 약관 미동의 시 안내 메시지 */}
      {!isAllRequiredSelected && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-700">
            서비스 이용을 위해 필수 약관에 모두 동의해주세요.
          </p>
        </div>
      )}
    </div>
  )
}

export { TermsAgreement }
