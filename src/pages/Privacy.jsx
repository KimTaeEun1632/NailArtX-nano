import React from "react";

const Privacy = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 lg:py-24 prose dark:prose-invert">
      <h1 className="text-3xl font-bold mb-8">개인정보 처리방침</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">최종 수정일: 2024년 3월 2일</p>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">1. 수집하는 개인정보 항목</h2>
        <p>NailArtX(이하 "회사")는 회원가입 및 서비스 제공을 위해 아래와 같은 개인정보를 수집하고 있습니다.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>필수항목: 이메일 주소, 로그인 비밀번호, 서비스 이용 기록</li>
          <li>결제 시(유료 이용 시): 결제 정보(PG사를 통한 카드 정보 등), 연락처</li>
          <li>AI 생성 관련: 입력된 프롬프트(텍스트), 선택된 스타일 정보</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">2. 개인정보의 수집 및 이용 목적</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>서비스 제공 및 관리: 서비스 이용 본인 확인, AI 콘텐츠 생성 및 저장, 갤러리 관리</li>
          <li>결제 및 정산: 유료 요금제 결제 처리, 환불 업무 수행</li>
          <li>고객 지원: 문의 사항 대응, 이용약관 등 위반 시 조치</li>
          <li>서비스 개선: 데이터 분석을 통한 개인별 추천 및 서비스 품질 향상</li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">3. 개인정보의 보유 및 이용 기간</h2>
        <p>회사는 이용자가 서비스를 이용하는 동안 개인정보를 보유하며, 회원 탈퇴 시 지체 없이 파기합니다. 단, 관련 법령(상법, 전자상거래법 등)에 따라 보존이 필요한 경우 법령이 정한 기간 동안 보관합니다.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">4. 개인정보의 제3자 제공 및 위탁</h2>
        <p>회사는 이용자의 동의 없이 개인정보를 외부에 제공하지 않습니다. 원활한 서비스 제공을 위해 아래와 같은 외부 업체에 개인정보 처리를 위탁할 수 있습니다.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>데이터베이스 및 서버 관리: Supabase, Cloudflare</li>
          <li>결제 서비스: Stripe 또는 기타 지정 PG사</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">5. 이용자의 권리와 의무</h2>
        <p>이용자는 언제든지 자신의 개인정보를 조회하거나 수정할 수 있으며, 회원 탈퇴를 통해 개인정보 수집 및 이용 동의를 철회할 수 있습니다. 개인정보 관리 및 수정은 웹사이트 내 계정 설정 페이지에서 가능합니다.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">6. 개인정보 보호를 위한 기술적 대책</h2>
        <p>회사는 이용자의 개인정보를 보호하기 위해 최신 보안 기술을 적용하고 있으며, 데이터 전송 시 암호화(HTTPS) 등을 통해 안전하게 보호하고 있습니다.</p>
      </section>

      <p className="mt-12 text-sm text-gray-500">
        본 방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경 내용의 추가, 삭제 및 수정이 있을 시에는 공지사항을 통해 고지하겠습니다.
      </p>
    </div>
  );
};

export default Privacy;
