import React from "react";

const Refund = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 lg:py-24 prose dark:prose-invert">
      <h1 className="text-3xl font-bold mb-8">환불 규정</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">최종 수정일: 2024년 3월 2일</p>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">1. 디지털 콘텐츠의 특성</h2>
        <p>NailArtX(이하 "회사")가 제공하는 AI 네일 아트 디자인 생성 서비스는 '전자상거래 등에서의 소비자보호에 관한 법률' 제17조 제2항 제5호에 따른 "디지털콘텐츠의 제공이 개시된 경우"에 해당합니다.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">2. 청약철회 및 환불 조건</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li><strong>생성 전 환불:</strong> 유료 크레딧 또는 요금제 결제 후, 단 한 건의 이미지도 생성하지 않은 경우 결제일로부터 7일 이내에 전액 환불이 가능합니다.</li>
          <li><strong>생성 후 환불:</strong> AI를 통해 이미지가 이미 생성된 경우, 디지털 재화의 특성상 서비스의 가치가 소모된 것으로 간주하여 환불이 불가능합니다.</li>
          <li><strong>자동 갱신:</strong> 정기 구독 요금제의 경우, 다음 결제 예정일 전까지 구독을 해지할 수 있습니다. 이미 결제된 해당 월의 요금은 환불되지 않으며, 해당 기간까지는 서비스 이용이 가능합니다.</li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">3. 예외적인 환불 사유</h2>
        <p>아래와 같은 사유에 해당할 경우, 고객센터 문의를 통해 예외적으로 환불을 진행할 수 있습니다.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>회사의 시스템 오류로 인해 결제 후 정상적으로 이미지가 생성되지 않은 경우</li>
          <li>중복 결제가 발생한 경우</li>
          <li>회사의 귀책 사유로 서비스를 전혀 이용할 수 없게 된 경우</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">4. 환불 절차</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>환불 신청은 웹사이트 내 '고객 지원' 또는 지정된 이메일을 통해 접수할 수 있습니다.</li>
          <li>환불 신청 접수 후 영업일 기준 3~5일 이내에 승인 여부를 검토하여 안내드립니다.</li>
          <li>환불 시 사용된 결제 수단(카드사 등)의 정책에 따라 실제 대금 환급까지 추가 시간이 소요될 수 있습니다.</li>
        </ol>
      </section>

      <p className="mt-12 text-sm text-gray-500">
        기타 환불과 관련한 구체적인 사항은 관계 법령에 따릅니다.
      </p>
    </div>
  );
};

export default Refund;
