import React from 'react';

export const TermsOfServiceContent: React.FC = () => (
  <div className="space-y-3">
    <p className="text-xs text-[#72796e]">Last Updated: July 2026</p>
    <p>
      Welcome to <strong>NeighborBooks (邻里书屋)</strong>. By using our community book-sharing service, you agree to comply with and be bound by the following Terms of Service.
    </p>
    <h4 className="font-semibold text-[#154212] pt-1">1. Book Exchange & Sharing</h4>
    <p>
      NeighborBooks connects neighbors to borrow, lend, and exchange physical books. Users are expected to handle shared books with care and return them within agreed timeframes.
    </p>
    <h4 className="font-semibold text-[#154212] pt-1">2. User Conduct</h4>
    <p>
      Users must respect community members, refrain from depositing damaged or inappropriate material, and maintain accurate inventory listings for public little libraries.
    </p>
    <h4 className="font-semibold text-[#154212] pt-1">3. Liability Waiver</h4>
    <p>
      NeighborBooks serves as a platform facilitator. Users exchange physical materials voluntarily in local public or designated community spots.
    </p>
  </div>
);

export const PrivacyPolicyContent: React.FC = () => (
  <div className="space-y-3">
    <p className="text-xs text-[#72796e]">Last Updated: July 2026</p>
    <p>
      Your privacy matters to us at <strong>NeighborBooks</strong>. We collect minimal information required to connect you with nearby reading hubs and verify local community participation.
    </p>
    <h4 className="font-semibold text-[#154212] pt-1">1. Information We Collect</h4>
    <p>
      When logging in via WeChat or Phone Number, we store your basic profile identifiers and approximate neighborhood district for book proximity matching.
    </p>
    <h4 className="font-semibold text-[#154212] pt-1">2. Data Usage & Protection</h4>
    <p>
      We never sell or rent your personal information to third parties. Location data is only used to display nearby book shelves and exchange points.
    </p>
    <h4 className="font-semibold text-[#154212] pt-1">3. Your Rights</h4>
    <p>
      You may request account deletion, data export, or clear your history at any time through account settings.
    </p>
  </div>
);

export const CommunityGuidelinesContent: React.FC = () => (
  <div className="space-y-3">
    <p className="text-xs text-[#72796e]">Last Updated: July 2026</p>
    <p>
      NeighborBooks is built on trust, generosity, and a shared love for reading.
    </p>
    <ul className="list-disc pl-5 space-y-1.5 text-sm">
      <li><strong>Take a Book, Share a Book:</strong> Leave something insightful whenever you borrow.</li>
      <li><strong>Keep Books Clean:</strong> Treat physical pages with care—no heavy marks or liquid damage.</li>
      <li><strong>Friendly Interactions:</strong> Maintain a respectful, welcoming spirit when meeting neighbors at local pickup stations.</li>
      <li><strong>Diverse Literature:</strong> Encourage reading for all ages with diverse genres.</li>
    </ul>
  </div>
);
