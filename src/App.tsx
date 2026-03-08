import { Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext'
import { HomePage } from './pages/HomePage'
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
import { MyTrabzonLanding } from './pages/MyTrabzonLanding'
import { MyTrabzonAccountDeletion } from './pages/MyTrabzonAccountDeletion'
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

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/donation" element={<DonationPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
          <Route path="/auth/confirm" element={<EmailConfirmPage />} />
          <Route path="/auth/onboarding" element={<OnboardingPage />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/mytrabzon/callback" element={<MyTrabzonCallback />} />
          <Route path="/support/mytrabzon" element={<SupportPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/ai-builder" element={<AIBuilder />} />
          <Route path="/investment" element={<Investment />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/login" element={<LoginPage />} />
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
          <Route path="/mytrabzon" element={<MyTrabzonLanding />} />
          <Route path="/mytrabzon/delete-account" element={<MyTrabzonAccountDeletion />} />
          <Route path="/admin/blog" element={<BlogManagement />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/cancel" element={<CancelPage />} />
        </Routes>
      </div>
    </LanguageProvider>
  )
}

export default App
