import React, { useState, useEffect } from 'react';
import { Smartphone, Mail, Key, CheckCircle2, ArrowRight } from 'lucide-react';

interface ModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#f9faf2] rounded-2xl shadow-xl border border-[#e2e3dc] overflow-hidden flex flex-col p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[#e2e3dc] pb-3">
          <h3 className="font-bold text-lg text-[#154212] flex items-center gap-2">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-[#72796e] hover:text-[#154212] p-1 rounded-full hover:bg-[#edefe7] transition-colors"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export const PhoneLoginModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (phone: string) => void;
}> = ({ isOpen, onClose, onSuccess }) => {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleSendCode = () => {
    if (!phone || phone.length < 11) {
      setError('Please enter a valid 11-digit phone number.');
      return;
    }
    setError('');
    setCountdown(60);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 11) {
      setError('Please enter a valid phone number.');
      return;
    }
    if (!code) {
      setError('Please enter the verification code sent to your phone.');
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess(phone);
      onClose();
    }, 1200);
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Phone Number Login / 手机号登录">
      <form onSubmit={handleSubmit} className="space-y-4 pt-1">
        {error && (
          <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs">
            {error}
          </div>
        )}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#42493e]">Phone Number / 手机号码</label>
          <div className="flex items-center gap-2 border border-[#c2c9bb] bg-[#f3f4ed] rounded-xl px-3 py-2.5 focus-within:border-[#154212] focus-within:bg-white transition-all">
            <Smartphone size={18} className="text-[#72796e]" />
            <span className="text-xs font-bold text-[#154212] border-r border-[#c2c9bb] pr-2">+86</span>
            <input
              type="tel"
              maxLength={11}
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
              placeholder="Enter 11-digit mobile number"
              className="w-full bg-transparent text-sm focus:outline-none placeholder-[#72796e]"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#42493e]">SMS Code / 验证码</label>
          <div className="flex gap-2">
            <div className="flex-1 flex items-center border border-[#c2c9bb] bg-[#f3f4ed] rounded-xl px-3 py-2.5 focus-within:border-[#154212] focus-within:bg-white transition-all">
              <input
                type="text"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                placeholder="6-digit code (e.g. 123456)"
                className="w-full bg-transparent text-sm focus:outline-none placeholder-[#72796e]"
              />
            </div>
            <button
              type="button"
              onClick={handleSendCode}
              disabled={countdown > 0}
              className="px-4 py-2.5 text-xs font-semibold bg-[#e7e9e1] text-[#154212] hover:bg-[#bcf0ae] disabled:opacity-60 rounded-xl transition-colors whitespace-nowrap border border-[#c2c9bb]"
            >
              {countdown > 0 ? `${countdown}s` : 'Send Code'}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 py-3 bg-[#154212] text-white rounded-full font-semibold text-sm hover:bg-[#2d5a27] transition-all flex items-center justify-center gap-2 disabled:opacity-75 shadow-sm"
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Verifying...
            </>
          ) : (
            <>
              Log In & Continue
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>
    </ModalWrapper>
  );
};

export const EmailLoginModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (email: string) => void;
}> = ({ isOpen, onClose, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess(email);
      onClose();
    }, 1200);
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Email Sign In / 邮箱登录">
      <form onSubmit={handleSubmit} className="space-y-4 pt-1">
        {error && (
          <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs">
            {error}
          </div>
        )}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#42493e]">Email Address / 邮箱账号</label>
          <div className="flex items-center gap-2 border border-[#c2c9bb] bg-[#f3f4ed] rounded-xl px-3 py-2.5 focus-within:border-[#154212] focus-within:bg-white transition-all">
            <Mail size={18} className="text-[#72796e]" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="reader@neighborbooks.com"
              className="w-full bg-transparent text-sm focus:outline-none placeholder-[#72796e]"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#42493e]">Password / 密码</label>
          <div className="flex items-center gap-2 border border-[#c2c9bb] bg-[#f3f4ed] rounded-xl px-3 py-2.5 focus-within:border-[#154212] focus-within:bg-white transition-all">
            <Key size={18} className="text-[#72796e]" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-transparent text-sm focus:outline-none placeholder-[#72796e]"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 py-3 bg-[#154212] text-white rounded-full font-semibold text-sm hover:bg-[#2d5a27] transition-all flex items-center justify-center gap-2 disabled:opacity-75 shadow-sm"
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Signing In...
            </>
          ) : (
            <>
              Sign In
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>
    </ModalWrapper>
  );
};

