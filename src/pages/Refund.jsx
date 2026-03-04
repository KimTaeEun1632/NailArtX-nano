import React from "react";

const Refund = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 lg:py-24 prose dark:prose-invert">
      <h1 className="text-3xl font-bold mb-2">Refund Policy</h1>
      <h2 className="text-xl font-medium text-gray-600 dark:text-gray-400 mb-8">환불 규정</h2>
      <p className="text-sm text-gray-500 mb-8">Last Updated: March 4, 2026</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
        {/* English Section */}
        <div>
          <section className="mb-8">
            <h3 className="text-lg font-bold mb-4">1. Digital Goods</h3>
            <p>Our service provides digital AI content. Due to the nature of digital goods, refunds are generally not provided once a generation has been performed.</p>
          </section>

          <section className="mb-8">
            <h3 className="text-lg font-bold mb-4">2. Eligibility for Refund</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Full refund is available within 7 days of purchase if NO generations have been made.</li>
              <li>Refunds may be issued for technical failures where the service was unavailable.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h3 className="text-lg font-bold mb-4">3. Subscriptions</h3>
            <p>You can cancel your subscription at any time. Your access will continue until the end of the current billing period. Already paid monthly fees are non-refundable.</p>
          </section>

          <section className="mb-8">
            <h3 className="text-lg font-bold mb-4">4. How to Request</h3>
            <p>Please contact us at [Your Contact Email] with your order details to request a refund.</p>
          </section>
        </div>

        {/* Korean Section */}
        <div className="border-l pl-8 border-gray-200 dark:border-gray-800">
          <section className="mb-8">
            <h3 className="text-lg font-bold mb-4">1. 디지털 상품 특성</h3>
            <p>회사의 서비스는 AI 디지털 콘텐츠를 제공합니다. 디지털 상품의 특성상 이미지가 생성된 이후에는 환불이 불가능합니다.</p>
          </section>

          <section className="mb-8">
            <h3 className="text-lg font-bold mb-4">2. 환불 조건</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>이미지 생성을 한 건도 하지 않은 경우, 결제 후 7일 이내 전액 환불이 가능합니다.</li>
              <li>기술적 결함으로 서비스를 이용하지 못한 경우 환불이 가능합니다.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h3 className="text-lg font-bold mb-4">3. 정기 구독</h3>
            <p>구독은 언제든 해지할 수 있으며, 결제된 해당 월의 기간까지는 이용이 가능합니다. 이미 결제된 요금은 반환되지 않습니다.</p>
          </section>

          <section className="mb-8">
            <h3 className="text-lg font-bold mb-4">4. 신청 방법</h3>
            <p>[연락처 이메일]로 주문 내역과 함께 환불을 요청해 주세요.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Refund;
