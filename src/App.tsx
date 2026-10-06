import { Routes, Route, Navigate, useParams } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext'
import { ScrollToTop } from './components/marketing/ScrollToTop'
import { HomePage } from './pages/HomePage'
import { SolutionsIndexPage } from './pages/SolutionsIndexPage'
import { SolutionDetailPage } from './pages/SolutionDetailPage'
import { ProjectsIndexPage } from './pages/ProjectsIndexPage'
import { ProjectDetailPage } from './pages/ProjectDetailPage'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { BlogPage } from './pages/BlogPage'
import { AuthPage } from './pages/AuthPage'
import { AdminPage } from './pages/AdminPage'
import { AIBuilder } from './pages/AIBuilder'
import { Investment } from './pages/Investment'
import { Packages } from './pages/Packages'
import { LoginPage } from './pages/LoginPage'
import { AuthCallback } from './pages/AuthCallback'
import { LegalDocumentPage } from './pages/LegalDocumentPage'
import { PrivacyPolicy } from './pages/PrivacyPolicy'
import { TermsOfService } from './pages/TermsOfService'
import { RefundPolicy } from './pages/RefundPolicy'
import { DataSecurityPolicy } from './pages/DataSecurityPolicy'
import { CommercialAgreement } from './pages/CommercialAgreement'
import { Subprocessors } from './pages/Subprocessors'
import { AccountDeletionPolicy } from './pages/AccountDeletionPolicy'
import { ChildSafetyPolicy } from './pages/ChildSafetyPolicy'
import { CommunityPolicy } from './pages/CommunityPolicy'
import { KbsPrimePrivacyPolicy } from './pages/KbsPrimePrivacyPolicy'
import { KbsPrimePrivacyPolicyTR } from './pages/KbsPrimePrivacyPolicyTR'
import { KbsPrimeTerms } from './pages/KbsPrimeTerms'
import { KbsPrimeLanding } from './pages/KbsPrimeLanding'
import { KbsPrimeAccountDeletion } from './pages/KbsPrimeAccountDeletion'
import { KbsPrimeSupport } from './pages/KbsPrimeSupport'
import { MyTrabzonLanding } from './pages/MyTrabzonLanding'
import { MyTrabzonAccountDeletion } from './pages/MyTrabzonAccountDeletion'
import { ValoriaAppLanding } from './pages/ValoriaAppLanding'
import { ValoriaAppPrivacy } from './pages/ValoriaAppPrivacy'
import { ValoriaAppTerms } from './pages/ValoriaAppTerms'
import { ValoriaAppAccountDeletion } from './pages/ValoriaAppAccountDeletion'
import { ValoriaAppSupport } from './pages/ValoriaAppSupport'
import { NoctaAppLanding } from './pages/NoctaAppLanding'
import { NoctaAppPrivacy } from './pages/NoctaAppPrivacy'
import { NoctaAppTerms } from './pages/NoctaAppTerms'
import { NoctaAppSupport } from './pages/NoctaAppSupport'
import { NoctaAppAccountDeletion } from './pages/NoctaAppAccountDeletion'
import { NoctaAppChildSafety } from './pages/NoctaAppChildSafety'
import { VoraAppLanding } from './pages/VoraAppLanding'
import { VoraAppPrivacy } from './pages/VoraAppPrivacy'
import { VoraAppTerms } from './pages/VoraAppTerms'
import { VoraAppSupport } from './pages/VoraAppSupport'
import { VoraAppAccountDeletion } from './pages/VoraAppAccountDeletion'
import { VoraAppChildSafety } from './pages/VoraAppChildSafety'
import { VoraAppSubscription } from './pages/VoraAppSubscription'
import { TamusoAppLanding } from './pages/TamusoAppLanding'
import { TamusoAppPrivacy } from './pages/TamusoAppPrivacy'
import { TamusoAppTerms } from './pages/TamusoAppTerms'
import { TamusoAppSupport } from './pages/TamusoAppSupport'
import { TamusoAppAccountDeletion } from './pages/TamusoAppAccountDeletion'
import { TamusoAppChildSafety } from './pages/TamusoAppChildSafety'
import { BlogManagement } from './pages/BlogManagement'
import { AdminLogin } from './pages/AdminLogin'
import { SuccessPage } from './pages/SuccessPage'
import { CancelPage } from './pages/CancelPage'
import { ResetPasswordPage } from './pages/ResetPasswordPage'
import { EmailConfirmPage } from './pages/EmailConfirmPage'
import { OnboardingPage } from './pages/OnboardingPage'
import { DonationPage } from './pages/DonationPage'
import { ProfilePage } from './pages/ProfilePage'
import { MyTrabzonCallback } from './pages/MyTrabzonCallback'
import { SupportPage } from './pages/SupportPage'
import { CmsPublicPage } from './pages/CmsPublicPage'
import { ProjemiAnlatPage } from './pages/ProjemiAnlatPage'
import { DestekPage } from './pages/DestekPage'
import { SssPage } from './pages/SssPage'
import { FeedPage } from './pages/FeedPage'
import { SearchPage } from './pages/SearchPage'
import {
  CaseStudiesPage,
  CaseStudyPage,
  CookiesPage,
  FeedPostPage,
  NotFoundPage,
  ProcessPage,
  ProductPage,
  ProductsPage,
  ServerErrorPage,
  ServicePage,
  ServicesPage,
  TechnologyPage,
} from './pages/platform/CatalogPages'
import { useEffect } from 'react'
import { AuthHashRedirect } from './components/auth/AuthHashRedirect'
import { SeoHealthPage, SeoRuntime } from './components/marketing/SeoRuntime'

