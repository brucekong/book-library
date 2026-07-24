import React, { useState } from 'react';
import { Mail, Key, Smartphone, Check, AlertCircle } from 'lucide-react';
import { Modal } from './components/Modal';
import {
  TermsOfServiceContent,
  PrivacyPolicyContent,
  CommunityGuidelinesContent,
} from './components/TermsContent';
import {
  PhoneLoginModal,
  EmailLoginModal,
  KeyLoginModal,
  UserWelcomeModal,
} from './components/AuthModals';

export default function App() {
  // Checkbox State
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  // Active Modals State
  const [activeTermsModal, setActiveTermsModal] = useState<
    'tos' | 'privacy' | 'community' | null
  >(null);
  const [activeAuthModal, setActiveAuthModal] = useState<
    'phone' | 'email' | 'key' | null
  >(null);

  // Loading and Login Session State
  const [isWechatLoading, setIsWechatLoading] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  // Trigger error shake if terms are unaccepted
  const triggerUnagreedNotice = () => {
    setIsShaking(true);
    setShowErrorToast(true);
    setTimeout(() => setIsShaking(false), 400);
    setTimeout(() => setShowErrorToast(false), 4000);
  };

  // WeChat Login Action
  const handleWechatLogin = () => {
    if (!agreedTerms) {
      triggerUnagreedNotice();
      return;
    }
    setIsWechatLoading(true);
    setTimeout(() => {
      setIsWechatLoading(false);
      setLoggedInUser('NeighborWeChat_882');
    }, 1200);
  };

  // General Auth Trigger
  const handleAuthTrigger = (type: 'phone' | 'email' | 'key') => {
    if (!agreedTerms) {
      triggerUnagreedNotice();
      return;
    }
    setActiveAuthModal(type);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f9faf2] text-[#191c18] font-['Plus_Jakarta_Sans',sans-serif] relative overflow-hidden">
      {/* Subtle Toast Alert for Unchecked Terms */}
      {showErrorToast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#ba1a1a] text-white text-xs font-semibold px-4 py-3 rounded-full shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-300 max-w-[90%] sm:max-w-md border border-red-400">
          <AlertCircle size={16} className="shrink-0" />
          <span>Please read and agree to the Terms and Guidelines to continue. / 请勾选同意条款</span>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-grow flex flex-col items-center justify-center px-5 py-8 max-w-[1040px] mx-auto w-full z-10">
        {/* Header Branding */}
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-[32px] sm:text-[40px] leading-[38px] sm:leading-[48px] font-bold text-[#154212] tracking-tight mb-1.5">
            NeighborBooks
          </h1>
          <p className="text-base text-[#42493e] font-normal">
            邻里书屋 - 让阅读回归社区
          </p>
        </div>

        {/* Illustration Section */}
        <div className="relative w-full max-w-[360px] sm:max-w-[400px] mb-8 sm:mb-10 flex justify-center items-center">
          {/* Organic Glow Background */}
          <div className="absolute inset-0 bg-[#bcf0ae] opacity-25 organic-shape animate-pulse blur-3xl -z-10 scale-110"></div>

          {/* Book Illustration Card */}
          <div className="w-full aspect-square overflow-hidden rounded-2xl bg-[#edefe7] shadow-sm border border-[#e2e3dc] group transition-all duration-300 hover:shadow-md">
            <img
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              alt="Neighbors reading physical books together on park benches under sunlight"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnMYGmK8LAIDkbZbhI6jAQGp7lTY520VWYdepXXeIjoda7dS-zcDb2_BSekWfLaNkAWzmaeECKHM65XWntVphp2YudMv-z7K6fwlKsbkLL4zKn8R-wm2ZCeQURuCJHpJcHGL2vbFHJccq6hrzHU5iCrvZ8TgwEb5L6S2_NjEcdtKyVodLhdb61668xEdGpZBXFiB7zmMj_744fukUslo1xDDnyZa7oRfbvVYYFoy-aHr71BjMn9ufPB60CLIv2JZKgGs7zjFsHzQM"
            />
          </div>
        </div>

        {/* Login Container */}
        <div className="w-full max-w-sm sm:max-w-md space-y-4">
          {/* WeChat Quick Login (Primary) */}
          <button
            onClick={handleWechatLogin}
            disabled={isWechatLoading}
            className="w-full flex items-center justify-center gap-2.5 bg-[#154212] text-[#ffffff] py-4 rounded-full font-semibold text-sm btn-interaction transition-all shadow-sm hover:opacity-95 active:scale-[0.98] cursor-pointer disabled:opacity-75"
          >
            {isWechatLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Connecting to WeChat...</span>
              </>
            ) : (
              <>
                <span
                  className="material-symbols-filled text-lg"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  chat_bubble
                </span>
                <span>WeChat Quick Login</span>
              </>
            )}
          </button>

          {/* Phone Number Login (Secondary) */}
          <button
            onClick={() => handleAuthTrigger('phone')}
            className="w-full flex items-center justify-center gap-2.5 border-[1.5px] border-[#154212] text-[#154212] bg-transparent py-4 rounded-full font-semibold text-sm btn-interaction transition-all hover:bg-[#a1d494]/15 active:scale-[0.98] cursor-pointer"
          >
            <Smartphone size={18} />
            <span>Phone Number Login</span>
          </button>
        </div>

        {/* Alternative Login Options */}
        <div className="w-full max-w-sm sm:max-w-md mt-7 flex items-center gap-5 text-[#72796e]">
          <div className="h-[1px] flex-grow bg-[#c2c9bb]"></div>
          <span className="text-xs font-semibold uppercase tracking-widest text-[#72796e]">
            OTHER WAYS
          </span>
          <div className="h-[1px] flex-grow bg-[#c2c9bb]"></div>
        </div>

        <div className="mt-5 flex gap-5">
          <button
            onClick={() => handleAuthTrigger('email')}
            title="Sign in with Email"
            className="p-3.5 rounded-full bg-[#f3f4ed] text-[#42493e] hover:text-[#154212] hover:bg-[#edefe7] transition-all btn-interaction border border-[#e2e3dc] shadow-xs cursor-pointer"
          >
            <Mail size={18} />
          </button>
          <button
            onClick={() => handleAuthTrigger('key')}
            title="Sign in with Passcode / Key"
            className="p-3.5 rounded-full bg-[#f3f4ed] text-[#42493e] hover:text-[#154212] hover:bg-[#edefe7] transition-all btn-interaction border border-[#e2e3dc] shadow-xs cursor-pointer"
          >
            <Key size={18} />
          </button>
        </div>
      </main>

      {/* Footer Terms and Conditions */}
      <footer
        className={`w-full px-5 pb-8 pt-4 mt-auto max-w-sm sm:max-w-md mx-auto z-10 ${
          isShaking ? 'animate-shake' : ''
        }`}
      >
        <div className="flex items-start gap-3">
          <label className="relative flex items-center mt-0.5 cursor-pointer select-none">
            <input
              type="checkbox"
              id="terms"
              checked={agreedTerms}
              onChange={(e) => {
                setAgreedTerms(e.target.checked);
                if (e.target.checked) setShowErrorToast(false);
              }}
              className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-[#72796e] transition-all checked:bg-[#154212] checked:border-[#154212] focus:outline-none"
            />
            <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <Check size={14} strokeWidth={3} />
            </span>
          </label>
          <p className="text-xs text-[#42493e] leading-relaxed select-none">
            I have read and agree to the{' '}
            <button
              type="button"
              onClick={() => setActiveTermsModal('tos')}
              className="text-[#154212] font-bold hover:underline cursor-pointer"
            >
              Terms of Service
            </button>
            ,{' '}
            <button
              type="button"
              onClick={() => setActiveTermsModal('privacy')}
              className="text-[#154212] font-bold hover:underline cursor-pointer"
            >
              Privacy Policy
            </button>
            , and{' '}
            <button
              type="button"
              onClick={() => setActiveTermsModal('community')}
              className="text-[#154212] font-bold hover:underline cursor-pointer"
            >
              Community Guidelines
            </button>
            .
          </p>
        </div>
      </footer>

      {/* Terms Modals */}
      <Modal
        isOpen={activeTermsModal === 'tos'}
        onClose={() => setActiveTermsModal(null)}
        title="Terms of Service / 服务条款"
      >
        <TermsOfServiceContent />
      </Modal>

      <Modal
        isOpen={activeTermsModal === 'privacy'}
        onClose={() => setActiveTermsModal(null)}
        title="Privacy Policy / 隐私政策"
      >
        <PrivacyPolicyContent />
      </Modal>

      <Modal
        isOpen={activeTermsModal === 'community'}
        onClose={() => setActiveTermsModal(null)}
        title="Community Guidelines / 社区公约"
      >
        <CommunityGuidelinesContent />
      </Modal>

      {/* Auth Modals */}
      <PhoneLoginModal
        isOpen={activeAuthModal === 'phone'}
        onClose={() => setActiveAuthModal(null)}
        onSuccess={(phone) => setLoggedInUser(`+86 ${phone}`)}
      />

      <EmailLoginModal
        isOpen={activeAuthModal === 'email'}
        onClose={() => setActiveAuthModal(null)}
        onSuccess={(email) => setLoggedInUser(email)}
      />

      <KeyLoginModal
        isOpen={activeAuthModal === 'key'}
        onClose={() => setActiveAuthModal(null)}
        onSuccess={(keyName) => setLoggedInUser(keyName)}
      />

      {/* Logged in User Modal */}
      <UserWelcomeModal
        isOpen={Boolean(loggedInUser)}
        onClose={() => setLoggedInUser(null)}
        accountName={loggedInUser || ''}
        onSignOut={() => setLoggedInUser(null)}
      />
    </div>
  );
}
