import React from "react";

const Terms = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 lg:py-24 prose dark:prose-invert">
      <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
      <h2 className="text-xl font-medium text-gray-600 dark:text-gray-400 mb-8">
        서비스 이용약관
      </h2>
      <p className="text-sm text-gray-500 mb-8">Last Updated: March 4, 2026</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
        {/* English Section */}
        <div>
          <section className="mb-8">
            <h3 className="text-lg font-bold mb-4">1. Purpose</h3>
            <p>
              These Terms of Service govern your use of the AI nail art design
              generation service (the "Service") provided by [Your Company Name]
              ("Company"). By using the Service, you agree to these terms.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-lg font-bold mb-4">2. Service Description</h3>
            <p>
              The Service provides AI-generated nail art designs based on user
              inputs. The Service is provided "as is" and "as available."
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-lg font-bold mb-4">3. Intellectual Property</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Ownership of AI-generated content is subject to your
                subscription plan.
              </li>
              <li>
                Users are granted a non-exclusive right to use generated designs
                for personal or commercial use depending on the plan.
              </li>
              <li>
                AI-generated results are not unique; similar results may be
                generated for other users.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h3 className="text-lg font-bold mb-4">
              4. Subscriptions and Payments
            </h3>
            <p>
              Payments are processed through Polar. Subscriptions automatically
              renew unless canceled at least 24 hours before the end of the
              current period.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-lg font-bold mb-4">
              5. Limitation of Liability
            </h3>
            <p>
              The Company is not liable for the actual feasibility of nail
              designs in real-world applications or any dissatisfaction with the
              AI output.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-lg font-bold mb-4">6. Governing Law</h3>
            <p>
              These terms are governed by the laws of the Republic of Korea (or
              your jurisdiction).
            </p>
          </section>
        </div>

        {/* Korean Section */}
        <div className="border-l pl-8 border-gray-200 dark:border-gray-800">
          <section className="mb-8">
            <h3 className="text-lg font-bold mb-4">제 1 조 (목적)</h3>
            <p>
              본 약관은 [회사명] (이하 "회사")가 제공하는 AI 네일 아트 디자인
              생성 서비스(이하 "서비스") 이용과 관련하여 회사와 이용자 사이의
              권리와 의무를 규정합니다.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-lg font-bold mb-4">제 2 조 (서비스의 내용)</h3>
            <p>
              회사는 사용자의 입력을 바탕으로 AI 네일 디자인을 생성합니다.
              서비스는 "있는 그대로" 제공되며, 결과의 완벽성을 보장하지
              않습니다.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-lg font-bold mb-4">제 3 조 (지식재산권)</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>생성된 콘텐츠의 소유권은 이용자의 구독 플랜에 따릅니다.</li>
              <li>
                이용자는 플랜에 따라 개인적 또는 상업적 용도로 디자인을 사용할
                권한을 갖습니다.
              </li>
              <li>AI 특성상 다른 이용자와 유사한 결과가 생성될 수 있습니다.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h3 className="text-lg font-bold mb-4">제 4 조 (구독 및 결제)</h3>
            <p>
              결제는 Polar를 통해 처리됩니다. 정기 구독은 현재 기간 종료 24시간
              전에 해지하지 않으면 자동 갱신됩니다.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-lg font-bold mb-4">제 5 조 (책임의 제한)</h3>
            <p>
              회사는 생성된 디자인의 실제 구현 가능성이나 결과물에 대한 주관적
              만족도에 대해 책임을 지지 않습니다.
            </p>
          </section>
        </div>
      </div>

      <section className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-sm">
        <h3 className="font-bold mb-2">Company Information / 회사 정보</h3>
        <p>Company: NailArtX</p>
        <p>Email: qpwoal1324@naver.com</p>
      </section>
    </div>
  );
};

export default Terms;