function ProjectAlias() {
  const { slug } = useParams()
  return <Navigate to={`/projeler/${slug || ''}`} replace />
}

function LegacyAdminRedirect() {
  useEffect(() => {
    // Same-origin admin mode works without admin.* DNS
    window.location.replace('/login?admin=1')
  }, [])
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-200">
      Redirecting to admin…
    </div>
  )
}

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <ScrollToTop />
        <AuthHashRedirect />
        <SeoRuntime />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projemi-anlat" element={<ProjemiAnlatPage />} />
          <Route path="/iletisim" element={<Navigate to="/contact" replace />} />
          <Route path="/destek" element={<DestekPage />} />
          <Route path="/sss" element={<SssPage />} />
          <Route path="/cozumler" element={<SolutionsIndexPage />} />
          <Route path="/cozumler/:slug" element={<SolutionDetailPage />} />
          <Route path="/projeler" element={<ProjectsIndexPage />} />
          <Route path="/projeler/:slug" element={<ProjectDetailPage />} />
          <Route path="/solutions/hotels" element={<Navigate to="/cozumler/otel-yonetim-sistemi" replace />} />
          <Route path="/solutions/restaurants" element={<Navigate to="/cozumler/restoran-yonetim-sistemi" replace />} />
          <Route path="/solutions/construction" element={<Navigate to="/cozumler/ozel-yazilim" replace />} />
          <Route path="/solutions/pharma" element={<Navigate to="/cozumler/ozel-yazilim" replace />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<FeedPostPage />} />
          <Route path="/seo-health" element={<SeoHealthPage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/feed/:slug" element={<FeedPostPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:slug" element={<ProductPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServicePage />} />
          <Route path="/projects" element={<Navigate to="/projeler" replace />} />
          <Route path="/projects/:slug" element={<ProjectAlias />} />
          <Route path="/case-studies" element={<CaseStudiesPage />} />
          <Route path="/case-studies/:slug" element={<CaseStudyPage />} />
          <Route path="/technology" element={<TechnologyPage />} />
          <Route path="/process" element={<ProcessPage />} />
          <Route path="/support" element={<Navigate to="/destek" replace />} />
          <Route path="/privacy" element={<Navigate to="/privacy-policy" replace />} />
          <Route path="/terms" element={<Navigate to="/terms-of-service" replace />} />
          <Route path="/cookies" element={<CookiesPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/500" element={<ServerErrorPage />} />
          <Route path="/donation" element={<DonationPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/giris" element={<AuthPage />} />
          <Route path="/kayit" element={<AuthPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
          <Route path="/sifremi-unuttum" element={<ResetPasswordPage />} />
          <Route path="/auth/confirm" element={<EmailConfirmPage />} />
          <Route path="/auth/onboarding" element={<OnboardingPage />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/mytrabzon/callback" element={<MyTrabzonCallback />} />
          <Route path="/support/mytrabzon" element={<SupportPage />} />
          <Route
            path="/admin"
            element={
              <LegacyAdminRedirect />
            }
          />
          <Route path="/admin/legacy" element={<AdminPage />} />
          <Route path="/ai-builder" element={<AIBuilder />} />
          <Route path="/investment" element={<Investment />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/legal" element={<LegalDocumentPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/data-security-policy" element={<DataSecurityPolicy />} />
          <Route path="/commercial-agreement" element={<CommercialAgreement />} />
          <Route path="/subprocessors" element={<Subprocessors />} />
          <Route path="/account-deletion-policy" element={<AccountDeletionPolicy />} />
          <Route path="/child-safety-policy" element={<ChildSafetyPolicy />} />
          <Route path="/community-policy" element={<CommunityPolicy />} />
          <Route path="/kbs-prime-privacy" element={<KbsPrimePrivacyPolicy />} />
          <Route path="/kbs-prime-privacy-tr" element={<KbsPrimePrivacyPolicyTR />} />
          <Route path="/kbs-prime-terms" element={<KbsPrimeTerms />} />
          <Route path="/kbs-prime" element={<KbsPrimeLanding />} />
          <Route path="/kbs-prime/delete-account" element={<KbsPrimeAccountDeletion />} />
          <Route path="/support/kbs-prime" element={<KbsPrimeSupport />} />
          <Route path="/mytrabzon" element={<MyTrabzonLanding />} />
          <Route path="/mytrabzon/delete-account" element={<MyTrabzonAccountDeletion />} />
          <Route path="/valoria-app" element={<ValoriaAppLanding />} />
          <Route path="/valoria-app-privacy" element={<ValoriaAppPrivacy />} />
          <Route path="/valoria-app-terms" element={<ValoriaAppTerms />} />
          <Route path="/valoria-app/delete-account" element={<ValoriaAppAccountDeletion />} />
          <Route path="/support/valoria-app" element={<ValoriaAppSupport />} />
          <Route path="/nocta" element={<NoctaAppLanding />} />
          <Route path="/nocta/gizlilik" element={<NoctaAppPrivacy />} />
          <Route path="/nocta/kullanim-sartlari" element={<NoctaAppTerms />} />
          <Route path="/nocta/sozlesme" element={<Navigate to="/nocta/kullanim-sartlari" replace />} />
          <Route path="/nocta/destek" element={<NoctaAppSupport />} />
          <Route path="/nocta/hesap-silme" element={<NoctaAppAccountDeletion />} />
          <Route path="/nocta/child-safety" element={<NoctaAppChildSafety />} />
          <Route path="/vora" element={<VoraAppLanding />} />
          <Route path="/vora/gizlilik" element={<VoraAppPrivacy />} />
          <Route path="/vora/kullanim-sartlari" element={<VoraAppTerms />} />
          <Route path="/vora/destek" element={<VoraAppSupport />} />
          <Route path="/vora/hesap-silme" element={<VoraAppAccountDeletion />} />
          <Route path="/vora/child-safety" element={<VoraAppChildSafety />} />
          <Route path="/vora/abonelik" element={<VoraAppSubscription />} />
          <Route path="/tamuso" element={<TamusoAppLanding />} />
          <Route path="/tamuso/gizlilik" element={<TamusoAppPrivacy />} />
          <Route path="/tamuso/kullanim-sartlari" element={<TamusoAppTerms />} />
          <Route path="/tamuso/sozlesme" element={<Navigate to="/tamuso/kullanim-sartlari" replace />} />
          <Route path="/tamuso/destek" element={<TamusoAppSupport />} />
          <Route path="/tamuso/hesap-silme" element={<TamusoAppAccountDeletion />} />
          <Route path="/tamuso/child-safety" element={<TamusoAppChildSafety />} />
          <Route path="/admin/blog" element={<BlogManagement />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/cancel" element={<CancelPage />} />
          <Route path="/sayfa/:slug" element={<CmsPublicPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </LanguageProvider>
  )
}

export default App