export const KeyLoginModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (keyName: string) => void;
}> = ({ isOpen, onClose, onSuccess }) => {
  const [passcode, setPasscode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode) {
      setError('Please enter your Community Library Access Passcode.');
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess(`Community Hub Passcode (${passcode.slice(0, 4)}***)`);
      onClose();
    }, 1000);
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Community Key Access / 社区通行码">
      <form onSubmit={handleSubmit} className="space-y-4 pt-1">
        {error && (
          <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs">
            {error}
          </div>
        )}
        <p className="text-xs text-[#42493e]">
          Enter your neighborhood book club invite code or single-sign-on key code provided by your local library station.
        </p>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#42493e]">Access Key / 通行钥匙码</label>
          <div className="flex items-center gap-2 border border-[#c2c9bb] bg-[#f3f4ed] rounded-xl px-3 py-2.5 focus-within:border-[#154212] focus-within:bg-white transition-all">
            <Key size={18} className="text-[#72796e]" />
            <input
              type="text"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value.toUpperCase())}
              placeholder="e.g. NEIGHBOR-BOOK-2026"
              className="w-full bg-transparent text-sm focus:outline-none placeholder-[#72796e] font-mono"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 py-3 bg-[#154212] text-white rounded-full font-semibold text-sm hover:bg-[#2d5a27] transition-all flex items-center justify-center gap-2 disabled:opacity-75 shadow-sm"
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Validating Key...
            </>
          ) : (
            <>
              Enter Community Library
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>
    </ModalWrapper>
  );
};

export const UserWelcomeModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  accountName: string;
  onSignOut: () => void;
}> = ({ isOpen, onClose, accountName, onSignOut }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm bg-[#f9faf2] rounded-2xl shadow-xl border border-[#e2e3dc] p-6 text-center space-y-4">
        <div className="w-16 h-16 bg-[#bcf0ae]/40 text-[#154212] rounded-full flex items-center justify-center mx-auto ring-4 ring-[#edefe7]">
          <CheckCircle2 size={36} />
        </div>
        <div>
          <h3 className="font-bold text-xl text-[#154212]">Welcome Back! / 欢迎归队</h3>
          <p className="text-xs text-[#42493e] mt-1 font-medium">Logged in as: <span className="text-[#154212] font-bold">{accountName}</span></p>
        </div>

        <div className="bg-[#f3f4ed] p-3.5 rounded-xl text-xs text-[#42493e] text-left space-y-1 border border-[#e2e3dc]">
          <div className="flex justify-between">
            <span className="text-[#72796e]">Status:</span>
            <span className="font-bold text-[#154212]">Active Member</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#72796e]">Local Station:</span>
            <span className="font-bold text-[#154212]">Sunflower Park Shelf #04</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#72796e]">Books Borrowed:</span>
            <span className="font-bold text-[#154212]">3 Books</span>
          </div>
        </div>

        <div className="pt-2 space-y-2">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-[#154212] text-white rounded-full text-xs font-bold hover:bg-[#2d5a27] transition-colors"
          >
            Continue to Bookshelf
          </button>
          <button
            onClick={onSignOut}
            className="w-full py-2 text-[#72796e] hover:text-red-700 text-xs font-semibold transition-colors"
          >
            Sign Out / 退出登录
          </button>
        </div>
      </div>
    </div>
  );
};
