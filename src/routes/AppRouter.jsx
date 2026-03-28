import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import RoleRoute from './RoleRoute';

import HomePage from '../pages/public/HomePage';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';
import ResetPasswordPage from '../pages/auth/ResetPasswordPage';
import VerifyEmailPage from '../pages/auth/VerifyEmailPage';
import AboutPage from '../pages/public/AboutPage';
import ArchivesPage from '../pages/public/ArchivesPage';
import EditorialTeamPage from '../pages/public/EditorialTeamPage';
import CurrentIssuePage from '../pages/public/CurrentIssuePage';
import SearchPage from '../pages/public/SearchPage';
import ContactPage from '../pages/public/ContactPage';
import AimsAndScopePage from '../pages/public/AimsAndScopePage';
import IndexingPage from '../pages/public/IndexingPage';
import InstructionsPage from '../pages/public/InstructionsPage';
import APCPolicyPage from '../pages/public/APCPolicyPage';
import OpenAccessPage from '../pages/public/OpenAccessPage';
import EthicsPage from '../pages/public/EthicsPage';
import PrivacyPage from '../pages/public/PrivacyPage';
import ArticleDetailPage from '../pages/public/ArticleDetailPage';
import SubmissionPage from '../pages/authenticated/SubmissionPage';
import Dashboard from '../pages/authenticated/Dashboard';
import IssueDetailPage from '../pages/public/IssueDetailPage';
import ReviewPage from '../pages/authenticated/ReviewPage';
import EditorControlPage from '../pages/authenticated/EditorControlPage';
import EditorSubmissionDetailPage from '../pages/authenticated/EditorSubmissionDetailPage';
import IssueManagementPage from '../pages/authenticated/IssueManagementPage';
import PaymentPage from '../pages/authenticated/PaymentPage';
import AdminDashboardPage from '../pages/authenticated/AdminDashboardPage';
import ProfileSettingsPage from '../pages/authenticated/ProfileSettingsPage';
import PaymentCallbackPage from '../pages/authenticated/PaymentCallbackPage';
import HowToPayPage from '../pages/public/HowToPayPage';
import EditorInChiefPage from '../pages/public/EditorInChiefPage';
import PublicAnnouncementsPage from '../pages/public/PublicAnnouncementsPage';
import SubmissionDetailPage from '../pages/authenticated/SubmissionDetailPage';
import AnnouncementDetailPage from '../pages/public/AnnouncementDetailPage';
import DashboardLayout from '../components/layout/DashboardLayout';

const AppRouter = () => (
  <Routes>
    {/* Public Routes */}
    <Route path="/" element={<HomePage />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/archives" element={<ArchivesPage />} />
    <Route path="/editorial-team" element={<EditorialTeamPage />} />
    <Route path="/current" element={<CurrentIssuePage />} />
    <Route path="/search" element={<SearchPage />} />
    <Route path="/contact" element={<ContactPage />} />
    <Route path="/aims-and-scope" element={<AimsAndScopePage />} />
    <Route path="/indexing" element={<IndexingPage />} />
    <Route path="/instructions" element={<InstructionsPage />} />
    <Route path="/apc-policy" element={<APCPolicyPage />} />
    <Route path="/open-access" element={<OpenAccessPage />} />
    <Route path="/ethics" element={<EthicsPage />} />
    <Route path="/privacy" element={<PrivacyPage />} />
    <Route path="/article/:id" element={<ArticleDetailPage />} />
    <Route path="/issue/:id" element={<IssueDetailPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
    <Route path="/reset-password" element={<ResetPasswordPage />} />
    <Route path="/verify-email" element={<VerifyEmailPage />} />
    <Route path="/how-to-pay" element={<HowToPayPage />} />
    <Route path="/editor-in-chief" element={<EditorInChiefPage />} />
    <Route path="/announcements" element={<PublicAnnouncementsPage />} />
    <Route path="/announcements/:id" element={<AnnouncementDetailPage />} />
    
    {/* Protected Routes (Authenticated) */}
    <Route element={<ProtectedRoute />}>
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/submit"    element={<SubmissionPage />} />
        <Route path="/review/:id" element={<ReviewPage />} />
        <Route path="/payment/:id" element={<PaymentPage />} />
        <Route path="/payment-callback" element={<PaymentCallbackPage />} />
        <Route path="/submission/:id" element={<SubmissionDetailPage />} />
        
        {/* Editor Only */}
        <Route element={<RoleRoute roles={['editor', 'admin']} />}>
          <Route path="/editor/control" element={<EditorControlPage />} />
          <Route path="/editor/submission/:id" element={<EditorSubmissionDetailPage />} />
          <Route path="/editor/issues" element={<IssueManagementPage />} />
        </Route>
        
        {/* Admin Only */}
        <Route element={<RoleRoute roles={['admin']} />}>
          <Route path="/admin" element={<AdminDashboardPage />} />
        </Route>

        <Route path="/profile" element={<ProfileSettingsPage />} />
      </Route>
    </Route>

    {/* Fallback */}
    <Route path="*" element={<div className="py-20 text-center">404 Not Found</div>} />
  </Routes>
);

export default AppRouter;
