import React from "react";

const Privacy = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 lg:py-24 prose dark:prose-invert">
      <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
      <h2 className="text-xl font-medium text-gray-600 dark:text-gray-400 mb-8">개인정보 처리방침</h2>
      <p className="text-sm text-gray-500 mb-8">Last Updated: March 4, 2026</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
        {/* English Section */}
        <div>
          <section className="mb-8">
            <h3 className="text-lg font-bold mb-4">1. Data Collection</h3>
            <p>We collect your email address, login information, service usage records, and prompt inputs to provide and improve our service. Payment information is processed directly by Polar.</p>
          </section>

          <section className="mb-8">
            <h3 className="text-lg font-bold mb-4">2. Use of Data</h3>
            <p>Your data is used to provide AI services, manage subscriptions, improve user experience, and comply with legal obligations.</p>
          </section>

          <section className="mb-8">
            <h3 className="text-lg font-bold mb-4">3. Data Sharing</h3>
            <p>We do not sell your personal data. We share data with service providers like Supabase (Database) and Polar (Payments) only to facilitate our service.</p>
          </section>

          <section className="mb-8">
            <h3 className="text-lg font-bold mb-4">4. Your Rights (GDPR/CCPA)</h3>
            <p>You have the right to access, correct, or delete your personal data. You may also object to or restrict certain processing of your data. Contact us to exercise these rights.</p>
          </section>

          <section className="mb-8">
            <h3 className="text-lg font-bold mb-4">5. Data Retention</h3>
            <p>We retain your data as long as your account is active or as needed to provide you with the Service.</p>
          </section>
        </div>

        {/* Korean Section */}
        <div className="border-l pl-8 border-gray-200 dark:border-gray-800">
          <section className="mb-8">
            <h3 className="text-lg font-bold mb-4">1. 수집 항목</h3>
            <p>이메일, 로그인 정보, 서비스 이용 기록 및 프롬프트 입력을 수집합니다. 결제 정보는 Polar에서 직접 처리됩니다.</p>
          </section>

          <section className="mb-8">
            <h3 className="text-lg font-bold mb-4">2. 이용 목적</h3>
            <p>데이터는 서비스 제공, 구독 관리, 서비스 개선 및 법적 의무 준수를 위해 사용됩니다.</p>
          </section>

          <section className="mb-8">
            <h3 className="text-lg font-bold mb-4">3. 데이터 공유</h3>
            <p>회사는 개인정보를 판매하지 않습니다. 서비스 제공을 위해 Supabase, Polar 등 신뢰할 수 있는 업체와 데이터를 공유할 수 있습니다.</p>
          </section>

          <section className="mb-8">
            <h3 className="text-lg font-bold mb-4">4. 정보 주체의 권리</h3>
            <p>이용자는 자신의 정보를 조회, 수정, 삭제할 권리가 있으며, GDPR 및 국내법에 따른 모든 권리를 보장받습니다.</p>
          </section>

          <section className="mb-8">
            <h3 className="text-lg font-bold mb-4">5. 보유 기간</h3>
            <p>회원 탈퇴 시 또는 서비스 제공 목적 달성 시까지 데이터를 보유합니다.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
